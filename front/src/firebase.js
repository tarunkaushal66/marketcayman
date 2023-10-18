import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCqZfE3XysqeXLuXeL5ZEyT1nkWoMnOv_U",
  authDomain: "market-cayman.firebaseapp.com",
  projectId: "market-cayman",
  storageBucket: "market-cayman.appspot.com",
  messagingSenderId: "258470124303",
  appId: "1:258470124303:web:9cce3e3975b9bae237fc7a",
  measurementId: "G-DXMS210J35",
};

// client creds

// const firebaseConfig = {
//   apiKey: "AIzaSyA77uM7t_0q1wXW73frNi717e42qZN8afw",
// authDomain: "marketcayman-77d2a.firebaseapp.com",
//   projectId: "marketcayman-77d2a",
//   storageBucket: "marketcayman-77d2a.appspot.com",
//   messagingSenderId: "119199783478",
//   appId: "1:119199783478:web:8a047cf73f501f63a21697",
//   measurementId: "G-P05CTNMGRE",
// };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
