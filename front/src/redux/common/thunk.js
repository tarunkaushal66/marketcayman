import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getImageLink = createAsyncThunk(
  "common/image/upload",
  async (file, Thunk) => {
    try {
      const response = await axios.post("api/image/upload", file);
      return response.data;
    } catch (err) {
      return Thunk.rejectWithValue(err);
    }
  }
);
