import React from "react";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { Link } from "react-router-dom";

const PaymentSuccessPage = () => {
  return (
    <div className="flex justify-center md:py-40 w-full min-h-screen bg-gray-50">
      <div className="flex flex-col items-center justify-center border-2 w-screen md:w-[60vw] h-screen md:h-[40vh] bg-white shadow-lg shadow-indigo-500/50 p-10 space-y-3">
        <div className="p-5 border-2 border-slate-400 w-20 h-20 rounded-full mx-auto">
          <DoneAllIcon fontSize="large" className="text-red-500" />
        </div>
        <h2 className="font-semibold text-3xl text-red-500 text-center">
          Order Successful
        </h2>
        <h3 className="font-medium text-xl text-slate-500 text-center">
          Congratulations, Your Order has been placed Successfully
        </h3>
        <Link
          to={"/myorders"}
          className="py-2 px-6 w-52 text-center rounded-sm text-xl bg-red-500 text-white font-bold border border-red-500 hover:bg-red-400 active:bg-red-600 active:text-white cursor-pointer"
        >
          Your Orders
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
