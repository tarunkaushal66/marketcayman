import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const editProfile = createAsyncThunk(
  "auth/edit_profile",
  async (profileData, Thunk) => {
    try {
      let response = (
        await axios.post("/admin_api/auth/edit_profile", profileData)
      )?.data;
      return response;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);
