import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserProfile = createAsyncThunk(
  "profile/details",
  async (user, Thunk) => {
    try {
      const response = await axios.get("user/profile/details");
      return response.data;
    } catch (err) {
      return Thunk.rejectWithValue(err);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "profile/edit",
  async (user, Thunk) => {
    try {
      const response = await axios.put("user/profile/edit", user);
      return response.data;
    } catch (err) {
      return Thunk.rejectWithValue(err);
    }
  }
);

export const updateUserPassword = createAsyncThunk(
  "profile/changepassword",
  async (password, Thunk) => {
    try {
      const response = await axios.put("user/profile/changepassword", password);
      return response.data;
    } catch (err) {
      return Thunk.rejectWithValue(err);
    }
  }
);
