import React from "react";
import { ReactComponent as Banner } from "../../../assets/icons/banner.svg";
import logo from "../../../images/mklogo.png";

export default function SideBanner() {
  return (
    <>
      <div className="lg-left-text">
        <h1 className="fw-bold text-center primaryTextColor">Welcome to</h1>
        <img
          className="mx-auto d-block w-75"
          style={{ maxWidth: 280 }}
          src={logo}
          alt=""
        />
        <Banner className={`mx-auto d-none d-lg-block mt-5 w-100 w-lg-auto`} />
      </div>
    </>
  );
}
