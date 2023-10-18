import { createSlice } from "@reduxjs/toolkit";
import status from "../../constants/status";

import { listSubAdmin } from "./thunks/listSubAdmin";
import { addSubAdmin } from "./thunks/addSubAdmin";
import { deleteSubAdmin } from "./thunks/deleteSubAdmin";
import { viewSubAdmin } from "./thunks/viewSubAdmin";

const initialState = {
  sub_admins: [],
  subAdminDetails: {},
};

const slice = createSlice({
  name: "sub_admin",
  initialState: { ...initialState },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listSubAdmin.pending, (state, action) => {})
      .addCase(listSubAdmin.fulfilled, (state, action) => {
        state.sub_admins = action.payload.body;
      })
      .addCase(listSubAdmin.rejected, (state, action) => {});
    builder
      .addCase(viewSubAdmin.pending, (state, action) => {
        state.status = status.LOADING;
      })
      .addCase(viewSubAdmin.fulfilled, (state, action) => {
        state.status = status.SUCCEDED;
        state.subAdminDetails = action.payload.body;
      })
      .addCase(viewSubAdmin.rejected, (state, action) => {
        state.status = status.FAILED;
      });
    builder
      .addCase(addSubAdmin.pending, (state, action) => {})
      .addCase(addSubAdmin.fulfilled, (state, action) => {})
      .addCase(addSubAdmin.rejected, (state, action) => {});
    builder
      .addCase(deleteSubAdmin.pending, (state, action) => {})
      .addCase(deleteSubAdmin.fulfilled, (state, action) => {
        state.sub_admins.data = state?.sub_admins?.data?.filter(
          (item) => item._id != action?.payload?.body?.id
        );
        state.sub_admins.total_count -= 1;
      })
      .addCase(deleteSubAdmin.rejected, (state, action) => {});
  },
});

export default slice;
