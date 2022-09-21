import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import axios from "axios";
import { STATUSES } from "../../utils/STATUSES";

const initialState = {
  products: [],
  resultPerPage: 0,
  totalProductsCount: 0,
  filteredProductsCount: 0,
  status: STATUSES.IDLE,
  productDetails: {},
  errorMessage: "",
  reviewSuccess: null,
  productReviews: [],
  isReviewDeleted: false,
  // ADMIN states ->>
  allProducts: null,
  allReviews: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    //  for fetchProducts
    setProducts(state, action) {
      state.products = action.payload;
    },
    setResultPerPage(state, action) {
      state.resultPerPage = action.payload;
    },
    setTotalProductsCount(state, action) {
      state.totalProductsCount = action.payload;
    },
    setFilteredProductsCount(state, action) {
      state.filteredProductsCount = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    deleteReset: (state) => {
      state.isReviewDeleted = false;
    },
  },
  extraReducers: (builder) => {
    builder
      //  for fetchProductDetails
      .addCase(fetchProductDetails.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.productDetails = action.payload.product;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.errorMessage = action.payload.message;
      })

      //  for addReview
      .addCase(addReview.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.reviewSuccess = action.payload.success;
        state.errorMessage = action.payload.error;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.errorMessage = action.payload.error;
        state.reviewSuccess = false;
      })

      //  for fetchSingleProductReviews
      .addCase(fetchSingleProductReviews.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchSingleProductReviews.fulfilled, (state, action) => {
        state.productReviews = action.payload.reviews;
        state.status = STATUSES.IDLE;
        state.errorMessage = action.payload.error;
      })
      .addCase(fetchSingleProductReviews.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.errorMessage = action.payload.error;
      })

      // ADMIN Reducers ->>

      //  for adminGetAllProducts
      .addCase(adminGetAllProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload.products;
        state.status = STATUSES.IDLE;
      })

      //  for adminGetProductReviews
      .addCase(adminGetProductReviews.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(adminGetProductReviews.fulfilled, (state, action) => {
        state.allReviews = action.payload.reviews;
        state.status = STATUSES.IDLE;
      })
      .addCase(adminGetProductReviews.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.statusMessage = action.payload.error;
      })

      //  for adminDeleteProduct
      .addCase(adminDeleteProduct.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(adminDeleteProduct.fulfilled, (state, action) => {
        state.statusMessage = action.payload.message;
        state.status = STATUSES.IDLE;
      })
      .addCase(adminDeleteProduct.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.statusMessage = action.payload.error;
      })

      // for userDeleteReview, adminDeleteReview->>
      .addMatcher(
        isAnyOf(userDeleteReview.pending, adminDeleteReview.pending),
        (state) => {
          state.status = STATUSES.LOADING;
        }
      )
      .addMatcher(
        isAnyOf(userDeleteReview.fulfilled, adminDeleteReview.fulfilled),
        (state, action) => {
          state.status = STATUSES.IDLE;
          state.statusMessage = action.payload.message;
          state.isReviewDeleted = true;
        }
      )
      .addMatcher(
        isAnyOf(userDeleteReview.rejected, adminDeleteReview.rejected),
        (state, action) => {
          state.status = STATUSES.ERROR;
          state.statusMessage = action.payload.error;
          state.isReviewDeleted = false;
        }
      );
  },
});

export const {
  setProducts,
  setResultPerPage,
  setTotalProductsCount,
  setFilteredProductsCount,
  setStatus,
  deleteReset,
} = productSlice.actions;
export default productSlice.reducer;

// for fetchAllProducts ->>
export const fetchAllProducts =
  (search = "", currentPage = 1, price = [0, 5000], category, ratings = 0) =>
  async (dispatch) => {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      let LINK = `/api/v1/products?search=${search}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      if (category) {
        LINK = `/api/v1/products?search=${search}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }

      const res = await fetch(LINK);
      const data = await res.json();
      dispatch(setProducts(data.products));
      dispatch(setResultPerPage(data.resultPerPage));
      dispatch(setTotalProductsCount(data.totalProductsCount));
      dispatch(setFilteredProductsCount(data.filteredProductsCount));

      dispatch(setStatus(STATUSES.IDLE));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };

// for fetchProductDetails ->>
export const fetchProductDetails = createAsyncThunk(
  "productDetails/fetch",
  async (id) => {
    const { data } = await axios.get(`/api/v1/product/${id}`);
    return data;
  }
);

// for addReview ->>
export const addReview = createAsyncThunk(
  "user/review/add",
  async ({ rating, comment, productId }, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const { data } = await axios.put(
        "/api/v1/review",
        { rating, comment, productId },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// for fetchSingleProductReviews ->>
export const fetchSingleProductReviews = createAsyncThunk(
  "singleProductReviews/fetch",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/reviews?id=${productId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// for UserDeleteReview ->>
export const userDeleteReview = createAsyncThunk(
  "user/review/delete",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/review?productId=${productId}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// ADMIN Thunks ->>

// adminGetAllProducts ->>
export const adminGetAllProducts = createAsyncThunk(
  "admin/products/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/admin/products`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// for adminGetProductReviews ->>
export const adminGetProductReviews = createAsyncThunk(
  "admin/reviews/fetch",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/admin/reviews?id=${productId}`);

      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

// for adminDeleteProduct ->>
export const adminDeleteProduct = createAsyncThunk(
  "admin/product/delete",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/v1/admin/product/${id}`);

      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

// for adminDeleteReview ->>
export const adminDeleteReview = createAsyncThunk(
  "admin/review/delete",
  async ({ reviewId, productId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/admin/review?reviewId=${reviewId}&productId=${productId}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
