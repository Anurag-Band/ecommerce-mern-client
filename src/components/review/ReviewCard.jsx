import React from "react";
import Rating from "@mui/material/Rating";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "@mui/material";
import { userDeleteReview } from "../../features/product/productSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const ReviewCard = ({ review, productId }) => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleUserDeleteReview = () => {
    dispatch(userDeleteReview(productId))
      .then(unwrapResult)
      .then((obj) => console.log({ userDeleteReviewThen: obj }))
      .catch((obj) => console.log({ userDeleteReviewCatch: obj }));
  };

  return (
    <section className="relative p-6 border border-slate-400 rounded shadow-lg bg-white flex flex-col items-center justify-center w-[23rem] gap-3 mx-auto">
      <img
        src={review.user.photo.secure_url}
        alt={review.name}
        className="w-20 h-20 object-cover rounded-full"
      />
      {isAuthenticated && user._id === review.user._id && (
        <Tooltip
          onClick={handleUserDeleteReview}
          title="Delete Review"
          placement="left-start"
        >
          <DeleteForeverIcon
            fontSize="medium"
            className="absolute top-5 right-5 text-red-600 cursor-pointer"
          />
        </Tooltip>
      )}

      <h2 className="font-semibold tracking-widest">{review.name}</h2>
      <Rating
        size="medium"
        value={review.rating}
        readOnly={true}
        precision={0.5}
      />
      <p className="line-clamp-3">{review.comment}</p>
    </section>
  );
};

export default ReviewCard;
