import { Route, Routes } from "react-router-dom";
import "./App.css";
import { routes } from "./routes/routes";
import { useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import runAxiosSetup from "./run-axios-setup";
import LoadIndicator from "./layout/load-indicator";

function App() {
  const { user } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.theme);

  // console.log("user", user);
  // console.log("theme", theme);

  useLayoutEffect(() => {
    runAxiosSetup({ token: user.value?.token, id: user.id });
  }, [user]);

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.style.setProperty(
        "--primary-background-color",
        "#fff"
      );
      document.documentElement.style.setProperty(
        "--secondary-background-color",
        "#dfdfdf"
      );
      document.documentElement.style.setProperty(
        "--primary-text-color",
        "#000"
      );
      document.documentElement.style.setProperty(
        "--primary-border-color",
        "#000"
      );
      document.documentElement.style.setProperty("--theme-color", "#fff");
    } else {
      document.documentElement.style.setProperty(
        "--primary-background-color",
        "#000"
      );
      document.documentElement.style.setProperty(
        "--secondary-background-color",
        "#171717"
      );
      document.documentElement.style.setProperty(
        "--primary-text-color",
        "#fff"
      );
      document.documentElement.style.setProperty(
        "--secondary-text-color",
        "#7e7e7e"
      );
      document.documentElement.style.setProperty(
        "--disabled-text-color",
        "#fff3"
      );
      document.documentElement.style.setProperty(
        "--primary-border-color",
        "#fff"
      );
      document.documentElement.style.setProperty("--theme-color", "#000");
    }
  }, [theme]);

  return (
    <>
      <LoadIndicator />
      <div id="recaptcha-container" style={{ display: "none" }} />
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </>
  );
}

export default App;
