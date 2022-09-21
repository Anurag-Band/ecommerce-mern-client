import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  loadUser,
  updateProfile,
  updateReset,
} from "../../features/auth/authSlice";
import { STATUSES } from "../../utils/STATUSES";
import EditIcon from "@mui/icons-material/Edit";
import { unwrapResult } from "@reduxjs/toolkit";
import Loader from "../../assets/loader.svg";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const filePickerRef = useRef();
  const dispatch = useDispatch();

  const { user, status, isUpdated } = useSelector((state) => state.auth);

  const [updateToggle, setUpdateToggle] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const [profilePhoto, setProfilePhoto] = useState("");
  const [previewPhoto, setPreviewPhoto] = useState("");

  const uploadProfilePhoto = (e) => {
    if (e.target.files) {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setProfilePhoto(reader.result);
          setPreviewPhoto(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleUpdateProfile = () => {
    if (name === user.name) {
      return alert("Name is same as Before, Please Update it!");
    }
    if (email === user.email) {
      return alert("Email is same as Before, Please Update it!");
    }

    if (name !== "" || email !== "") {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      if (profilePhoto !== "") {
        formData.append("photo", profilePhoto);
      }

      dispatch(updateProfile(Object.fromEntries(formData)))
        .then(unwrapResult)
        .then((obj) => {
          console.log({ updateProfieThen: obj });
          setUpdateToggle(false);
        })
        .catch((obj) => console.log({ updateProfieCatch: obj }));
    }
  };

  useEffect(() => {
    if (status === STATUSES.ERROR) {
      setTimeout(() => dispatch(clearErrors()), 3000);
    }

    if (isUpdated) {
      dispatch(loadUser());
      dispatch(updateReset());
    }
  }, [dispatch, status, isUpdated]);

  return (
    <section className="min-h-[85vh]">
      {status === STATUSES.IDLE ? (
        <div className="container mx-auto px-5 xl:px-32">
          <h2 className="text-2xl md:text-4xl text-slate-500 font-semibold font-primary my-5 md:my-10">
            {updateToggle ? "Update Profile" : "My Profile"}
          </h2>
          <div className="flex flex-col sm:flex-row items-center px-5 space-x-96">
            <div className="flex flex-col space-y-10 items-center relative">
              {updateToggle && (
                <div
                  onClick={() => filePickerRef.current.click()}
                  className="bg-red-500 p-1 rounded-full flex items-center justify-center absolute right-0 top-7 cursor-pointer"
                >
                  <EditIcon className="text-white" />
                  <input
                    type="file"
                    name="photo"
                    ref={filePickerRef}
                    accept="image/*"
                    hidden
                    onChange={uploadProfilePhoto}
                  />
                </div>
              )}
              <div className="overflow-hidden rounded-full">
                <img
                  src={previewPhoto ? previewPhoto : user.photo.secure_url}
                  alt={user.name}
                  className={`w-72 h-72 object-fill rounded-full`}
                  onClick={() => previewPhoto && filePickerRef.current.click()}
                />
              </div>
              <button
                type="button"
                onClick={() => setUpdateToggle((prev) => !prev)}
                className="py-1 px-6 rounded-sm w-52 text-xl text-red-600 border border-red-500 hover:bg-red-200 active:bg-red-400 active:text-white cursor-pointer text-center"
              >
                {updateToggle ? "Cancel" : "Edit Profile"}
              </button>
            </div>
            <div className="flex flex-col space-y-7">
              <div className="flex flex-col items-center space-y-3">
                <h3 className="text-lg md:text-xl font-semibold font-primary">
                  Full Name
                </h3>
                {updateToggle === true ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => name === "" && setName(user.name)}
                  />
                ) : (
                  <p className="text-base md:text-2xl font-secondary font-medium text-orange-500">
                    {user.name}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-center space-y-3">
                <h3 className="text-lg md:text-xl font-semibold font-primary">
                  Email
                </h3>
                {updateToggle === true ? (
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => email === "" && setEmail(user.email)}
                  />
                ) : (
                  <p className="text-base md:text-2xl font-secondary font-medium text-orange-500">
                    {user.email}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-center space-y-3">
                <h3 className="text-lg md:text-xl font-semibold font-primary">
                  Joined On
                </h3>
                <p className="text-base md:text-2xl font-secondary font-medium text-orange-500">
                  {user.createdAt.substr(0, 10)}
                </p>
              </div>
              {updateToggle === false ? (
                <>
                  <button className="py-1 px-6 rounded-sm w-52 text-xl text-blue-600 border border-blue-500 hover:bg-blue-200 active:bg-blue-400 active:text-white cursor-pointer">
                    My Orders
                  </button>
                  <Link
                    to={"/account/password/update"}
                    className="py-1 px-6 rounded-sm w-52 text-xl text-red-600 border border-red-500 hover:bg-red-200 active:bg-red-400 active:text-white cursor-pointer text-center"
                  >
                    Change Password
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleUpdateProfile}
                  className="py-1 px-6 rounded-sm w-52 text-xl text-blue-600 border border-blue-500 hover:bg-blue-200 active:bg-blue-400 active:text-white cursor-pointer"
                >
                  {status === STATUSES.LOADING ? (
                    <img
                      src={Loader}
                      alt="Loading..."
                      className="w-8 mx-auto"
                    />
                  ) : (
                    "Update Profile"
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full min-h-[60vh]">
          <img src={Loader} alt="Loading..." className="w-24 h-24" />
        </div>
      )}
    </section>
  );
};

export default ProfilePage;
