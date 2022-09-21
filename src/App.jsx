import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/product/LandingPage";
import ProductsPage from "./pages/product/ProductsPage";
import ProductDetailsPage from "./pages/product/ProductDetailsPage";
import LogInPage from "./pages/user/LogInPage";
import SignUpPage from "./pages/user/SignUpPage";
import ProfilePage from "./pages/user/ProfilePage";
import { loadUser } from "./features/auth/authSlice";
import ProtectedRoute from "./components/route/ProtectedRoute";
import UpdatePassword from "./pages/user/UpdatePassword";
import ResetPasswordPage from "./pages/user/ResetPasswordPage";
import ForgotPasswordPage from "./pages/user/ForgotPasswordPage";
import CartPage from "./pages/product/CartPage";
import WebLayout from "./pages/layout/WebLayout";
import AppLayout from "./pages/layout/AppLayout";
import ShippingInfoPage from "./pages/orderCheckout/ShippingInfoPage";
import ConfirmOrderPage from "./pages/orderCheckout/ConfirmOrderPage";
import PaymentDetailsPage from "./pages/orderCheckout/PaymentDetailsPage";
import axios from "axios";
import { store } from "./app/store";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentSuccessPage from "./pages/orderCheckout/PaymentSuccessPage";
import MyOrdersPage from "./pages/orderCheckout/MyOrdersPage";
import OrderDetailsPage from "./pages/orderCheckout/OrderDetailsPage";
import { injectStyle } from "react-toastify/dist/inject-style";
import AdminLayout from "./pages/layout/AdminLayout";
import AdminProtectedRoute from "./components/route/AdminProtectedRoute";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminReviewsPage from "./pages/admin/AdminReviewsPage";

const App = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripekey");

    setStripeApiKey(data.stripekey);
  }

  useEffect(() => {
    store.dispatch(loadUser());

    injectStyle();

    getStripeApiKey();
  }, []);

  return (
    <main className="bg-slate-50 font-secondary relative">
      <Routes>
        {/* App Layout */}
        <Route element={<WebLayout />}>
          <Route path="/" element={<LandingPage />} />
          {/* product routes */}
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:search" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />

          {/* user routes */}
          <Route path="/auth/login" element={<LogInPage />} />
          <Route path="/auth/signup" element={<SignUpPage />} />
          <Route
            path="/auth/password/forgot"
            element={<ForgotPasswordPage />}
          />
          <Route
            path="/auth/password/reset/:token"
            element={<ResetPasswordPage />}
          />

          {/* USER protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/account" element={<ProfilePage />} />
            <Route
              path="/account/password/update"
              element={<UpdatePassword />}
            />
          </Route>
        </Route>

        {/* App Layout */}
        <Route element={<AppLayout />}>
          {/* protected routes */}
          <Route element={<ProtectedRoute />}>
            {/* cart route */}
            <Route path="/cart" element={<CartPage />} />
            <Route path="/shipping" element={<ShippingInfoPage />} />
            {/* order & payment routes */}
            <Route path="/myorders" element={<MyOrdersPage />} />
            {stripeApiKey && (
              <Route
                path="/process/payment"
                element={
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <PaymentDetailsPage />
                  </Elements>
                }
              />
            )}
            <Route path="/payment/success" element={<PaymentSuccessPage />} />
            <Route path="/order/confirm" element={<ConfirmOrderPage />} />
            <Route path="/order/:id" element={<OrderDetailsPage />} />
          </Route>
        </Route>

        {/* Admin Layout */}
        <Route element={<AdminLayout />}>
          {/* ONLY Admin routes */}
          <Route element={<AdminProtectedRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/products" element={<AdminProductsPage />} />
            <Route path="/admin/orders" element={<AdminOrdersPage />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route
              path="/admin/reviews/:productId"
              element={<AdminReviewsPage />}
            />
            <Route path="/admin/reviews" element={<AdminReviewsPage />} />
          </Route>
        </Route>
      </Routes>
    </main>
  );
};

export default App;
