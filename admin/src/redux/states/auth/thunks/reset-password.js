import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data, Thunk) => {
    try {
      let response = (await axios.post("admin/auth/changepassword", data))
        ?.data;
      return response;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);

export default resetPassword;
