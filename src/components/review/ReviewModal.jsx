import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Rating from "@mui/material/Rating";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "../../features/product/productSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { STATUSES } from "../../utils/STATUSES";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #6631e1",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

const ReviewModal = ({ open, handleClose, productId }) => {
  const dispatch = useDispatch();
  const { statusMessage, status, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmitReview = (e) => {
    e.preventDefault();
    dispatch(addReview({ rating, comment, productId }))
      .then(unwrapResult)
      .then((obj) => {
        console.log({ addReviewThen: obj });
        handleClose();
        setRating(0);
        setComment("");
      })
      .catch((obj) => console.log({ addReviewCatch: obj }));
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {isAuthenticated ? (
            <form onSubmit={handleSubmitReview} className="space-y-3">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Submit A Review
              </Typography>
              <Rating
                name="half-rating"
                size="large"
                value={rating}
                precision={0.5}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
              <textarea
                value={comment}
                rows={5}
                placeholder="How's the Product..."
                className="w-full focus:ring-0 rounded-sm resize-none"
                onChange={(e) => setComment(e.target.value)}
              />
              {status === STATUSES.ERROR && (
                <h3 className="text-red-500 text-sm md:text-lg font-medium">
                  Error : {statusMessage}
                </h3>
              )}
              <button
                type="submit"
                className="py-1 px-6 rounded-sm w-52 mx-auto text-xl text-blue-600 border border-blue-500 hover:bg-blue-200 active:bg-blue-400 active:text-white cursor-pointer"
              >
                Submit Review
              </button>
            </form>
          ) : (
            <h2 className="text-lg md:text-2xl font-medium text-slate-500 py-10">
              You Need to Login to Submit a Review...
            </h2>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ReviewModal;
