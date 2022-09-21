import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { STATUSES } from "../../utils/STATUSES";

const SHIPPING_INFO = "shippingInfo";

const initialState = {
  shippingInfo: localStorage.getItem(SHIPPING_INFO)
    ? JSON.parse(localStorage.getItem(SHIPPING_INFO))
    : {},
  status: STATUSES.IDLE,
  message: null,
  orders: [],
  orderDetails: {},
  // ADMIN states ->>
  allOrders: null,
  totalRevenue: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
      localStorage.setItem(SHIPPING_INFO, JSON.stringify(action.payload));
    },
    clearErrors: (state) => {
      state.status = STATUSES.IDLE;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // for createOrder ->>
      .addCase(createOrder.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.message = action.payload.message;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.message = action.payload.error;
      })

      // for fetchMyOrders ->>
      .addCase(fetchMyOrders.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.orders = action.payload.orders;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.message = action.payload.error;
      })

      // for fetchOrderDetails ->>
      .addCase(fetchOrderDetails.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.orderDetails = action.payload.order;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.message = action.payload.error;
      })

      // ADMIN Reducers ->>

      //  for adminGetAllOrders

      .addCase(adminGetAllOrders.fulfilled, (state, action) => {
        state.allOrders = action.payload.orders;
        state.totalRevenue = action.payload.totalAmount;
        state.status = STATUSES.IDLE;
      });
  },
});

export const { setShippingInfo, clearErrors } = orderSlice.actions;
export default orderSlice.reducer;

// for createOrder ->>
export const createOrder = createAsyncThunk(
  "order/create",
  async ({ order }, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const { data } = await axios.post("/api/v1/order/new", order, config);

      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

// for fetchMyOrders ->>
export const fetchMyOrders = createAsyncThunk(
  "myorders/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/myorders`);

      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

// for fetchOrderDetails ->>
export const fetchOrderDetails = createAsyncThunk(
  "order/details/fetch",
  async (orderId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/order/?id=${orderId}`);

      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

// ADMIN Thunks ->>

// for adminGetAllOrders ->>
export const adminGetAllOrders = createAsyncThunk(
  "admin/orders/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/admin/orders`);

      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);
