import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const changePassword = createAsyncThunk(
  "auth/change_password",
  async (newPassword, Thunk) => {
    try {
      let response = (
        await axios.post("/admin_api/auth/change_password", newPassword)
      )?.data;
      return response;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);
