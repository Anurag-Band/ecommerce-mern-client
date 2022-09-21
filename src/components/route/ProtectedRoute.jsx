import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { STATUSES } from "../../utils/STATUSES";

const ProtectedRoute = () => {
  const { status, isAuthenticated } = useSelector((state) => state.auth);
  return (
    <>
      {status !== STATUSES.LOADING &&
        (isAuthenticated ? <Outlet /> : <Navigate to={"/auth/login"} />)}
    </>
  );
};

export default ProtectedRoute;
