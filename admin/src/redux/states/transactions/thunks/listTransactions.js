import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const listTransactions = createAsyncThunk(
  "transactions/listTransactions",
  async (payload, Thunk) => {
    try {
      const queryParams = [];
      console.log("///payload", payload);
      if (payload?.limit) {
        queryParams.push(`limit=${payload.limit}`);
      }

      if (payload?.page) {
        queryParams.push(`page=${payload.page}`);
      }

      if (payload?.start_date) {
        queryParams.push(`start_date=${payload.sort}`);
      }

      if (payload?.end_date) {
        queryParams.push(`end_date=${payload.filter_status}`);
      }

      if (payload?.timezoneOffsetStr) {
        queryParams.push(`timezoneOffsetStr=${payload.timezoneOffsetStr}`);
      }

      // Combine all query parameters into a single string
      const query = queryParams.join("&");

      // Construct the full URL with query parameters
      const url = `/admin_api/transactions/list${query ? `?${query}` : ""}`;
      let response = (await axios.get(url))?.data;
      console.log("Call Finished", response);
      return response;
    } catch (error) {
      console.log("error====>", error);
      return Thunk.rejectWithValue(error);
    }
  }
);
