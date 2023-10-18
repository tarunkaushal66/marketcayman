import { createSlice } from "@reduxjs/toolkit";
import { getImageLink } from "./thunk";

const initialState = {
  image: {},
};

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {},
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(getImageLink.pending, (state, action) => {})
  //     .addCase(getImageLink.fulfilled, (state, action) => {
  //       state.image = action.payload;
  //     })
  //     .addCase(getImageLink.rejected, (state, action) => {});
  // },
});

export default commonSlice.reducer;
