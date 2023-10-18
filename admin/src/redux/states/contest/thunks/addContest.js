import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addContest = createAsyncThunk(
  "contest/addContest",
  async (payload, Thunk) => {
    try {
      let request = {
        contest_name: payload?.contest_name,
        description: payload?.description,
        pie_chart_percentage: JSON.stringify(payload?.pie_chart_percentage),
        media:
          payload?.media.length > 0
            ? JSON.stringify(payload?.media)
            : JSON.stringify([
                {
                  image_url:
                    "https://zenaura-aram.s3.amazonaws.com/users/1693889136536",
                  name: "dog",
                },
              ]),
        question_title: payload?.question_title,
        participation_fee: payload?.participation_fee,
        number_of_winners: payload?.number_of_winners,
        website_and_address: payload?.website_and_address,
        auto_creation: payload?.auto_creation ? 1 : 0,
        status: payload?.status ? 1 : 0,
      };

      let response = (await axios.post("/admin_api/contest/add", request))
        ?.data;
      console.log("Call Finished", response);
      return response;
    } catch (error) {
      console.log("error====>", error);
      return Thunk.rejectWithValue(error);
    }
  }
);
