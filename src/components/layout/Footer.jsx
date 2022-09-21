import React from "react";
import RestoreIcon from "@mui/icons-material/Restore";
import MoneyIcon from "@mui/icons-material/Money";
import PayImg from "../../assets/landing-page-images/bewakoof-imgs/secure-payments-image.webp";
import AppStoreBtn from "../../assets/landing-page-images/downloadBtn/app-store.png";
import PlayStoreBtn from "../../assets/landing-page-images/downloadBtn/play-store.png";

import Facebook from "../../assets/landing-page-images/socialIcon/facebook-icon.svg";
import Instagram from "../../assets/landing-page-images/socialIcon/instagram-icon.png";
import Whatsapp from "../../assets/landing-page-images/socialIcon/whatsapp-icon.svg";
import Twitter from "../../assets/landing-page-images/socialIcon/twitter-icon.svg";
import Mail from "../../assets/landing-page-images/socialIcon/mail-icon.svg";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white p-4 md:p-8 lg:p-16">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center md:items-baseline space-y-10 md:space-y-0">
        <div className="space-y-5 flex flex-col w-full md:max-w-fit">
          <h2 className="text-3xl lg:text-5xl font-bold text-yellow-300 font-primary">
            cash-N-carry
            <p className="text-xs md:text-sm text-yellow-300 mt-3 text-start md:text-center tracking-widest">
              WORK HARDER, PURCHASE HARDER
            </p>
          </h2>
          <h3 className="text-sm md:text-base font-semibold text-yellow-300">
            CUSTOMER SERVICE
          </h3>
          <div className="space-y-2 text-sm">
            <p className="cursor-pointer">Contact Us</p>
            <p className="cursor-pointer">Track Order</p>
            <p className="cursor-pointer">Sell with Us</p>
          </div>
          <div className="space-y-1 text-orange-500">
            <p className="flex items-center space-x-2">
              <RestoreIcon /> <span> 15 Days return policy*</span>
            </p>
            <p className="flex items-center space-x-2">
              <MoneyIcon /> <span> Cash On Delivery*</span>
            </p>
          </div>
        </div>

        <div className="hidden xl:flex flex-col">
          <div>
            <h2 className="text-lg md:text-xl font-medium text-yellow-300">
              DOWNLOAD THE APP
            </h2>
            <div className="flex items-center space-x-3">
              <img
                src={AppStoreBtn}
                alt="AppStoreBtn"
                className="w-32 cursor-pointer"
              />
              <img
                src={PlayStoreBtn}
                alt="PlayStoreBtn"
                className="w-32 cursor-pointer"
              />
            </div>
          </div>
          <div className="flex flex-col w-full md:max-w-fit">
            <h2 className="text-sm md:text-base font-semibold text-yellow-300">
              CONNECT WITH US
            </h2>
            <div className="mt-6 flex items-center space-x-10">
              <img
                src={Facebook}
                alt="Facebook"
                className="w-8 rounded-lg cursor-pointer hover:scale-110 transition-all delay-110"
              />
              <img
                src={Instagram}
                alt="Instagram"
                className="w-8 rounded-lg cursor-pointer hover:scale-110 transition-all delay-110"
              />
              <img
                src={Whatsapp}
                alt="Whatsapp"
                className="w-8 rounded-lg cursor-pointer hover:scale-110 transition-all delay-110"
              />
              <img
                src={Twitter}
                alt="Twitter"
                className="w-9 rounded-lg cursor-pointer hover:scale-110 transition-all delay-110"
              />
              <img
                src={Mail}
                alt="Mail"
                className="w-9 rounded-lg cursor-pointer hover:scale-110 transition-all delay-110"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full md:max-w-fit">
          <h2 className="text-lg md:text-xl font-medium text-yellow-300">
            KEEP UP TO DATE
          </h2>
          <p className="text-sm md:text-base font-normal text-yellow-300 mt-3">
            Sign Up for Our Newsletter
          </p>
          <div>
            <input
              type="email"
              placeholder="Enter Email Id"
              className="mt-10 focus:ring-0 border-b-2 border-b-yellow-400 focus:border-b-yellow-400 border-t-0 border-l-0 border-r-0 bg-slate-800"
            />
            <button className="py-[0.6rem] px-4 bg-yellow-400 text-slate-800 font-semibold ">
              SUBSCRIBE
            </button>
          </div>
          <h2 className="text-sm md:text-lg font-medium text-orange-500 mt-10">
            100% Secure Payment*
            <img src={PayImg} alt="Payment" className="w-96 mt-2" />
          </h2>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
