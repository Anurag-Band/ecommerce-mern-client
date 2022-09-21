import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adminDeleteUser,
  adminGetAllUsers,
  deleteReset,
} from "../../features/auth/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../assets/loader.svg";
import { STATUSES } from "../../utils/STATUSES";

const AdminUsersPage = () => {
  const dispatch = useDispatch();

  const { allUsers, isDeleted, status } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const rows = [];

  allUsers &&
    allUsers.length > 0 &&
    allUsers.forEach((user) =>
      rows.push({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      })
    );

  const columns = [
    {
      field: "id",
      headerName: "User ID",
      minWidth: 50,
      flex: 0.2,
      headerClassName: "admin-dashboard-header",
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 100,
      flex: 0.3,
      headerClassName: "admin-dashboard-header",
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 100,
      flex: 0.2,
      headerClassName: "admin-dashboard-header",
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 100,
      flex: 0.1,
      cellClassName: (params) =>
        params.row.role === "admin" ? "outOfStock" : "",
      headerClassName: "admin-dashboard-header",
    },
    {
      field: "actions",
      flex: 0.1,
      headerClassName: "admin-dashboard-header",
      headerName: "Actions",
      minWidth: 100,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="space-x-3">
            <button type="button" onClick={() => {}}>
              <EditIcon />
            </button>
            <button
              type="button"
              onClick={() => handleDeleteUser(params.row.id)}
            >
              <DeleteForeverIcon />
            </button>
          </div>
        );
      },
    },
  ];

  const handleDeleteUser = (userId) => {
    setLoading(true);
    dispatch(adminDeleteUser(userId))
      .then(unwrapResult)
      .then((obj) => {
        console.log({ adminDeleteUserThen: obj });
        setLoading(false);
      })
      .catch((obj) => console.log({ adminDeleteUserCatch: obj }));
  };

  useEffect(() => {
    dispatch(adminGetAllUsers())
      .then(unwrapResult)
      .then((obj) => {
        console.log({ adminAllUsersThen: obj });
      })
      .catch((obj) => console.log({ adminAllUsersCatch: obj }));

    if (isDeleted) {
      toast.dark("User Deleted Successfully!", {
        position: "bottom-left",
        autoClose: 3000,
      });
      dispatch(deleteReset());
    }
    setLoading(false);
  }, [dispatch, isDeleted]);

  return (
    <main className="w-full h-full flex flex-col">
      <ToastContainer />
      <h2 className="text-2xl lg:text-4xl flex justify-center items-center pb-5 font-semibold text-slate-600 h-[10vh]">
        All Users
      </h2>
      <div className="h-[80vh] bg-white">
        {loading || status === STATUSES.LOADING ? (
          <div className="flex items-center justify-center w-full h-full">
            <img src={Loader} alt="Loading..." className="w-24 h-24" />
          </div>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            getCellClassName={(params) =>
              params.row.role === "admin" ? "pri-cell" : "sec-cell"
            }
          />
        )}
      </div>
    </main>
  );
};

export default AdminUsersPage;
