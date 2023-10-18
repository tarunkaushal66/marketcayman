import { createSlice, current } from "@reduxjs/toolkit";
import status from "../../constants/status";

import { listTransactions } from "./thunks/listTransactions";

const initialState = {
  transactions: [],
};

const slice = createSlice({
  name: "reported_users",
  initialState: { ...initialState },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(listTransactions.pending, (state, action) => {
    });
    builder.addCase(listTransactions.fulfilled, (state, action) => {
      state.transactions=action.payload.body;
    });
    builder.addCase(listTransactions.rejected, (state, action) => {
    });
  },
});

export default slice;
