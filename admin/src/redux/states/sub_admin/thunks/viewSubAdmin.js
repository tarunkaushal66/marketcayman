import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const viewSubAdmin = createAsyncThunk(
  "sub_admin/viewSubAdmin",
  async (id, Thunk) => {
    try {
      const url = `/admin_api/subadmin/view/${id}`;
      let response = (await axios.get(url))?.data;
      return response;
    } catch (error) {
      console.log("error====>", error);
      return Thunk.rejectWithValue(error);
    }
  }
);
