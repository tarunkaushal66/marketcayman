import { createSlice, current } from "@reduxjs/toolkit";
import status from "../../constants/status";

import { listContest } from "./thunks/listContest";
import { addContest } from "./thunks/addContest";
import { deleteContest } from "./thunks/deleteContest";
import fetchContest from "./thunks/fetchContest";
import updateContestStatus from "./thunks/updateContestStatus";

const initialState = {
  contests: [],
  fetchedContest: null,
};

const slice = createSlice({
  name: "contests",
  initialState: { ...initialState },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(listContest.pending, (state, action) => {});
    builder.addCase(listContest.fulfilled, (state, action) => {
      console.log(
        "///////////",
        action.payload,
        "//////",
        JSON.stringify(state)
      );
      return {
        ...state,
        contests: action.payload.body,
      };
    });
    builder.addCase(listContest.rejected, (state, action) => {});
    builder.addCase(addContest.pending, (state, action) => {});
    builder.addCase(addContest.fulfilled, (state, action) => {});
    builder.addCase(addContest.rejected, (state, action) => {});
    builder.addCase(deleteContest.pending, (state, action) => {});
    builder.addCase(deleteContest.fulfilled, (state, action) => {
      state.contests.data = state?.contests?.data?.filter(
        (item) => item._id != action?.payload?.body?.id
      );
      state.contests.total_count -= 1;
    });
    builder.addCase(deleteContest.rejected, (state, action) => {
    });

    builder.addCase(fetchContest.pending, (state, action) => {});
    builder.addCase(fetchContest.fulfilled, (state, action) => {
      state.fetchedContest = action?.payload?.body;
    });
    builder.addCase(fetchContest.rejected, (state, action) => {
      state.fetchedContest = initialState.fetchedContest;
    });
    builder.addCase(updateContestStatus.pending, (state, action) => {});
    builder.addCase(updateContestStatus.fulfilled, (state, action) => {});
    builder.addCase(updateContestStatus.rejected, (state, action) => {});
  },
});

export default slice;
