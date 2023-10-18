import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { random } from "lodash";

export const addUser = createAsyncThunk(
  "user/addUser",
  async ({data}, Thunk) => {
    try {
      let body = {
        name: data?.name,
        username: data?.username,
        email: data?.email,
        password: data?.password
          ? data?.password
          : random(11111111111111, 99999999999999, true),
        full_phone_number: data?.full_phone_number,
        status: data?.status ? 1 : 0,
        image: data?.image,
      };

      let response = (await axios.post("/admin_api/user/add", body))?.data;
      console.log("Call Finished", response);
      return response;
    } catch (error) {
      console.log("error====>", error);
      return Thunk.rejectWithValue(error);
    }
  }
);
