import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteSubAdmin = createAsyncThunk(
  "sub_admin/deleteSubAdmin",
  async (id, Thunk) => {
    try {
      let response = (await axios.post(`/admin_api/subadmin/delete/${id}`))
        ?.data;

      return response;
    } catch (error) {
      console.log("error====>", error);
      return Thunk.rejectWithValue(error);
    }
  }
);
