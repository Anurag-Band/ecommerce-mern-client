import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import axios from "axios";
import { STATUSES } from "../../utils/STATUSES";

const initialState = {
  cartItems: [],
  subTotal: 0,
  status: STATUSES.IDLE,
  statusMessage: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // for fetchCartItems ->>
      .addCase(fetchCartItems.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.cartItems = action.payload.cart.items;
        state.subTotal = action.payload.cart.subTotal;
        state.statusMessage = action.payload.status;
      })
      .addCase(fetchCartItems, (state, action) => {
        state.status = STATUSES.ERROR;
        state.statusMessage = action.payload;
      })

      // for addToCart,removeFromCart,decreaseCartItemQuantity  ->>
      .addMatcher(
        isAnyOf(
          addToCart.pending,
          removeFromCart.pending,
          decreaseCartItemQuantity.pending
        ),
        (state) => {
          state.status = STATUSES.LOADING;
        }
      )
      .addMatcher(
        isAnyOf(
          addToCart.fulfilled,
          removeFromCart.fulfilled,
          decreaseCartItemQuantity.fulfilled
        ),
        (state, action) => {
          state.status = STATUSES.IDLE;
          state.statusMessage = action.payload.error;
        }
      )
      .addMatcher(
        isAnyOf(
          addToCart.rejected,
          removeFromCart.rejected,
          decreaseCartItemQuantity.rejected
        ),
        (state, action) => {
          state.status = STATUSES.ERROR;
          state.statusMessage = action.payload;
        }
      );
  },
});

export default cartSlice.reducer;

// for fetchCartItems ->>
export const fetchCartItems = createAsyncThunk("cartItems/fetch", async () => {
  const { data } = await axios.get(`/api/v1/cart`);
  return data;
});

// for addToCart ->>
export const addToCart = createAsyncThunk(
  "cartItems/add",
  async (itemId, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(`/api/v1/cart`, { itemId }, config);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// for removeFromCart ->>
export const removeFromCart = createAsyncThunk(
  "cartItems/remove",
  async (itemId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/v1/cart?itemId=${itemId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// for decreaseCartItemQuantity ->>
export const decreaseCartItemQuantity = createAsyncThunk(
  "cartItems/decreaseItemQuantity",
  async (itemId, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/v1/cart?itemId=${itemId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
