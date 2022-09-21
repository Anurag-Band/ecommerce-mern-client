import React, { useState } from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../features/auth/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { Backdrop } from "@mui/material";

const ProfileSpeedDial = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const actions = [
    { icon: <ListAltIcon />, name: "Orders", link: orders },
    {
      icon: <AccountCircleIcon />,
      name: "Profile",
      link: profile,
    },
    {
      icon: (
        <ShoppingCartIcon
          className={cartItems.length > 0 ? "text-red-500" : ""}
        />
      ),
      name: `Cart(${cartItems.length})`,
      link: cart,
    },
    { icon: <ExitToAppIcon />, name: "Logout", link: logout },
  ];

  if (user && user.role === "admin") {
    actions.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      link: dashboard,
    });
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }
  function orders() {
    navigate("/myorders");
  }
  function profile() {
    navigate("/account");
  }
  function cart() {
    navigate("/cart");
  }
  function logout() {
    dispatch(logoutUser())
      .then(unwrapResult)
      .then((obj) => {
        console.log({ logoutThen: obj });
        navigate("/");
      })
      .catch((obj) => console.log({ logoutCatch: obj }));
  }

  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }} />

      <SpeedDial
        ariaLabel="SpeedDial controlled open"
        sx={{ position: "absolute", top: 30, right: 60 }}
        icon={
          <img
            className="rounded-full object-fill"
            src={user && user.photo.secure_url}
            alt="Profile"
          />
        }
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction={"down"}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.link}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default ProfileSpeedDial;
