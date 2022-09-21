import React, { useEffect, useState } from "react";
import LoginBanner from "../../assets/login-banner.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loginUser } from "../../features/auth/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { STATUSES } from "../../utils/STATUSES";
import Loader from "../../assets/loader.svg";

const LogInPage = () => {
  const dispatch = useDispatch();
  const { statusMessage, status, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (email !== "" || password !== "") {
      dispatch(loginUser({ email, password }))
        .then(unwrapResult)
        .then((obj) => {
          console.log({ loginThen: obj });
          setEmail("");
          setPassword("");
        })
        .catch((obj) => console.log({ loginCatch: obj }));
    }
  };

  // eslint-disable-next-line no-restricted-globals
  const redirect = location.search
    ? // eslint-disable-next-line no-restricted-globals
      `/${location.search.split("=")[1]}`
    : "/account";

  useEffect(() => {
    if (status === STATUSES.ERROR) {
      setTimeout(() => dispatch(clearErrors()), 3000);
    }
    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, redirect, status, navigate, isAuthenticated]);

  return (
    <section className="min-h-[85vh] bg-white">
      <div className="container mx-auto px-5 xl:px-40 flex py-5">
        <div className="flex flex-col w-full sm:w-1/2 space-y-2 my-14 px-10">
          <h2 className="pb-5 text-2xl md:text-3xl font-primary">Login</h2>
          <form
            className="flex flex-col space-y-4"
            onSubmit={handleLoginSubmit}
          >
            <label className="after:content-['*'] after:ml-0.5 after:text-red-500 after:text-lg after:font-bold text-base md:text-lg font-medium">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              required
              className="w-full md:w-[80%] focus:ring-0 rounded-sm"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="after:content-['*'] after:ml-0.5 after:text-red-500 after:text-lg after:font-bold text-base md:text-lg font-medium">
              Password
            </label>
            <input
              type="password"
              value={password}
              required
              className="w-full md:w-[80%] focus:ring-0 rounded-sm "
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link
              to={"/auth/password/forgot"}
              className="text-blue-500 text-sm md:text-lg font-medium cursor-pointer"
            >
              Forgot Password ?
            </Link>
            {statusMessage && (
              <h3 className="text-red-500 text-sm md:text-lg font-medium">
                Error : {statusMessage}
              </h3>
            )}
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-3 lg:space-y-0 lg:space-x-5">
              <button
                type="submit"
                className="py-1 px-6 rounded-sm w-32 text-xl text-blue-600 border border-blue-500 hover:bg-blue-200 active:bg-blue-400 active:text-white cursor-pointer"
              >
                {status === STATUSES.LOADING ? (
                  <img src={Loader} alt="Loading..." className="w-8 mx-auto" />
                ) : (
                  "Login"
                )}
              </button>
              <Link to="/auth/signup" className="text-blue-500 text-lg">
                New Here !, Create An Account
              </Link>
            </div>
          </form>
        </div>
        <div className="w-1/2 hidden sm:flex sm:items-center sm:justify-center">
          <img src={LoginBanner} alt="Login" />
        </div>
      </div>
    </section>
  );
};

export default LogInPage;
