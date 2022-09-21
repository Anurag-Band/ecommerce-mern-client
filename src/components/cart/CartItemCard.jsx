import React from "react";
import { Link } from "react-router-dom";

const CartItemCard = ({ item }) => {
  return (
    <>
      <Link
        to={`/product/${item.itemId._id}`}
        className="w-40 h-40 overflow-hidden rounded-full"
      >
        <img
          src={item.itemId?.photos[0].secure_url}
          alt={item.name}
          className="w-40 h-40 object-cover"
        />
      </Link>
      <h3 className="text-md text-slate-500 font-medium line-clamp-2 w-[40%] px-2">
        {item.name}
      </h3>
    </>
  );
};

export default CartItemCard;
