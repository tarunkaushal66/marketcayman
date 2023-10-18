import { createSlice, current } from "@reduxjs/toolkit";
import status from "../../constants/status";

import { login } from "./thunks/login";
import { getProfile } from "./thunks/profile/getProfile";
import forgotPassword from "./thunks/forgot-password";
import resetPassword from "./thunks/reset-password";
import { logoutAdmin } from "./thunks/logout";

const initialState = {
  admin: null,
  signupuser: null,
  forgetpass: null,
  isAuthenticated: false,
  showLoader: false,
};

const slice = createSlice({
  name: "auth",
  initialState: { ...initialState },
  reducers: {
    logout: (proxy, action) => {
      return initialState;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {})
      .addCase(login.fulfilled, (state, action) => {
        state.admin = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.admin = initialState.admin;
        state.isAuthenticated = initialState.isAuthenticated;
      });
    builder
      .addCase(logoutAdmin.pending, (state, action) => {})
      .addCase(logoutAdmin.fulfilled, (state, action) => {
        state.admin = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(logoutAdmin.rejected, (state, action) => {
        state.admin = initialState.admin;
        state.isAuthenticated = initialState.isAuthenticated;
      });
    builder.addCase(getProfile.pending, (state, action) => {});
    builder.addCase(getProfile.fulfilled, (state, action) => {
      console.log("profile", action.payload);
      delete action.payload.body.access_token;
      state.admin = { ...state.admin, ...action.payload.body };
    });
    builder.addCase(getProfile.rejected, (state, action) => {});
    builder.addCase(forgotPassword.pending, (state, action) => {});
    builder.addCase(forgotPassword.fulfilled, (state, action) => {});
    builder.addCase(forgotPassword.rejected, (state, action) => {});
    builder.addCase(resetPassword.pending, (state, action) => {});
    builder.addCase(resetPassword.fulfilled, (state, action) => {});
    builder.addCase(resetPassword.rejected, (state, action) => {});
  },
});

export default slice;
