import axios from "axios";
import { REACT_APP_API_BASE_URL } from "./configs";

const baseURL = REACT_APP_API_BASE_URL;

export default function runAxiosSetup({ token, id, headers = {} }) {
  axios.defaults.baseURL = baseURL;
  axios.defaults.headers = {
    // Accept: "application/json",
    authorization: `Bearer ${token}`,
    customerid: id,
    ...headers,
  };

  // axios.interceptors.response.clear();

  axios.interceptors.response.use(
    function (response) {
      // if ([1, "success"].includes(response.data.status)) {
      if (response.data.statusCode.toString().startsWith("2")) {
        return response;
      } else {
        var errorObject = {};
        if (response) {
          if (response.data?.message === "Not Authorized!") {
            errorObject.message = "Not Authorized!!";
            errorObject.code = "X_SERVER_ERROR";
            errorObject.type = 0;
          } else {
            errorObject.message = response.data.message || "Server Error !!!";
            errorObject.code = response.data.code || "X_SERVER_ERROR";
            errorObject.type = response.status;
            errorObject.data = response.data;
          }
        }
        return Promise.reject(errorObject);
      }
    },
    function (error) {
      var errorObject = {};
      if (error.response) {
        errorObject.message = error.response.data.message || "Server Error!!!";
        errorObject.code = error.response.data.code || "X_SERVER_ERROR";
        errorObject.type = error.response.status;
        errorObject.data = error.response.data;
      } else if (error.code === "ERR_NETWORK") {
        errorObject.message = "Network Error!!!";
        errorObject.code = "X_NETWORK_ERROR";
        errorObject.type = 0;
      } else {
        errorObject.message = error.message || "Unknown Error!!!";
        errorObject.code = error.code || "X_UNKNOWN_ERROR";
        errorObject.type = error.type || 0;
        errorObject.data = error.data || null;
      }
      return Promise.reject(errorObject);
    }
  );
}
