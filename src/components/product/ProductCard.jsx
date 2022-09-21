import React from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/product/${product._id}`}
      className="flex flex-col max-h-96 space-y-1 bg-white rounded-sm transition-all delay-75 hover:-translate-y-2 shadow-lg shadow-indigo-300/50"
    >
      <div className="overflow-hidden">
        <img
          src={product.photos[0].secure_url}
          alt={product.name}
          className="object-cover h-[13rem] w-[12rem] xs:h-[17rem] xs:w-[15rem] md:h-[19rem] md:w-[19rem] hover:scale-110 transition-all delay-75"
        />
      </div>
      <div className="p-3 space-y-2">
        <p className="font-medium text-base text-slate-600 truncate">
          {product.name}
        </p>
        <div className="flex items-center space-x-1">
          <Rating
            size="medium"
            value={product.ratings}
            readOnly={true}
            precision={0.5}
          />
          <span className="flex items-center text-sm text-slate-600 font-normal">
            ({product.numOfReviews})
          </span>
        </div>
        <p className="font-semibold text-lg">{`$ ${product.price}`}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
