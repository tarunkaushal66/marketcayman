import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfigs = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth", "theme"],
};

const rootReducer = (state, action) => {
  const split = action.type?.split("/");
  const stateName = split?.[0];
  const typeName = split[split?.length - 1];
  const types = ["pending", "fulfilled", "rejected"];
  var newState = null;
  if (
    split?.length > 2 &&
    types?.includes(typeName) &&
    !types.includes(stateName)
  ) {
    newState = { ...state };
    // console.log("Billi ", action);
    if (typeName === "pending") {
      newState[stateName] = {
        ...newState[stateName],
        showLoader: action.meta.arg?.showLoader === false ? false : true,
        status: "LOADING",
      };
    } else if (typeName === "fulfilled") {
      newState[stateName] = {
        ...newState[stateName],
        showLoader: false,
        status: "SUCCEDED",
      };
    } else if (typeName === "rejected") {
      newState[stateName] = {
        ...newState[stateName],
        showLoader: false,
        status: "FAILED",
      };
    }
    return appReducer(newState, action);
  }
  //  else if (action.type === "auth/logout") {
  //   return appReducer(undefined, action);
  // }
  else {
    return appReducer(state, action);
  }
};

const persistedReducer = persistReducer(persistConfigs, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
