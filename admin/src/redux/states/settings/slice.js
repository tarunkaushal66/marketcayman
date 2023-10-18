import { createSlice } from "@reduxjs/toolkit";
import status from "../../constants/status";
import { getContentList, getFAQs, getSettingList } from "./thunk";

const initialState = {
  status: false,
  settings: {},
  faqsList: {},
  contentList: {},
  showLoader: false,
};

const settingSlice = createSlice({
  name: "settingSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSettingList.pending, (state, action) => {
        state.status = status.LOADING;
      })
      .addCase(getSettingList.fulfilled, (state, action) => {
        state.settings = action.payload;
        state.status = status.SUCCEDED;
      })
      .addCase(getSettingList.rejected, (state, action) => {
        state.status = status.FAILED;
      });
    builder
      .addCase(getFAQs.pending, (state, action) => {
        state.status = status.LOADING;
      })
      .addCase(getFAQs.fulfilled, (state, action) => {
        state.faqsList = action.payload;
        state.status = status.SUCCEDED;
      })
      .addCase(getFAQs.rejected, (state, action) => {
        state.status = status.FAILED;
      });
    builder
      .addCase(getContentList.pending, (state, action) => {
        state.status = status.LOADING;
      })
      .addCase(getContentList.fulfilled, (state, action) => {
        state.contentList = action.payload;
        state.status = status.SUCCEDED;
      })
      .addCase(getContentList.rejected, (state, action) => {
        state.status = status.FAILED;
      });
  },
});

export default settingSlice.reducer;
