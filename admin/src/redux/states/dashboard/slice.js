import { createSlice, current } from "@reduxjs/toolkit";
import status from "../../constants/status";

import { dashboard } from "./thunks/dashboard";

const initialState = {
  dashboard: {
    user: null,
    subadmin: null,
    content: null,
    contest: null,
    reported_users: null,
    help_support: null,
    faq: null,
    settings: null,
    account_setting: null,
    status: false,
    showLoader: false,
  },
  pieChartData: null,
  users: [],
};

const slice = createSlice({
  name: "dashboard",
  initialState: { ...initialState },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(dashboard.pending, (state, action) => {});
    builder.addCase(dashboard.fulfilled, (state, action) => {
      state.dashboard = { ...action.payload.body.dashboard };
      state.pieChartData = action.payload.body.pieChatData;
      state.users = action.payload.body.users;
    });
    builder.addCase(dashboard.rejected, (state, action) => {});
  },
});

export default slice;
