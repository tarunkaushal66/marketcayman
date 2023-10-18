import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const dashboard = createAsyncThunk(
  "dashboard/dashboard",
  async (payload, Thunk) => {
    try {
      let response = (await axios.get("/admin_api/auth/dashboard"))?.data;
      console.log("Call Finished", response);
      return response;
    } catch (error) {
      console.log("error====>", error);
      return Thunk.rejectWithValue(error);
    }
  }
);
