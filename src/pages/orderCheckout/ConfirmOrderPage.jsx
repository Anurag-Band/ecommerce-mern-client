import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../../components/order/CheckoutSteps";
import { capitaliseFirstLetter } from "../../utils/capitaliseFirstLetter";

const ConfirmOrderPage = () => {
  const navigate = useNavigate();
  const shippingInfo = useSelector((state) => state.order.shippingInfo);
  const { cartItems, subTotal } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);

  const ADDRESS = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.country}, ${shippingInfo.postalCode}`;

  const SHIPPING_CHARGES =
    cartItems.length * 40 > 180 ? 180 : cartItems.length * 40;

  const GST = subTotal * 0.18;

  const TOTAL_AMOUNT = subTotal + SHIPPING_CHARGES + GST;

  const handleProceedToPayment = () => {
    const orderData = {
      subTotal,
      shippingCharges: SHIPPING_CHARGES,
      tax: GST,
      totalPrice: TOTAL_AMOUNT,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(orderData));

    navigate("/process/payment");
  };

  return (
    <section className="min-h-screen w-full">
      <CheckoutSteps activeStep={1} />
      <div className="mt-5 container flex justify-between w-11/12 mx-auto">
        {/* left section */}
        <div className="flex flex-col gap-3 flex-1">
          <h2 className="text-xl md:text-3xl font-medium text-slate-600">
            Shipping Info
          </h2>
          <div className="space-y-2">
            <h3 className="texl-xl font-semibold">
              Name:
              <span className="text-lg font-medium text-slate-500 ml-3">
                {capitaliseFirstLetter(user.name)}
              </span>
            </h3>
            <h3 className="texl-xl font-semibold">
              Phone No:
              <span className="text-lg font-medium text-slate-500 ml-3">
                {shippingInfo.phoneNumber}
              </span>
            </h3>
            <h3 className="texl-xl font-semibold">
              Address:
              <span className="text-lg font-medium text-slate-500 ml-3">
                {ADDRESS}
              </span>
            </h3>
          </div>
          <h2 className="text-xl md:text-3xl font-medium text-slate-600 ">
            Your Cart Items:
          </h2>
          <div className="overflow-y-scroll h-[53vh]">
            {cartItems?.map((item) => (
              <div
                key={item._id}
                className="flex items-center space-x-5 p-3 bg-white shadow-lg rounded-sm border border-slate-500 m-2"
              >
                <img
                  src={item.itemId.photos[0].secure_url}
                  alt={item.name}
                  className="w-28 h-28 object-fill"
                />
                <p className="truncate w-[60%] text-sm text-slate-500 font-light">
                  {capitaliseFirstLetter(item.name)}
                </p>
                <h3 className="font-extrabold">
                  {`${item.quantity} ✕ $ ${item.price} = $ ${
                    item.quantity * item.price
                  }`}
                </h3>
              </div>
            ))}
          </div>
        </div>
        {/* right section */}
        <div className="mx-10">
          <div className="space-y-5">
            <h2 className="text-xl md:text-4xl font-medium text-slate-600">
              Order Summery
            </h2>
            <hr className="border border-slate-400 w-80" />
            <div className="space-y-3">
              <h3 className="text-lg font-medium">
                Sub-Total:
                <span className="text-base lg:text-xl font-semibold text-slate-500 ml-3">
                  {subTotal}
                </span>
              </h3>
              <h3 className="text-lg font-medium">
                Shipping Charges:
                <span className="text-base lg:text-xl font-semibold text-slate-500 ml-3">
                  {SHIPPING_CHARGES}
                </span>
              </h3>
              <h3 className="text-lg font-medium flex items-center">
                GST:
                <span className="text-base lg:text-xl font-semibold text-slate-500 ml-3">
                  {GST}
                </span>
                <span className="text-green-500 text-base ml-2">(18%)</span>
              </h3>
              <hr className="border border-slate-400" />
            </div>
            <div className="space-y-7">
              <h4 className="text-xl lg:text-2xl font-semibold">
                Total Amount:
                <span className="text-slate-500 font-semibold ml-3">
                  {TOTAL_AMOUNT}
                </span>
              </h4>
              <button
                type="button"
                onClick={handleProceedToPayment}
                className="py-2 px-6 rounded-sm w-full text-xl text-white border bg-red-600 border-red-500 hover:bg-white hover:text-red-500 active:bg-red-500 active:text-white cursor-pointer text-center"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConfirmOrderPage;
