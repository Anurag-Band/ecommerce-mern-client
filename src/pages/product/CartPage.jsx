/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../../features/cart/cartSlice";
import CartItemCard from "../../components/cart/CartItemCard";
import { useNavigate } from "react-router-dom";
import CustomNavigateTo from "../../components/custom/CustomNavigateTo";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {
  addToCart,
  decreaseCartItemQuantity,
  removeFromCart,
} from "../../features/cart/cartSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { ToastContainer, toast } from "react-toastify";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const subTotal = useSelector((state) => state.cart.subTotal);

  const handleAddToCart = (item) => {
    if (item.quantity >= item.stock) return;

    dispatch(addToCart(item.itemId._id))
      .then(unwrapResult)
      .then((obj) => {
        console.log({ addToCartThen: obj });
        reFetchCartItems();
      })
      .catch((obj) => console.log({ addToCartCatch: obj }));
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity === 1) return;

    dispatch(decreaseCartItemQuantity(item.itemId._id))
      .then(unwrapResult)
      .then((obj) => {
        console.log({ decreaseQtyThen: obj });
        reFetchCartItems();
      })
      .catch((obj) => console.log({ decreaseQtyCatch: obj }));
  };

  const handleRemove = (item) => {
    dispatch(removeFromCart(item.itemId._id))
      .then(unwrapResult)
      .then((obj) => {
        console.log({ removeFromCartThen: obj });
        reFetchCartItems();
      })
      .catch((obj) => console.log({ removeFromCartCatch: obj }));
  };

  const handleCheckout = () => {
    cartItems.length === 0
      ? toast.dark("Cart is Empty!", {
          position: "bottom-center",
          autoClose: 3000,
        })
      : navigate("/auth/login?redirect=shipping");
  };

  useEffect(() => {
    reFetchCartItems();
  }, []);

  async function reFetchCartItems() {
    dispatch(fetchCartItems())
      .then(unwrapResult)
      .then((obj) => console.log({ cartThen: obj }))
      .catch((obj) => console.log({ cartCatch: obj }));
  }

  return (
    <main className="container py-5 xl:py-10 mx-auto min-h-[85vh]">
      <CustomNavigateTo location={"/products"} />
      <div className="lg:w-4/5 mx-auto flex relative gap-2">
        <div className="flex flex-col w-3/4">
          <ToastContainer />
          {cartItems &&
            cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-10 p-5 bg-white shadow-md rounded-sm border-b-2 m-3"
              >
                <CartItemCard item={item} />
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => handleAddToCart(item)}>
                    <AddCircleIcon fontSize="medium" className="text-red-500" />
                  </button>
                  <input
                    type="number"
                    readOnly
                    value={item.quantity}
                    className="w-16 border-slate-400 focus:ring-0 focus:border-slate-400 cursor-default"
                  />
                  <button
                    type="button"
                    onClick={() => handleDecreaseQuantity(item)}
                    disabled={item.quantity === 1}
                  >
                    <RemoveCircleIcon
                      fontSize="medium"
                      className="text-red-500"
                    />
                  </button>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">$ {item.price}</h3>
                  <button
                    type="button"
                    onClick={() => handleRemove(item)}
                    className="text-red-500 underline text-sm cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
        </div>
        <div className="w-1/4 flex flex-col gap-5 justify-between p-6 bg-white shadow-lg h-60 mt-3 sticky top-24">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold">Sub-Total</h3>
              <p>{cartItems.length} items</p>
            </div>
            <h3 className="py-3 text-2xl font-bold">$ {subTotal}</h3>
          </div>
          <button
            onClick={handleCheckout}
            className="py-2 px-6 rounded-sm w-full text-xl bg-blue-500 text-white font-bold border border-blue-500 hover:bg-blue-400 active:bg-blue-600 active:text-white cursor-pointer"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
