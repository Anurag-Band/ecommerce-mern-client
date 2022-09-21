import React from "react";
import { Outlet } from "react-router-dom";
import ProfileSpeedDial from "../../components/layout/ProfileSpeedDial";

const AppLayout = () => {
  return (
    <main className="min-h-screen relative">
      <ProfileSpeedDial />
      <Outlet />
    </main>
  );
};

export default AppLayout;
