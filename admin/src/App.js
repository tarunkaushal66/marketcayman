import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import publicRoutes from "./pages/publicRoutes";
import privateRoutes from "./pages/privateRoutes";
import { useSelector } from "react-redux";
import { Fragment, useLayoutEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./assets/css/style.css";
import "./assets/css/responsive.css";
import runAxiosSetup from "./helper/axiosSetup";
import config from "./config";
import LoginChecker from "./components/common/loginChecker";
import LoadIndicator from "./components/common/load-indicator";

function App() {
  const { admin, isAuthenticated } = useSelector((s) => s.auth) ?? {};

  useLayoutEffect(() => {
    runAxiosSetup({
      apiUrl: config.baseApiUrl,
      bearerToken: admin?.access_token,
      headers: {
        token: admin?.access_token,
      },
    });
  }, [admin]);

  return (
    <Fragment>
      <LoginChecker />
      <LoadIndicator />
      <Routes>
        {isAuthenticated ? (
          <Fragment>
            {privateRoutes.map((data, index) => (
              <Route
                onUpdate={() => window.scrollTo(0, 0)}
                exact={true}
                path={data.path}
                element={data.component}
                key={index}
              />
            ))}
            <Route path="*" element={<Navigate replace to="/dashboard" />} />
          </Fragment>
        ) : (
          <Fragment>
            {publicRoutes.map((data, index) => (
              <Route
                onUpdate={() => window.scrollTo(0, 0)}
                exact={true}
                path={data.path}
                element={data.component}
                key={index}
              />
            ))}
            <Route path="*" element={<Navigate replace to="/" />} />
          </Fragment>
        )}
      </Routes>
    </Fragment>
  );
}

export default App;
