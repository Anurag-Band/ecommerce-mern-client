import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import LaunchIcon from "@mui/icons-material/Launch";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMyOrders,
  fetchOrderDetails,
} from "../../features/order/orderSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import OrderDetailsPage from "./OrderDetailsPage";
import { STATUSES } from "../../utils/STATUSES";
import Loader from "../../assets/loader.svg";

const MyOrdersPage = () => {
  const dispatch = useDispatch();
  const { orders, orderDetails, status } = useSelector((state) => state.order);

  const handleOrderDetailsShow = (orderId) => {
    dispatch(fetchOrderDetails(orderId))
      .then(unwrapResult)
      .then((obj) => {
        console.log({ orderDetailsThen: obj });
      })
      .catch((obj) => {
        console.log({ orderDetailsCatch: obj });
      });
  };

  const rows = [];

  orders &&
    orders.length > 0 &&
    orders.forEach((order) =>
      rows.push({
        id: order._id,
        status: order.orderStatus,
        itemQty: order.orderItems.length,
        amount: order.totalAmount,
      })
    );

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 100,
      flex: 0.3,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      flex: 0.3,
      cellClassName: (params) =>
        params.row.status === "Delivered" ? "greenColor" : "redColor",
    },
    {
      field: "itemQty",
      headerName: "Item Qty",
      minWidth: 100,
      type: "number",
      flex: 0.1,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 170,
      flex: 0.3,
    },
    {
      field: "Details",
      flex: 0.3,
      headerName: "Details",
      minWidth: 100,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <button
            type="button"
            onClick={() => handleOrderDetailsShow(params.id)}
          >
            <LaunchIcon />
          </button>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(fetchMyOrders())
      .then(unwrapResult)
      .then((obj) => {
        console.log({ myOrdersThen: obj });
      })
      .catch((obj) => {
        console.log({ myOrdersCatch: obj });
      });
  }, [dispatch]);

  return (
    <div className="w-full h-screen flex flex-col">
      <h2 className="text-2xl lg:text-4xl flex justify-center items-center p-10 font-semibold text-slate-600 h-[10vh]">
        My Orders
      </h2>
      <div className="flex flex-col lg:flex-row w-full h-full space-y-5">
        <div className="w-full lg:w-[50%] min-h-[40vh] lg:h-[89vh]">
          <DataGrid rows={rows} columns={columns} />
        </div>

        <div className="w-full lg:w-[50%]">
          {orderDetails &&
            orderDetails._id &&
            (status === STATUSES.LOADING ? (
              <div className="flex items-center justify-center w-full h-full">
                <img src={Loader} alt="Loading..." className="w-24 h-24" />
              </div>
            ) : (
              <OrderDetailsPage order={orderDetails} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrdersPage;
