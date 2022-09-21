import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import ProfileSpeedDial from "../../components/layout/ProfileSpeedDial";

const AdminLayout = () => {
  return (
    <main className="flex min-h-screen w-full bg-gray-100">
      <AdminSidebar />
      <div className="w-9/12 mx-auto relative py-5">
        <Outlet />
      </div>
      <ProfileSpeedDial />
    </main>
  );
};

export default AdminLayout;
