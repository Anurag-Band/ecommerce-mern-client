import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { capitaliseFirstLetter } from "../../utils/capitaliseFirstLetter";

const OrderDetailsPage = ({ order }) => {
  const user = useSelector((state) => state.auth.user);

  const ADDRESS = `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.country}, ${order.shippingInfo.postalCode}`;

  return (
    <div className="flex flex-col py-3 px-7 space-y-3">
      <div className="space-y-7">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-600">
          Shipping Info
        </h2>
        <div className="space-y-2">
          <h3 className="texl-xl font-semibold">
            Name:
            <span className="text-lg font-medium text-slate-500 ml-3">
              {capitaliseFirstLetter(user.name)}
            </span>
          </h3>
          <h3 className="texl-xl font-semibold">
            Phone No:
            <span className="text-lg font-medium text-slate-500 ml-3">
              {order.shippingInfo.phoneNumber}
            </span>
          </h3>
          <h3 className="texl-xl font-semibold">
            Address:
            <span className="text-lg font-medium text-slate-500 ml-3">
              {ADDRESS}
            </span>
          </h3>
        </div>
      </div>
      <div className="space-y-3">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-600">
          Payment Details
        </h2>
        <h3 className="texl-xl font-semibold">
          Status:
          <span className="text-lg font-semibold text-green-500 ml-3">
            {capitaliseFirstLetter(order.paymentInfo.status)}
          </span>
        </h3>
        <h3 className="texl-xl font-semibold">
          Total Amount:
          <span className="text-lg font-medium text-slate-500 ml-3">
            $ {order.totalAmount}
          </span>
        </h3>
      </div>
      <div className="space-y-5">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-600">
          Order Items
        </h2>
        <div>
          {order.orderItems &&
            order.orderItems.length > 0 &&
            order.orderItems.map((item) => (
              <div
                key={item.itemId._id}
                className="flex items-center space-x-5"
              >
                <Link
                  to={`/product/${item.itemId._id}`}
                  className="w-28 h-28 overflow-hidden rounded-full"
                >
                  <img
                    src={item.itemId?.photos[0].secure_url}
                    alt={item.name}
                    className="w-28 h-28 object-cover"
                  />
                </Link>
                <h3 className="text-md text-slate-600 font-semibold px-2">
                  {item.name}
                </h3>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
