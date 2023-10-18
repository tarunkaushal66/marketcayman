import { combineReducers } from "@reduxjs/toolkit";

//reducers
import authReducer from "./states/auth/reducer";
import dashReducer from "./states/dashboard/reducer";
import manageUserReducer from "./states/user/reducer";
import manageContestReducer from "./states/contest/reducer";
import reportUserReducer from "./states/reported_users/reducer";
import transactionReducer from "./states/transactions/reducer";
import subAdminReducer from "./states/sub_admin/reducer";
import settingReducer from "./states/settings/slice";
import commonReducer from "./states/common/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashReducer,
  user: manageUserReducer,
  contest: manageContestReducer,
  reported_user: reportUserReducer,
  transactions: transactionReducer,
  sub_admin: subAdminReducer,
  settings: settingReducer,
  common: commonReducer,
});

export default rootReducer;
