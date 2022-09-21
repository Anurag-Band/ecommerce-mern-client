import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adminGetProductReviews,
  deleteReset,
  adminDeleteReview,
} from "../../features/product/productSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { DataGrid } from "@mui/x-data-grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useParams } from "react-router-dom";
import { STATUSES } from "../../utils/STATUSES";
import Loader from "../../assets/loader.svg";
import { ToastContainer, toast } from "react-toastify";

const AdminReviewsPage = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const [searchInput, setSearchInput] = useState("");

  const { allReviews, status, isReviewDeleted } = useSelector(
    (state) => state.product
  );

  const rows = [];

  allReviews &&
    allReviews.length > 0 &&
    allReviews.forEach((review) =>
      rows.push({
        id: review._id,
        user: review.user && review.user.name,
        comment: review.comment,
        rating: review.rating,
      })
    );

  const columns = [
    {
      field: "id",
      headerName: "Review ID",
      minWidth: 50,
      flex: 0.17,
      headerClassName: "admin-dashboard-header",
    },
    {
      field: "user",
      headerName: "User",
      minWidth: 50,
      flex: 0.1,
      headerClassName: "admin-dashboard-header",
    },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 100,
      flex: 0.2,
      headerClassName: "admin-dashboard-header",
    },
    {
      field: "rating",
      headerName: "Rating",
      minWidth: 50,
      flex: 0.08,
      headerClassName: "admin-dashboard-header",
    },
    {
      field: "actions",
      flex: 0.08,
      headerClassName: "admin-dashboard-header",
      headerName: "Actions",
      minWidth: 50,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <button
            type="button"
            onClick={() => handleDeleteReview(params.row.id)}
          >
            <DeleteForeverIcon />
          </button>
        );
      },
    },
  ];

  const handleSearchReviews = (e) => {
    e.preventDefault();

    if (!searchInput) return;

    dispatch(adminGetProductReviews(searchInput))
      .then(unwrapResult)
      .then((obj) => {
        console.log({ adminProductReviewThen: obj });
        setSearchInput("");

        if (obj.reviews && obj.reviews.length === 0) {
          toast.dark("No Reviews Found!", {
            position: "bottom-center",
            autoClose: 3000,
          });
        }
      })
      .catch((obj) => console.log({ adminProductReviewCatch: obj }));
  };

  const handleDeleteReview = (reviewId) => {
    dispatch(adminDeleteReview({ reviewId, productId }))
      .then(unwrapResult)
      .then((obj) => {
        console.log({ adminDeleteReviewThen: obj });
      })
      .catch((obj) => console.log({ adminDeleteReviewCatch: obj }));
  };

  useEffect(() => {
    if (!productId) return;

    dispatch(adminGetProductReviews(productId))
      .then(unwrapResult)
      .then((obj) => {
        console.log({ adminProductReviewThen: obj });

        if (obj.reviews && obj.reviews.length === 0) {
          toast.dark("No Reviews Found!", {
            position: "bottom-center",
            autoClose: 3000,
          });
        }
      })
      .catch((obj) => console.log({ adminProductReviewCatch: obj }));

    if (isReviewDeleted) {
      toast.dark("Review Deleted Successfully!", {
        position: "bottom-left",
        autoClose: 3000,
      });
      dispatch(deleteReset());
    }
  }, [dispatch, productId, isReviewDeleted]);

  return (
    <main className="w-full h-full flex flex-col">
      <ToastContainer />
      <h2 className="text-2xl lg:text-4xl flex justify-center items-center pb-5 font-semibold text-slate-600 h-[6vh]">
        {productId ? "Reviews" : "Search Reviews"}
      </h2>
      {!productId && (
        <form
          className="h-[20vh] flex flex-col items-center space-y-5"
          onSubmit={handleSearchReviews}
        >
          <input
            type="text"
            value={searchInput}
            placeholder="Enter Product ID here..."
            onChange={(e) => setSearchInput(e.target.value)}
            className="custom-input w-96 border border-slate-400 placeholder:text-lg"
          />
          <button
            type="submit"
            disabled={!searchInput}
            className="py-2 px-6 rounded-sm w-40 text-xl bg-purple-500 text-white font-bold border-2 border-purple-500 hover:bg-white hover:text-purple-500 active:bg-purple-600 active:text-white cursor-pointer disabled:hover:bg-purple-500 disabled:hover:text-white  disabled:cursor-not-allowed"
          >
            Search
          </button>
        </form>
      )}
      <div className={`${productId ? "h-[80vh] mt-10" : "h-[68vh]"} bg-white`}>
        {status === STATUSES.LOADING ? (
          <div className="flex items-center justify-center w-full h-full">
            <img src={Loader} alt="Loading..." className="w-24 h-24" />
          </div>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            getCellClassName={() => "sec-cell"}
          />
        )}
      </div>
    </main>
  );
};

export default AdminReviewsPage;
