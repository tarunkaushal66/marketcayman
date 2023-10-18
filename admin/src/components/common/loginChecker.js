import { useEffect, useCallback } from "react";
import { logout } from "../../redux/states/auth/actions";
import { getProfile } from "../../redux/states/auth/thunks/profile/getProfile";
import { useDispatch, useSelector } from "react-redux";

export default function LoginChecker() {
  const dispatch = useDispatch();
  const { admin, isAuthenticated } = useSelector((s) => s.auth);
  const onFetchProfile = useCallback(async () => {
    try {
      console.log("Login Checker -> Fetch profile");
      await dispatch(getProfile()).unwrap();
    } catch (error) {
      const message = error?.message?.toLowerCase();
      if (message?.includes("token") || message?.includes("auth")) {
        dispatch(logout());
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      onFetchProfile();
    }
  }, []);

  return null;
}
