import React from "react";
import Header from "../components/Header/Header";
import Sidebar from "../components/Header/Sidebar";
import { useState } from "react";

const NonAuthLayout = ({ children }) => {
  const [sidebar, setSidebar] = useState();
  return (
    <>
      <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
      <main className="bg-white Main ms-auto me-3 mt-3 px-3">
        <Header sidebar={sidebar} setSidebar={setSidebar} />
        {children}
      </main>
    </>
  );
};

export default NonAuthLayout;
