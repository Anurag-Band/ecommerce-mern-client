import React from "react";
import { Outlet } from "react-router-dom";
import Notification from "../../components/layout/Notification";
import Navigation from "../../components/layout/Navigation";
import Footer from "../../components/layout/Footer";

const WebLayout = () => {
  return (
    <>
      <Notification />
      <Navigation />
      <main className="min-h-[80vh]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default WebLayout;
