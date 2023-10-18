import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSettingList = createAsyncThunk(
  "settings/list?type=1",
  async (payload, Thunk) => {
    try {
      let response = await axios.get("/admin_api/setting/list?type=1");
      return response.data;
    } catch (error) {
      console.log("error====>", error);
      return Thunk.rejectWithValue(error);
    }
  }
);
export const addSettings = createAsyncThunk(
  "settings/add",
  async (settings, Thunk) => {
    try {
      let response = await axios.post("/admin_api/setting/add", settings);
      return response.data;
    } catch (error) {
      console.log("error====>", error);
      return Thunk.rejectWithValue(error);
    }
  }
);

export const getFAQs = createAsyncThunk(
  "settings/faq/list",
  async (request, Thunk) => {
    try {
      let response = await axios.get(
        `/admin_api/faq/list?page=${request.page}&&limit=${request.limit}`
      );
      return response.data;
    } catch (error) {
      console.log("error====>", error);
      return Thunk.rejectWithValue(error);
    }
  }
);

export const addFAQ = createAsyncThunk(
  "settings/faq/add",
  async (faq, Thunk) => {
    try {
      let response = await axios.post(`/admin_api/faq/add`, faq);
      return response.data;
    } catch (error) {
      console.log("error====>", error);
      return Thunk.rejectWithValue(error);
    }
  }
);
export const editFAQ = createAsyncThunk(
  "settings/faq/edit",
  async (faq, Thunk) => {
    try {
      let response = await axios.post(`/admin_api/faq/edit`, faq);
      return response.data;
    } catch (error) {
      console.log("error====>", error);
      return Thunk.rejectWithValue(error);
    }
  }
);
export const removeFAQ = createAsyncThunk(
  "settings/faq/delete",
  async (id, Thunk) => {
    try {
      let response = await axios.post(`/admin_api/faq/delete/${id}`);
      return response.data;
    } catch (error) {
      console.log("error====>", error);
      return Thunk.rejectWithValue(error);
    }
  }
);
export const getContentList = createAsyncThunk(
  "settings/cms/list",
  async (id, Thunk) => {
    try {
      let response = await axios.get(`/admin_api/cms/list`);
      return response.data;
    } catch (error) {
      console.log("error====>", error);
      return Thunk.rejectWithValue(error);
    }
  }
);
export const editContent = createAsyncThunk(
  "settings/cms/edit",
  async (newContent, Thunk) => {
    try {
      let response = await axios.post(
        `/admin_api/cms/edit/${newContent.value}`,
        newContent
      );
      return response.data;
    } catch (error) {
      console.log("error====>", error);
      return Thunk.rejectWithValue(error);
    }
  }
);
