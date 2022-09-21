import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminGetAllUsers } from "../../features/auth/authSlice";
import { adminGetAllOrders } from "../../features/order/orderSlice";
import { adminGetAllProducts } from "../../features/product/productSlice";
import { unwrapResult } from "@reduxjs/toolkit";

import Revenue from "../../assets/dashboard-icons/revenue.png";
import Products from "../../assets/dashboard-icons/products.gif";
import Orders from "../../assets/dashboard-icons/orders.gif";
import Users from "../../assets/dashboard-icons/users.png";
import StockDoughnut from "../../components/admin/StockDoughnut";
import RevenueLineChart from "../../components/admin/RevenueLineChart";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Link } from "react-router-dom";

const AdminDashboardPage = () => {
  const dispatch = useDispatch();

  const allProducts = useSelector((state) => state.product.allProducts);
  const { allOrders, totalRevenue } = useSelector((state) => state.order);
  const allUsers = useSelector((state) => state.auth.allUsers);

  let outOfStock = 0;
  const productCount = allProducts && allProducts.length;

  allProducts &&
    allProducts.forEach((product) => {
      if (product.stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(adminGetAllProducts())
      .then(unwrapResult)
      .then((obj) => {
        console.log({ adminAllProductsThen: obj });
      })
      .catch((obj) => console.log({ adminAllProductsCatch: obj }));

    dispatch(adminGetAllOrders())
      .then(unwrapResult)
      .then((obj) => {
        console.log({ adminAllOrdersThen: obj });
      })
      .catch((obj) => console.log({ adminAllOrdersCatch: obj }));

    dispatch(adminGetAllUsers())
      .then(unwrapResult)
      .then((obj) => {
        console.log({ adminAllUsersThen: obj });
      })
      .catch((obj) => console.log({ adminAllUsersCatch: obj }));
  }, [dispatch]);

  return (
    <div className="flex flex-col space-y-2">
      <header>
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-3xl text-slate-500 font-primary p-1 ml-5">
            Overview
          </h2>
          <Link
            to={"/products"}
            className="mr-32 space-x-2 font-medium cursor-pointer text-xl text-purple-500"
          >
            <span className="hidden sm:inline-block">View Your Shop</span>
            <OpenInNewIcon />
          </Link>
        </div>
      </header>
      <main className="flex flex-col gap-5">
        {/* Upper Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 ">
          <div className="dashboard-card">
            <img className="dashboard-icon" src={Revenue} alt="revenue" />
            <h2 className="font-semibold text-[2vw] lg:text-[1vw] text-slate-600">
              TOTAL REVENUE
            </h2>
            <h3 className="font-bold text-[2.5vw] lg:text-[1.6vw]">
              {`$ ${totalRevenue && totalRevenue}`}
            </h3>
          </div>

          <div className="dashboard-card">
            <img className="dashboard-icon" src={Products} alt="Products" />
            <h2 className="font-semibold text-[2vw] lg:text-[1vw] text-slate-600">
              PRODUCTS
            </h2>
            <h3 className="font-bold text-[2.5vw] lg:text-[1.6vw]">
              {allProducts && allProducts.length}
            </h3>
          </div>

          <div className="dashboard-card">
            <img className="dashboard-icon" src={Orders} alt="Orders" />
            <h2 className="font-semibold text-[2vw] lg:text-[1vw] text-slate-600">
              ORDERS
            </h2>
            <h3 className="font-bold text-[2.5vw] lg:text-[1.6vw]">
              {allOrders && allOrders.length}
            </h3>
          </div>

          <div className="dashboard-card">
            <img className="dashboard-icon" src={Users} alt="Users" />
            <h2 className="font-semibold text-[2vw] lg:text-[1vw] text-slate-600">
              TOTAL USERS
            </h2>
            <h3 className="font-bold text-[2.5vw] lg:text-[1.6vw]">
              {allUsers && allUsers.length}
            </h3>
          </div>
        </div>

        {/* Upper Section */}

        <div className="flex flex-col-reverse xl:flex-row items-center gap-5">
          <div className="w-8/12 bg-white rounded-lg">
            <RevenueLineChart totalRevenue={totalRevenue} />
          </div>
          <div className="w-4/12 bg-white">
            <StockDoughnut
              outOfStock={outOfStock}
              productCount={productCount}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardPage;
