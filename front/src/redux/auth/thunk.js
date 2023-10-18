import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("auth/login", async (user, Thunk) => {
  try {
    const response = await axios.post("user/auth/login", user);
    return response.data;
  } catch (err) {
    return Thunk.rejectWithValue(err);
  }
});

export const logout = createAsyncThunk("auth/logout", async (user, Thunk) => {
  try {
    const response = await axios.post("user/auth/logout", user);
    return response.data;
  } catch (err) {
    return Thunk.rejectWithValue(err);
  }
});

export const signup = createAsyncThunk("auth/signup", async (user, Thunk) => {
  try {
    const response = await axios.post("user/auth/signup", user);
    return response.data;
  } catch (err) {
    return Thunk.rejectWithValue(err);
  }
});
