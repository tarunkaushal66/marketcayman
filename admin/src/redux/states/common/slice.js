import { createSlice, current } from "@reduxjs/toolkit";
import status from "../../constants/status";
import { imageUpload } from "./thunks/imageUpload";
import { getRoleId } from "./thunks/common";

const initialState = {
  status: false,
  showLoader: false,
  availableRoles: {},
};

const slice = createSlice({
  name: "common",
  initialState: { ...initialState },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(imageUpload.pending, (state, action) => {
      console.log("Vello1", state);
    });
    builder.addCase(imageUpload.fulfilled, (state, action) => {
      console.log("Vello2", state);
      // return {
      //   ...state,
      //   transactions: action.payload.body
      // }
    });
    builder.addCase(imageUpload.rejected, (state, action) => {
      console.log("Vello3", state);
    });
    builder
      .addCase(getRoleId.pending, (state, action) => {})
      .addCase(getRoleId.fulfilled, (state, action) => {
        state.availableRoles = action.payload.body;
      })
      .addCase(getRoleId.rejected, (state, action) => {});
  },
});

export default slice;
