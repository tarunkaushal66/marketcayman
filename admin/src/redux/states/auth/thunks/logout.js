import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const logoutAdmin = createAsyncThunk(
  "auth/logout",
  async (data, Thunk) => {
    try {
      let response = (await axios.post("admin/auth/logout", data))?.data;
      return response;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);
