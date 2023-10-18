import axios from "axios";
import config from "../config";

export default function runAxiosSetup({ apiUrl, bearerToken, headers = {} }) {
  axios.defaults.baseURL = apiUrl;
  axios.defaults.headers = {
    Accept: "application/json",
    Authorization: bearerToken ? "Bearer " + bearerToken : undefined,
    // secretkey: config.secretkey,
    // publishkey: config.publishkey,
    ...headers,
  };

  axios.interceptors.response.clear();
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
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
        errorObject.message = "Unknown Error!!!";
        errorObject.code = "X_UNKNOWN_ERROR";
        errorObject.type = 0;
      }

      return Promise.reject(errorObject);
    }
  );
}
