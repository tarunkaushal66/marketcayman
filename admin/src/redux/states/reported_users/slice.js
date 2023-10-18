import { createSlice } from "@reduxjs/toolkit";
import status from "../../constants/status";

import {
  getReportedUsersDetails,
  listReportedUsers,
} from "./thunks/listReportedUsers";

const initialState = {
  reported_user: [],
  reported_user_details: {},
};

const slice = createSlice({
  name: "reported_users",
  initialState: { ...initialState },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listReportedUsers.pending, (state, action) => {
      })
      .addCase(listReportedUsers.fulfilled, (state, action) => {
        return {
          ...state,
          reported_user: action.payload.body,
        };
      })
      .addCase(listReportedUsers.rejected, (state, action) => {
      });
    builder
      .addCase(getReportedUsersDetails.pending, (state, action) => {
      })
      .addCase(getReportedUsersDetails.fulfilled, (state, action) => {
        state.reported_user_details = action.payload;
      })
      .addCase(getReportedUsersDetails.rejected, (state, action) => {
      });
  },
});

export default slice;
