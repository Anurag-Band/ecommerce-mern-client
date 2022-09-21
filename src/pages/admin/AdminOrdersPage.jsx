import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminGetAllOrders } from "../../features/order/orderSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const AdminOrdersPage = () => {
  const dispatch = useDispatch();

  const allOrders = useSelector((state) => state.order.allOrders);

  const rows = [];

  allOrders &&
    allOrders.length > 0 &&
    allOrders.forEach((order) =>
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
      minWidth: 50,
      flex: 0.3,
      headerClassName: "admin-dashboard-header",
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 50,
      flex: 0.2,
      headerClassName: "admin-dashboard-header",

      cellClassName: (params) =>
        params.row.status === "Delivered" ? "greenColor" : "redColor",
    },
    {
      field: "itemQty",
      headerName: "Item Qty",
      minWidth: 50,
      type: "number",
      flex: 0.1,
      headerClassName: "admin-dashboard-header",
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 50,
      flex: 0.2,
      headerClassName: "admin-dashboard-header",
    },
    {
      field: "Actions",
      flex: 0.2,
      headerClassName: "admin-dashboard-header",
      headerName: "Actions",
      minWidth: 50,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="space-x-3">
            <button type="button" onClick={() => {}}>
              <EditIcon />
            </button>
            <button type="button" onClick={() => {}}>
              <DeleteForeverIcon />
            </button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(adminGetAllOrders())
      .then(unwrapResult)
      .then((obj) => {
        console.log({ adminAllOrdersThen: obj });
      })
      .catch((obj) => console.log({ adminAllOrdersCatch: obj }));
  }, [dispatch]);

  return (
    <main className="w-full h-full flex flex-col">
      <h2 className="text-2xl lg:text-4xl flex justify-center items-center pb-5 font-semibold text-slate-600 h-[10vh]">
        All Orders
      </h2>
      <div className="h-[80vh] bg-white">
        <DataGrid
          rows={rows}
          columns={columns}
          getCellClassName={(params) =>
            params.row.status === "Delivered"
              ? "orderDelivered"
              : "orderProcessing"
          }
        />
      </div>
    </main>
  );
};

export default AdminOrdersPage;
