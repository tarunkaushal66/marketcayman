import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Pode from "../../images/pode.png";
import Sale from "../../images/sale.png";
import SelectBox from "../../components/common/selectBox";
import { ReactComponent as ThreeDots } from "../../assets/icons/threeDots.svg";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <Col xs={11} lg={10} xl={9} className="mx-auto">
        <div className="pt-5 ds-upr">
          <Row className="align-items-center mb-2">
            <Col lg={4}>
              {/* <InputGroup className="border border-white align-items-center">
                  <InputGroup.Text id="basic-addon1" className="border-0">
                    <SearchIcon />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Search add title"
                    aria-label=""
                    className="bg-none text-white border-0 outline-0 shadow-none pe-0"
                    type="search"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup> */}
            </Col>
            <Col lg={4}></Col>
            <Col lg={4}>
              <div className="d-flex align-items-center justify-content-end">
                <Form.Label className="text-nowrap mb-0 primaryTextColor me-2">
                  Filter By:
                </Form.Label>
                <SelectBox
                  options={[
                    { label: "All", value: "all" },
                    { label: "This Week", value: "thisWeek" },
                    { label: "This Month", value: "thisMonth" },
                    { label: "This Year", value: "thisYear" },
                  ]}
                  placeholder={"Select filter"}
                  style={{
                    container: (baseStyles) => ({
                      ...baseStyles,
                      width: "50%",
                    }),
                  }}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col></Col>
          </Row>
        </div>

        {Array.from({ length: 8 }).map((_) => (
          <>
            <Row className="userProductWrapper align-items-center d-none d-md-flex my-3">
              <Col sm={4} md={3} lg={3} className="d-none d-sm-inline">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <p className="mb-0">From: Aug 20, 2023</p>
                    <p className="mb-0">To: Sep 20, 2023</p>
                  </div>
                  <p className="primaryVerticalLine d-none d-lg-inline" />
                </div>
              </Col>
              <Col xs={11} sm={7} md={5} lg={4}>
                <div className="d-flex align-items-center">
                  <img src={Pode} alt="" />
                  <p className="mb-0 pl-3">Apple airpods 2nd generation</p>
                </div>
              </Col>
              <Col md={1} className="d-none d-md-inline">
                <p className="mb-0">$2000</p>
              </Col>
              <Col md={2} lg={1} className="text-center d-none d-md-inline">
                <p className="mb-0 postStatus">Active</p>
              </Col>
              <Col md={1} lg={2} className="text-right d-none d-lg-inline">
                <button className="primaryBtn">Promote</button>
              </Col>
              <Col xs={1} className="text-right">
                <ThreeDots />
              </Col>
            </Row>

            <div className="userProductWrapper d-block d-md-none pb-4 position-relative my-3">
              <div className="d-flex align-items-center justify-content-between px-2">
                <p className={`mb-0 postStatus`}>Active</p>
                <div className="">
                  <ThreeDots style={{ width: 22, height: 22 }} />
                </div>
              </div>
              <img src={Pode} className="d-flex mx-auto p-2 w-100" alt="" />
              <div className="text-center">
                <div className="d-flex align-items-center justify-content-between">
                  <p className="mb-1">Apple airpods 2nd generation</p>
                  <p className="mb-1">$2000</p>
                </div>
                <div className="d-flex  align-items-center justify-content-between">
                  <p className="mb-0 postDate">From: Aug 20, 2023</p>
                  <p className="mb-0 ms-2 postDate">To: Sep 20, 2023</p>
                </div>
              </div>
            </div>
          </>
        ))}
      </Col>
      <div class="sale-img">
        <img className="w-100" src={Sale} />
      </div>
    </>
  );
}
