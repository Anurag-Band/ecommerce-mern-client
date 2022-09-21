import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import { api } from "../../api/backend-config";
import { STATUSES } from "../../utils/STATUSES";

const initialState = {
  user: null,
  isAuthenticated: false,
  status: STATUSES.IDLE,
  statusMessage: null,
  isUpdated: false,
  errorMessage: null,
  // ADMIN states ->>
  allUsers: null,
  isDeleted: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.status = STATUSES.IDLE;
      state.statusMessage = null;
    },
    updateReset: (state) => {
      state.isUpdated = false;
    },
    deleteReset: (state) => {
      state.isDeleted = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // for logoutUser ->>
      .addCase(logoutUser.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = STATUSES.IDLE;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })

      // ADMIN Reducers ->>

      //  for adminGetAllUsers

      .addCase(adminGetAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload.users;
        state.status = STATUSES.IDLE;
      })

      // for adminDeleteUser ->>
      .addCase(adminDeleteUser.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(adminDeleteUser.fulfilled, (state, action) => {
        state.isDeleted = true;
        state.statusMessage = action.payload.message;
        state.status = STATUSES.IDLE;
      })
      .addCase(adminDeleteUser.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.isDeleted = false;
        state.statusMessage = action.payload.message;
      })

      // for forgotPassword->>
      .addMatcher(
        isAnyOf(forgotPassword.pending, resetPassword.pending),
        (state, action) => {
          state.status = STATUSES.LOADING;
          state.errorMessage = null;
        }
      )
      .addMatcher(
        isAnyOf(forgotPassword.fulfilled, resetPassword.fulfilled),
        (state, action) => {
          state.status = STATUSES.IDLE;
          state.errorMessage = action.payload.error;
          state.statusMessage = action.payload.message;
        }
      )
      .addMatcher(
        isAnyOf(forgotPassword.rejected, resetPassword.rejected),
        (state, action) => {
          state.status = STATUSES.ERROR;
          state.statusMessage = action.payload.error;
        }
      )

      // for updateProfile, updatePassword ->>
      .addMatcher(
        isAnyOf(updateProfile.pending, updatePassword.pending),
        (state, action) => {
          state.status = STATUSES.LOADING;
        }
      )
      .addMatcher(
        isAnyOf(updateProfile.fulfilled, updatePassword.fulfilled),
        (state, action) => {
          state.status = STATUSES.IDLE;
          state.statusMessage = "Profile Update Successfully";
          state.isUpdated = action.payload.user;
        }
      )
      .addMatcher(
        isAnyOf(updateProfile.rejected, updatePassword.rejected),
        (state, action) => {
          state.status = STATUSES.ERROR;
          state.statusMessage = action.payload.error;
          state.isUpdated = false;
        }
      )

      // for loginUser, registerUser, loadUser ->>
      .addMatcher(
        isAnyOf(loginUser.pending, registerUser.pending, loadUser.pending),
        (state, action) => {
          state.status = STATUSES.LOADING;
          state.isAuthenticated = false;
        }
      )
      .addMatcher(
        isAnyOf(
          loginUser.fulfilled,
          registerUser.fulfilled,
          loadUser.fulfilled
        ),
        (state, action) => {
          state.user = action.payload.user;
          state.isAuthenticated = true;
          state.status = STATUSES.IDLE;
        }
      )
      .addMatcher(
        isAnyOf(loginUser.rejected, registerUser.rejected, loadUser.rejected),
        (state, action) => {
          state.status = STATUSES.ERROR;
          state.user = null;
          state.isAuthenticated = false;
          state.statusMessage = action.payload.error;
        }
      );
  },
});

export const { clearErrors, updateReset, deleteReset } = authSlice.actions;
export default authSlice.reducer;

// for loginUser ->>
export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await api.post("/login", { email, password }, config);

    if (data.error) {
      return rejectWithValue(data);
    }

    return data;
  }
);

// for registerUser ->>
export const registerUser = createAsyncThunk(
  "user/signup",
  async (formData, { rejectWithValue }) => {
    const { name, email, password, photo } = formData;
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await api.post(
      "/signup",
      { name, email, password, photo },
      config
    );

    if (data.error) {
      return rejectWithValue(data);
    }

    return data;
  }
);

// for loadUser ->>
export const loadUser = createAsyncThunk(
  "user/load",
  async (_, { rejectWithValue }) => {
    const { data } = await api.get("/me");

    if (data.error) {
      return rejectWithValue(data);
    }

    return data;
  }
);

// for logoutUser ->>
export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    const { data } = await api.get("/logout");

    if (data.error) {
      return rejectWithValue(data);
    }

    return data;
  }
);

// for updateProfile ->>
export const updateProfile = createAsyncThunk(
  "user/profile/update",
  async (userData, { rejectWithValue }) => {
    const { name, email, photo } = userData;
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await api.put(
      "/me/update",
      { name, email, photo },
      config
    );

    if (data.error) {
      return rejectWithValue(data);
    }

    return data;
  }
);

// for updatePassword ->>
export const updatePassword = createAsyncThunk(
  "user/password/change",
  async ({ formData }, { rejectWithValue }) => {
    try {
      let formObject = {};
      formData.forEach(function (value, key) {
        formObject[key] = value;
      });

      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const { data } = await api.put("/password/update", formObject, config);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// for forgotPassword ->>
export const forgotPassword = createAsyncThunk(
  "user/password/forgot",
  async ({ email }, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const { data } = await api.post("/password/forgot", { email }, config);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// for resetPassword ->>
export const resetPassword = createAsyncThunk(
  "user/password/reset",
  async ({ password, confirmPassword, token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const { data } = await api.put(
        `/password/reset/${token}`,
        { password, confirmPassword },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// ADMIN Thunks ->>

// for adminGetAllUsers ->>
export const adminGetAllUsers = createAsyncThunk(
  "admin/users/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/admin/users`);

      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

// for adminDeleteUser ->>
export const adminDeleteUser = createAsyncThunk(
  "admin/user/delete",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/admin/user/${userId}`);

      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);
