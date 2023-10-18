import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const updateContestStatus = createAsyncThunk(
  "contest/updateContestStatus",
  async (payload, Thunk) => {
    try {
      let response = (await axios.post("/admin_api/contest/update_status/" + payload.data.id))
        ?.data;
      console.log("Call Finished", response);
      return response;
    } catch (error) {
      console.log("error====>", error);
      return Thunk.rejectWithValue(error);
    }
  }
);
export default updateContestStatus;