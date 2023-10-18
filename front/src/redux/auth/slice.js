import { createSlice } from "@reduxjs/toolkit";
import { login, logout } from "./thunk";

const initialState = {
  user: {},
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {})
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {});
    builder
      .addCase(logout.pending, (state, action) => {})
      .addCase(logout.fulfilled, (state, action) => {
        state.user = {};
      })
      .addCase(logout.rejected, (state, action) => {});
  },
});

export default authSlice.reducer;
