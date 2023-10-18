import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="body-bg-main">
      <Header />
      <div className="primaryTextColor">{children}</div>
      <Footer />
    </div>
  );
}
