import React, { useEffect, useRef } from "react";
import CheckoutSteps from "../../components/order/CheckoutSteps";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useDispatch, useSelector } from "react-redux";
import { STATUSES } from "../../utils/STATUSES";
import { clearErrors, createOrder } from "../../features/order/orderSlice";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";

const PaymentDetailsPage = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const navigate = useNavigate();
  const payBtn = useRef(null);
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const user = useSelector((state) => state.auth.user);
  const { shippingInfo, status } = useSelector((state) => state.order);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsAmount: orderInfo.subTotal,
    taxAmount: orderInfo.tax,
    shippingAmount: orderInfo.shippingCharges,
    totalAmount: orderInfo.totalPrice,
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/capturestripepayment",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.postalCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        return <Alert severity="error">{result.error.message}</Alert>;
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder({ order }))
            .then(unwrapResult)
            .then((obj) => {
              console.log({ createOrderThen: obj });
            })
            .catch((obj) => console.log({ createOrderCatch: obj }));

          navigate("/payment/success");
        } else {
          return (
            <Alert severity="error">
              There's some issue while processing payment
            </Alert>
          );
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      console.log(error);
      return <Alert severity="error">{error.response.data.message}</Alert>;
    }
  };

  useEffect(() => {
    if (status === STATUSES.ERROR) {
      setTimeout(() => dispatch(clearErrors()), 3000);
    }
  }, [dispatch, status]);
  return (
    <section className="min-h-screen w-full">
      <CheckoutSteps activeStep={2} />
      <div className="container mx-auto w-4/5 flex flex-col items-center my-10">
        <h2 className="text-xl md:text-3xl font-medium text-slate-600 mb-5">
          Card Info
        </h2>

        <form onSubmit={handlePayment} className="flex flex-col gap-3">
          <div className="relative">
            <CreditCardIcon className="custom-payment-input-icon" />
            <CardNumberElement className="custom-payment-input" />
          </div>
          <div className="relative">
            <EventIcon className="custom-payment-input-icon" />
            <CardExpiryElement className="custom-payment-input" />
          </div>
          <div className="relative">
            <VpnKeyIcon className="custom-payment-input-icon" />
            <CardCvcElement className="custom-payment-input" />
          </div>

          <button
            type="submit"
            ref={payBtn}
            className="py-2 px-6 rounded-sm w-full text-xl bg-red-500 text-white font-bold border border-red-500 hover:bg-red-400 active:bg-red-600 active:text-white cursor-pointer"
          >
            {`Pay - $ ${orderInfo && orderInfo.totalPrice}`}
          </button>
        </form>
      </div>
    </section>
  );
};

export default PaymentDetailsPage;
