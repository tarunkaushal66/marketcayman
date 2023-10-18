import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ data }, Thunk) => {
    try {
      const body = { email: data.email };
      let response = (await axios.post("/admin_api/auth/forgot_password", body))
        ?.data;
      return response;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);

export default forgotPassword;
