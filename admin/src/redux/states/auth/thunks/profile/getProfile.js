import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProfile = createAsyncThunk(
  "auth/profile",
  async (payload, Thunk) => {
    try {
      let response = (await axios.get("/admin_api/auth/profile"))?.data;
      return response;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);
