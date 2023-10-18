import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const editSubAdmin = createAsyncThunk(
  "sub_admin/editSubAdmin",
  async (payload, Thunk) => {
    try {
      let response = (await axios.post("/admin_api/subadmin/edit", payload))
        ?.data;
      return response;
    } catch (error) {
      console.log("error====>", error);
      return Thunk.rejectWithValue(error);
    }
  }
);
