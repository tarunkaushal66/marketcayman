import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk("auth/login", async (payload, Thunk) => {
  try {
    let response = (await axios.post("admin/auth/login", payload.data))?.data;
    return response;
  } catch (error) {
    return Thunk.rejectWithValue(error);
  }
});
