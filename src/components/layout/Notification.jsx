import React from "react";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import NotListedLocationIcon from "@mui/icons-material/NotListedLocation";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "react-router-dom";

const Notification = () => {
  return (
    <header className="hidden md:block bg-slate-800 text-yellow-300">
      <nav className="container mx-auto flex items-center justify-between p-2 lg:px-8">
        <div className="flex items-center space-x-5 lg:space-x-10">
          <h2 className="cursor-pointer">
            <LocalOfferIcon /> <span> Offers</span>
          </h2>
          <h2 className="cursor-pointer">
            <LocalShippingIcon /> <span> Free Shipping</span>
          </h2>
          <h2 className="cursor-pointer">
            <PhoneIphoneIcon /> <span> Download App</span>
          </h2>
        </div>

        <div className="flex items-center space-x-5 lg:space-x-10">
          <h2 className="cursor-pointer">
            <PhoneInTalkIcon /> <span> Contact Us</span>
          </h2>
          <h2 className="cursor-pointer">
            <InfoIcon /> <span> About Us</span>
          </h2>
          <Link to={"/myorders"} className="cursor-pointer">
            <NotListedLocationIcon /> <span> Track Order</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Notification;
