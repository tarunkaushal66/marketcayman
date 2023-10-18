import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-phone-input-2/lib/style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={"loading"} persistor={persistor}>
      <BrowserRouter>
        <App />
        <ToastContainer autoClose={2000} />
        <ScrollToTop />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
