import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const AuthLayout = ({ children }) => {
  return (
    <>
      <section
        className="AuthPage position-relative d-lg-block d-flex align-items-center justify-content-center"
        style={{ background: "#FFFBF2" }}
      >
        <Col
          lg="6"
          className="img-wrpper text-center h-100 px-lg-0 position-absolute d-none d-lg-block"
          style={{
            backgroundImage: `url("/assets/images/loginbg.png")`,
            backgroundSize: "contain",
          }}
        >
          <img
            src="/assets/images/loginf.png"
            alt=""
            className="img-fluid h-100"
          />
        </Col>
        <Container fluid>
          <Row className="justify-content-end">
            <Col lg="6" className="my-2">
              <div className="formInner">
                <div className="logo text-center">
                  <img
                    src="/assets/images/bigLogo.png"
                    alt=""
                    className="img-fluid"
                  />
                </div>
                {children}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AuthLayout;
