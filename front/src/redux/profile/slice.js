import { createSlice } from "@reduxjs/toolkit";
import { getUserProfile } from "./thunk";

const initialState = {
  userProfile: {},
};

const profileSlice = createSlice({
  name: "profileSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state, action) => {})
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {});
  },
});

export default profileSlice.reducer;
