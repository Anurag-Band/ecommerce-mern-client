import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { STATUSES } from "../../utils/STATUSES";

const AdminProtectedRoute = () => {
  const { user, status, isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div>
      {status !== STATUSES.LOADING &&
        (isAuthenticated && user.role === "admin" ? (
          <Outlet />
        ) : (
          <Navigate to={"/auth/login"} />
        ))}
    </div>
  );
};

export default AdminProtectedRoute;
