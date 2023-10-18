import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const listContest = createAsyncThunk("contest/listContest", async (payload, Thunk) => {
  try {
    const queryParams = [];
    console.log('///payload',payload)
    if (payload?.limit) {
      queryParams.push(`limit=${payload.limit}`);
    }

    if (payload?.page) {
      queryParams.push(`page=${payload.page}`);
    }

    if (payload?.sort) {
      queryParams.push(`sort=${payload.sort}`);
    }

    if (payload?.filter_status) {
      queryParams.push(`filter_status=${payload.filter_status}`);
    }

    // Combine all query parameters into a single string
    const query = queryParams.join('&');

    // Construct the full URL with query parameters
    const url = `/admin_api/contest/list${query ? `?${query}` : ''}`;
    let response =  (await axios.get(url))?.data;
    console.log("Call Finished",response);
    return response 
   } catch (error) {
    console.log('error====>',error)
    return Thunk.rejectWithValue(error);
  }
});