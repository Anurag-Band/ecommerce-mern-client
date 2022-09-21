import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import MobileLogo from "../../assets/logo-mobile.png";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, logoutUser } from "../../features/auth/authSlice";
import { STATUSES } from "../../utils/STATUSES";
import { unwrapResult } from "@reduxjs/toolkit";
import Search from "../product/Search";

const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user, status } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser())
      .then(unwrapResult)
      .then((obj) => {
        console.log({ logoutThen: obj });
        navigate("/");
      })
      .catch((obj) => console.log({ logoutCatch: obj }));
  };

  useEffect(() => {
    if (status === STATUSES.ERROR) {
      setTimeout(() => dispatch(clearErrors()), 3000);
    }
  }, [dispatch, status]);

  return (
    <header className="bg-white sticky top-0 z-50 shadow-lg">
      <nav className="container mx-auto p-1 px-5 lg:px-16 flex items-center justify-between space-x-2 mb-1">
        <Link to="/">
          <img src={Logo} alt="cash N carry" className="hidden lg:block w-60" />
          <img
            src={MobileLogo}
            alt="cash N carry"
            className="block lg:hidden w-12"
          />
        </Link>
        <Search />
        <div className="flex items-center space-x-7">
          <Link to={"/cart"}>
            <AddShoppingCartIcon className="cursor-pointer" />
          </Link>
          <FavoriteBorderIcon className="cursor-pointer" />
          <Link
            to={"/products"}
            className="cursor-pointer font-semibold text-lg animate-bounce text-red-500"
          >
            Shop
          </Link>
          {isAuthenticated ? (
            <div className="relative flex items-center justify-center">
              <button className="peer">
                <div className="flex items-center justify-center w-14 h-14 rounded-full overflow-hidden">
                  <img
                    src={user.photo.secure_url}
                    alt={user.name}
                    className="object-fill w-full h-full"
                  />
                </div>
              </button>

              <div className="hidden peer-hover:flex peer-hover:flex-col hover:flex hover:flex-col w-[150px] flex-col bg-white drop-shadow-lg absolute top-9 right-5 text-md font-medium rounded-md">
                {isAuthenticated && user.role === "admin" && (
                  <Link
                    to={"/admin/dashboard"}
                    className="px-5 py-2 hover:bg-gray-200 cursor-pointer text-center"
                  >
                    Dashboard
                  </Link>
                )}
                <Link
                  to={"/account"}
                  className="px-5 py-2 hover:bg-gray-200 cursor-pointer text-center"
                >
                  My Profile
                </Link>
                <Link
                  to={"/myorders"}
                  className="px-5 py-2 hover:bg-gray-200 cursor-pointer text-center"
                >
                  My Orders
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-5 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              to={"/auth/login"}
              className="cursor-pointer font-semibold text-lg"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
