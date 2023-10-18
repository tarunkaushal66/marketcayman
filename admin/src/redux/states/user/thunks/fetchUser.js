import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { random } from "lodash";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async ({ data }, Thunk) => {
    console.log("sonna",data);
    try {
      let response = (await axios.get("/admin_api/user/view/"+data.id))?.data;
      console.log("Call Finished", response);
      return response;
    } catch (error) {
      console.log("error====>", error);
      return Thunk.rejectWithValue(error);
    }
  }
);
