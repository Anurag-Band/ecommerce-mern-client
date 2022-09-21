import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../features/auth/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { STATUSES } from "../../utils/STATUSES";
import { useParams } from "react-router-dom";
import Loader from "../../assets/loader.svg";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const { statusMessage, status, errorMessage } = useSelector(
    (state) => state.auth
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleResetPasswordSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);

    dispatch(resetPassword(Object.fromEntries(formData), token))
      .then(unwrapResult)
      .then((obj) => {
        console.log({ resetPasswordThen: obj });
        setPassword("");
        setConfirmPassword("");
      })
      .catch((obj) => console.log({ resetPasswordCatch: obj }));
  };

  useEffect(() => {
    if (status === STATUSES.ERROR || statusMessage || errorMessage) {
      setTimeout(() => dispatch(clearErrors()), 3000);
    }
  }, [dispatch, status, statusMessage, errorMessage]);

  return (
    <section className="min-h-[85vh] flex flex-col justify-start items-center py-12">
      <h2 className="text-2xl md:text-4xl text-slate-500 font-semibold font-primary my-5">
        Reset Password
      </h2>
      <form
        onSubmit={handleResetPasswordSubmit}
        className="w-full sm:w-auto sm:h-[80%] m-5 px-12 flex flex-col py-12 space-y-5 bg-white border border-slate-300 shadow-lg rounded-md"
      >
        <label className="after:content-['*'] after:ml-0.5 after:text-red-500 after:text-lg after:font-bold sm:w-80 text-lg">
          New Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className="after:content-['*'] after:ml-0.5 after:text-red-500 after:text-lg after:font-bold sm:w-80 text-lg">
          Confirm New Password
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {(status === STATUSES.ERROR || statusMessage || errorMessage) && (
          <h3 className="text-red-500 text-sm md:text-lg font-medium">
            Error : {statusMessage || errorMessage}
          </h3>
        )}
        <button
          type="submit"
          disabled={!password || !confirmPassword}
          className="py-1 px-6 rounded-sm w-52 text-xl text-blue-600 border border-blue-500 hover:bg-blue-200 active:bg-blue-400 active:text-white cursor-pointer disabled:text-slate-600 disabled:cursor-not-allowed  disabled:border-slate-500 disabled:hover:bg-slate-200"
        >
          {status === STATUSES.LOADING ? (
            <img src={Loader} alt="Loading..." className="w-8 mx-auto" />
          ) : (
            "Submit"
          )}{" "}
        </button>
      </form>
    </section>
  );
};

export default ResetPasswordPage;
