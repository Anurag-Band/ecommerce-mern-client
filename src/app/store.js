import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/productSlice";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import orderReducer from "../features/order/orderSlice";
import { batchedSubscribe } from "redux-batched-subscribe";
import { debounce } from "lodash";

const debounceNotify = debounce((notify) => notify());

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
  },
  enhancers: [batchedSubscribe(debounceNotify)],
});
