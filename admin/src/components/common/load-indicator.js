import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FidgetSpinner } from "react-loader-spinner";

export default function LoadIndicator({ isOpaque }) {
  const [states, setStates] = useState({});
  const reduxStates = useSelector((state) => state);

  useEffect(() => {
    global.showLoader = (name) => {
      setStates((prev) => ({ ...prev, [name]: true }));
    };
    global.hideLoader = (name) => {
      setStates((prev) => ({ ...prev, [name]: false }));
    };
  }, []);

  const open =
    !!Object.keys(states).find((key) => states[key]) ||
    !!Object.keys(reduxStates).find((store) => reduxStates[store].showLoader);
  if (!open) return null;

  return (
    <div className="x-load-indicator-component">
      <FidgetSpinner
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper x-load-indicator-image"
        ballColors={["#fff", "#fff", "#fff"]}
        backgroundColor="var(--main-theme-color)"
      />

      <div className="x-overlay" />
      <style>
        {`
          .x-load-indicator-component {
            position: fixed;
            left: 0;
            top: 0;
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
          }
          .x-load-indicator-component .x-overlay {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: #fff;
            opacity: ${isOpaque ? 1 : 0.3};
          }

          .x-load-indicator-component .x-load-indicator-image {
            height: auto;
            width: 6.60416666vw;
            object-fit: contain;
            z-index: 1;
            padding: 0.20833333vw;
          }

          @media (max-width: 1200px) {
            .x-load-indicator-component .x-load-indicator-image {
                height: auto;
                width: 6.51041666vw;
                object-fit: contain;
                z-index: 1;
                background-color: #ffffff;
                padding: 0.52083333vw;
                border-radius:0.52083333vw;
                box-shadow: 0 0.13020833vw 0.390625vw rgba(0, 0, 0, 0.05),
                  0 0.26041666vw 0.13020833vw rgba(0, 0, 0, 0.03), 0 0.13020833vw 0.13020833vw rgba(0, 0, 0, 0.04);
          }

          @media (max-width: 767.88px) {
            .x-load-indicator-component .x-load-indicator-image {
            height: auto;
            width: 13.33333333vw;
            object-fit: contain;
            z-index: 1;
            background-color: #ffffff;
            padding: 1.06666666vw;
            border-radius:1.06666666vw;
            box-shadow: 0 0.26666666vw 0.8vw rgba(0, 0, 0, 0.05),
              0 0.53333333vw 0.26666666vw rgba(0, 0, 0, 0.03), 0 0.26666666vw 0.26666666vw rgba(0, 0, 0, 0.04);
          }
        }
        `}
      </style>
    </div>
  );
}

LoadIndicator.defaultProps = {
  isOpaque: false,
};
