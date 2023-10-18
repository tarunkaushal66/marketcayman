import Login from "./AuthPages/Login/Index";
import ResetPassword from "./AuthPages/forget/resetPassword";

const publicRoutes = [
  { path: "/", component: <Login /> },
  { path: "/login", component: <Login /> },
  { path: "/reset-password/:token", component: <ResetPassword /> },
];

export default publicRoutes;
