import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const CounterCards = () => {
  const { dashboard } = useSelector((s) => s.dashboard) ?? {};

  return (
    <>
      <Row className="counterCards">
        <Col lg="3" sm="6" className="my-2">
          <div className="CstmCard px-3 py-2 d-flex align-items-center gap-10 justify-content-between h-100">
            <div className="imgWrp">
              <img src="/assets/images/c1.png" alt="" className="img-fluid" />
            </div>
            <div className="content">
              <h6 className="m-0">Welcome Back!</h6>
              <p className="m-0">Market Cayman</p>
            </div>
          </div>
        </Col>
        <Col lg="3" sm="6" className="my-2">
          <div className="CstmCard px-3 py-2 d-flex align-items-center gap-10 justify-content-between h-100">
            <div className="content">
              <p className="m-0 theme-blue">Total Users</p>
              <h6 className="m-0 theme-blue fw-bold">{dashboard.user}</h6>
            </div>
            <div className="imgWrp">
              <img src="/assets/images/c2.png" alt="" className="img-fluid" />
            </div>
          </div>
        </Col>
        <Col lg="3" sm="6" className="my-2">
          <div className="CstmCard px-3 py-2 d-flex align-items-center gap-10 justify-content-between h-100">
            <div className="content">
              <p className="m-0 theme-blue">Featured Adds Purchased</p>
              <h6 className="m-0 theme-blue fw-bold">{dashboard.donation}</h6>
            </div>
            <div className="imgWrp">
              <img src="/assets/images/c3.png" alt="" className="img-fluid" />
            </div>
          </div>
        </Col>
        <Col lg="3" sm="6" className="my-2">
          <div className="CstmCard px-3 py-2 d-flex align-items-center gap-10 justify-content-between h-100">
            <div className="content">
              <p className="m-0 theme-blue">Revenue</p>
              <h6 className="m-0 theme-blue fw-bold">${dashboard.revenue}</h6>
            </div>
            <div className="imgWrp">
              <img src="/assets/images/c4.png" alt="" className="img-fluid" />
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default CounterCards;
