import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoginBanner from "../../assets/login-banner.jpg";
import { clearErrors, registerUser } from "../../features/auth/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { STATUSES } from "../../utils/STATUSES";
import Loader from "../../assets/loader.svg";

const SignUpPage = () => {
  const filePickerRef = useRef(null);
  const dispatch = useDispatch();
  const { statusMessage, status, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [previewPhoto, setPreviewPhoto] = useState("");

  const uploadProfilePhoto = (e) => {
    if (e.target.files) {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setPreviewPhoto(reader.result);
          setProfilePhoto(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (name !== "" || email !== "" || password !== "") {
      const formData = new FormData();
      formData.set("name", name);
      formData.set("email", email);
      formData.set("password", password);
      formData.set("photo", profilePhoto);

      dispatch(registerUser(Object.fromEntries(formData)))
        .then(unwrapResult)
        .then((obj) => {
          console.log({ signupThen: obj });
          setName("");
          setEmail("");
          setPassword("");
          setProfilePhoto("");
          setPreviewPhoto("");
        })
        .catch((obj) => console.log({ signupCatch: obj }));
    }
  };

  useEffect(() => {
    if (status === STATUSES.ERROR) {
      setTimeout(() => dispatch(clearErrors()), 3000);
    }

    if (isAuthenticated) {
      navigate("/account");
    }
  }, [dispatch, status, navigate, isAuthenticated]);

  return (
    <section className="min-h-[85vh] bg-white">
      <div className="container mx-auto px-5 xl:px-40 flex py-5">
        <div className="w-1/2 hidden sm:flex sm:items-center sm:justify-center">
          <img src={LoginBanner} alt="Login" />
        </div>
        <div className="flex flex-col w-full sm:w-1/2 space-y-2 my-8 px-8 ml-4">
          <h2 className="pb-5 text-2xl md:text-3xl font-primary">
            Create An Account
          </h2>
          <form
            onSubmit={handleSignupSubmit}
            className="flex flex-col space-y-3"
          >
            <label className="after:content-['*'] after:ml-0.5 after:text-red-500 after:text-lg after:font-bold text-base md:text-lg font-medium">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              required
              className="w-full md:w-[80%] focus:ring-0 rounded-sm"
              onChange={(e) => setName(e.target.value)}
            />
            <label className="after:content-['*'] after:ml-0.5 after:text-red-500 after:text-lg after:font-bold text-base md:text-lg font-medium">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              required
              className="w-full md:w-[80%] focus:ring-0 rounded-sm "
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
            <div className="flex flex-col">
              <label className="after:content-['*'] after:ml-0.5 after:text-red-500 after:text-lg after:font-bold text-base md:text-lg font-medium">
                Profile Photo
              </label>
              <div className="flex items-center space-x-5 xl:space-x-10">
                <div className="flex items-center justify-center w-16 h-16 overflow-hidden rounded-full bg-gray-100">
                  {previewPhoto && (
                    <img
                      className="w-16 h-16 object-fill p-1 rounded-full cursor-pointer"
                      src={previewPhoto}
                      alt="Profile Preview"
                      onClick={() => {
                        setProfilePhoto("");
                        setPreviewPhoto("");
                      }}
                    />
                  )}
                </div>
                <button
                  type="button"
                  disabled={profilePhoto}
                  onClick={() => filePickerRef.current.click()}
                  className="mt-2 py-1 px-6 rounded-sm w-32 lg:w-60 text-xl text-red-600 border border-red-500 hover:bg-red-200 active:bg-red-400 active:text-white cursor-pointer disabled:bg-slate-200 disabled:cursor-wait disabled:text-black disabled:border-black"
                >
                  Upload
                  <input
                    type="file"
                    name="photo"
                    ref={filePickerRef}
                    accept="image/*"
                    hidden
                    onChange={uploadProfilePhoto}
                  />
                </button>
              </div>
            </div>
            {status === STATUSES.ERROR && (
              <h3 className="text-red-500 text-sm md:text-lg font-medium">
                Error : {statusMessage}
              </h3>
            )}
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-3 lg:space-y-0 lg:space-x-5">
              <button
                type="submit"
                className="mt-2 py-1 px-6 rounded-sm w-40 text-xl text-blue-600 border border-blue-500 hover:bg-blue-200 active:bg-blue-400 active:text-white cursor-pointer"
              >
                {status === STATUSES.LOADING ? (
                  <img src={Loader} alt="Loading..." className="w-8 mx-auto" />
                ) : (
                  "Sign Up"
                )}
              </button>
              <Link to={"/auth/login"} className="text-blue-500 text-lg">
                Already have an Account !, Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
