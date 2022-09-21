import React from "react";
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const CustomNavigateTo = ({ location }) => {
  return (
    <Link
      to={location}
      className="absolute left-10 top-10 z-10 mb-5 w-28 flex items-center cursor-pointer"
    >
      <ArrowBackIosNewIcon fontSize="large" className="text-red-600" />
      <h3 className="text-xl font-semibold text-red-600">Go Back</h3>
    </Link>
  );
};

export default CustomNavigateTo;
