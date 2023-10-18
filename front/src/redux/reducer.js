import { combineReducers } from "@reduxjs/toolkit";
import responsiveSlice from "./responsive/slice";
import themeSlice from "./theme/slice";
import authSlice from "./auth/slice";
import profileSlice from "./profile/slice";
import addsSlice from "./adds/slice";
import commonSlice from "./common/slice";

export const appReducer = combineReducers({
  responsive: responsiveSlice,
  theme: themeSlice,
  auth: authSlice,
  profile: profileSlice,
  ads: addsSlice,
  common: commonSlice,
});
