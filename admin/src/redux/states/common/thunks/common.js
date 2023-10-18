import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getRoleId = createAsyncThunk(
  "roles/list",
  async (payload, Thunk) => {
    try {
      let response = (await axios.get("/admin_api/roles/list"))?.data;
      let rolesData = [];

      response.body.data.map((role) => {
        rolesData.push({
          ...role,
          value: role.name,
          label: role.name,
        });
      });
      response.body.data = rolesData;
      return response;
    } catch (error) {
      console.log("error====>", error);
      return Thunk.rejectWithValue(error);
    }
  }
);
