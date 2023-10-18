import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const imageUpload = createAsyncThunk(
  "common/imageUpload",
  async (payload, Thunk) => {
    try {
      const formData = new FormData();
      formData.append("file", payload.file);
      formData.append("folder", "users");

      let newHeaders = {
        "Content-Type": "multipart/form-data",
      };

      const axiosInstanceWithHeaders = axios.create({
        headers: {
          ...axios.defaults.headers, // Merge default headers
          ...newHeaders, // Merge custom headers
        },
      });

      let response = (
        await axiosInstanceWithHeaders.post("/common/upload_image", formData)
      )?.data;

      return response;
    } catch (error) {
      console.log("error====>", error);
      return Thunk.rejectWithValue(error);
    }
  }
);
