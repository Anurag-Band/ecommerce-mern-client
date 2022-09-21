import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShippingInfo } from "../../features/order/orderSlice";
import { Country, State } from "country-state-city";
import HomeIcon from "@mui/icons-material/Home";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import ShareLocationIcon from "@mui/icons-material/ShareLocation";
import PhoneIcon from "@mui/icons-material/Phone";
import PublicIcon from "@mui/icons-material/Public";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../../components/order/CheckoutSteps";
import CustomNavigateTo from "../../components/custom/CustomNavigateTo";
const ShippingInfoPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shippingInfo = useSelector((state) => state.order.shippingInfo);

  const [address, setAddress] = useState(shippingInfo.address || "");
  const [city, setCity] = useState(shippingInfo.city || "");
  const [phoneNumber, setPhoneNumber] = useState(
    shippingInfo.phoneNumber || undefined
  );
  const [postalCode, setPostalCode] = useState(
    shippingInfo.postalCode || undefined
  );
  const [country, setCountry] = useState(shippingInfo.country || "");
  const [state, setState] = useState(shippingInfo.state || "");

  const [error, setError] = useState("");

  const handleShippingDetailsSubmit = (e) => {
    e.preventDefault();

    if (phoneNumber.length !== 10) {
      return setError("Phone Number should be of 10 Digits!");
    }

    const SHIPPING_INFO = {
      address,
      city,
      state,
      country,
      phoneNumber,
      postalCode,
    };

    dispatch(setShippingInfo(SHIPPING_INFO));

    navigate("/order/confirm");
  };
  return (
    <section className="min-h-screen w-full">
      <CheckoutSteps activeStep={0} />
      <div className="container mx-auto w-4/5 flex flex-col items-center">
        <CustomNavigateTo location={"/cart"} />
        <h2 className="text-xl md:text-3xl font-medium text-slate-600 mb-5">
          Shipping Details
        </h2>
        <form
          className="flex flex-col gap-4"
          encType="multipart/form-data"
          onSubmit={handleShippingDetailsSubmit}
        >
          <div className="relative">
            <HomeIcon className="custom-input-icon" />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="custom-input"
            />
          </div>
          <div className="relative">
            <CorporateFareIcon className="custom-input-icon" />
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="custom-input"
            />
          </div>
          <div className="relative">
            <ShareLocationIcon className="custom-input-icon" />
            <input
              type="number"
              placeholder="Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
              className="custom-input"
            />
          </div>
          <div className="relative">
            <PhoneIcon className="custom-input-icon" />
            <input
              type="number"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="custom-input"
            />
          </div>
          <div className="relative">
            <PublicIcon className="custom-input-icon" />
            <select
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="custom-input"
            >
              <option value="">Country</option>
              {Country &&
                Country.getAllCountries().map((country) => (
                  <option value={country.isoCode} key={country.isoCode}>
                    {country.name}
                  </option>
                ))}
            </select>
          </div>
          {country && (
            <div className="relative">
              <TransferWithinAStationIcon className="custom-input-icon" />
              <select
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="custom-input"
              >
                <option value="">State</option>
                {State &&
                  State.getStatesOfCountry(country).map((state) => (
                    <option value={state.isoCode} key={state.isoCode}>
                      {state.name}
                    </option>
                  ))}
              </select>
            </div>
          )}
          {error && <h3>{error}</h3>}
          <button
            type="submit"
            className="py-1 px-6 rounded-sm w-full text-xl text-red-600 border border-red-500 hover:bg-red-200 active:bg-red-400 active:text-white cursor-pointer text-center"
          >
            Continue
          </button>
        </form>
      </div>
    </section>
  );
};

export default ShippingInfoPage;
