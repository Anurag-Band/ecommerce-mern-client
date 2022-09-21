import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearErrors,
  loadUser,
  updatePassword,
  updateReset,
} from "../../features/auth/authSlice";
import { STATUSES } from "../../utils/STATUSES";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { statusMessage, status, isUpdated } = useSelector(
    (state) => state.auth
  );

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handlePasswordChangeSubmit = (e) => {
    e.preventDefault();
    if (oldPassword === "" || newPassword === "" || confirmPassword === "") {
      return setError("All Fields are Mandetory !");
    }

    const formData = new FormData();
    formData.append("oldPassword", oldPassword);
    formData.append("newPassword", newPassword);
    formData.append("confirmPassword", confirmPassword);

    dispatch(updatePassword({ formData }))
      .then(unwrapResult)
      .then((obj) => {
        console.log({ updatePasswordThen: obj });
        setError(obj.error);
        if (!obj.error) {
          navigate("/account");
        }
      })
      .catch((obj) => {
        console.log({ updatePasswordCatch: obj });
        setError(obj.error);
      });
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(""), 3000);
    }

    if (status === STATUSES.ERROR) {
      setTimeout(() => dispatch(clearErrors()), 3000);
    }

    if (isUpdated) {
      dispatch(loadUser());
      dispatch(updateReset());
    }
  }, [dispatch, status, isUpdated, error]);

  return (
    <section className="min-h-[85vh] flex justify-center py-12">
      <form
        onSubmit={handlePasswordChangeSubmit}
        className="w-full sm:w-auto m-5 px-12 flex flex-col py-14 space-y-5 bg-white border border-slate-300 shadow-lg rounded-md"
      >
        <label className="after:content-['*'] after:ml-0.5 after:text-red-500 after:text-lg after:font-bold sm:w-80 ">
          Old Password
        </label>
        <input
          type={showPass ? "text" : "password"}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <label className="after:content-['*'] after:ml-0.5 after:text-red-500 after:text-lg after:font-bold sm:w-80 ">
          New Password
        </label>
        <input
          type={showPass ? "text" : "password"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <label className="after:content-['*'] after:ml-0.5 after:text-red-500 after:text-lg after:font-bold sm:w-80 ">
          Confirm New Password
        </label>
        <input
          type={showPass ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {(error || status === STATUSES.ERROR) && (
          <h3 className="text-red-500 text-sm md:text-lg font-medium">
            Error : {error || statusMessage}
          </h3>
        )}
        <div className="flex items-center space-x-5">
          <button
            type="submit"
            className="py-1 px-6 rounded-sm w-52 text-xl text-red-600 border border-red-500 hover:bg-red-200 active:bg-red-400 active:text-white cursor-pointer text-center"
          >
            Change Password
          </button>
          <button
            type="button"
            onMouseDown={() => setShowPass(true)}
            onMouseUp={() => setShowPass(false)}
            className="py-1 px-2 rounded-sm w-32 text-md text-slate-600 border border-slate-500 hover:bg-slate-200 active:bg-slate-400 active:text-white cursor-pointer text-center"
          >
            Show Password
          </button>
        </div>
      </form>
    </section>
  );
};

export default UpdatePassword;
