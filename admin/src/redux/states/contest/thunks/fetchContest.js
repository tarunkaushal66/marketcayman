import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchContest = createAsyncThunk(
  "contest/fetchContest",
  async (payload, Thunk) => {
    try {
      let response = (await axios.get("/admin_api/contest/view/" + payload.data.id))
        ?.data;
      console.log("Call Finished", response);
      return response;
    } catch (error) {
      console.log("error====>", error);
      return Thunk.rejectWithValue(error);
    }
  }
);
export default fetchContest;