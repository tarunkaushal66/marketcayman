import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addSubAdmin = createAsyncThunk(
  "sub_admin/addSubAdmin",
  async (payload, Thunk) => {
    try {
      let newHeaders = {
        "Content-Type": "multipart/form-data",
      };
      let response = (
        await axios.post("/admin_api/subadmin/add", payload, {
          headers: {
            ...axios.defaults.headers,
            ...newHeaders,
          },
        })
      )?.data;
      return response;
    } catch (error) {
      console.log("error====>", error);
      return Thunk.rejectWithValue(error);
    }
  }
);
