import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllCategories = createAsyncThunk(
  "ads/category",
  async (user, Thunk) => {
    try {
      const response = await axios.get("user/ads/category");
      console.log("categories response", response);

      return response.data;
    } catch (err) {
      return Thunk.rejectWithValue(err);
    }
  }
);

export const getSubCategories = createAsyncThunk(
  "ads/subcategory",
  async (categoryId, Thunk) => {
    try {
      const response = await axios.get(
        `user/ads/subcategory?categoryId=${categoryId}`
      );
      return response.data;
    } catch (err) {
      return Thunk.rejectWithValue(err);
    }
  }
);

export const getProductFormFields = createAsyncThunk(
  "ads/attributes",
  async (category, Thunk) => {
    try {
      const response = await axios.get(
        `user/ads/attributes?productType=${category}`
      );
      return response.data;
    } catch (err) {
      return Thunk.rejectWithValue(err);
    }
  }
);

export const createAdd = createAsyncThunk("ads/create", async (add, Thunk) => {
  try {
    const response = await axios.post(`user/ads/create`, add);
    return response.data;
  } catch (err) {
    return Thunk.rejectWithValue(err);
  }
});

export const getAllAdds = createAsyncThunk("ads/all", async (user, Thunk) => {
  try {
    const response = await axios.post("user/ads/all");
    return response.data;
  } catch (err) {
    return Thunk.rejectWithValue(err);
  }
});

export const getAddDetails = createAsyncThunk(
  "ads/details",
  async (id, Thunk) => {
    try {
      const response = await axios.get(`/user/ads/details?id=${id}`);
      return response.data;
    } catch (err) {
      return Thunk.rejectWithValue(err);
    }
  }
);
