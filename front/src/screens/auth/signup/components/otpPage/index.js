import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useState } from "react";
import OTPInput from "otp-input-react";
import SideBanner from "../../../components/SideBanner";
import FormikField from "../../../../../formikFields";

const OtpPage = ({ handleSubmit }) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("123456");

  return (
    <div>
      <div className="main-part">
        <Container className="sm-contain">
          <Row className="align-items-center">
            <Col xs={12} lg={7}>
              <SideBanner />
            </Col>
            <Col xs={11} lg={5} className="mx-auto">
              <div className="login-form position-relative">
                <h3 className="fw-bold primaryTextColor">Sign Up</h3>
                <div className="sm-text primaryTextColor">
                  Enter your phone number to continue
                  <Form onSubmit={handleSubmit} className="mt-3">
                    <div className="mb-3">
                      <FormikField
                        label="Mobile Number"
                        placeholder="Phone number"
                        name="phoneNumber"
                        type="mobile"
                        required
                        disabled
                      />
                    </div>
                    <FormikField type="otp" name="otp" required />

                    <p className="sm-text mt-3">
                      Enter six digit number sent to your registered mobile
                      number.
                    </p>

                    <Button type="submit" className="w-100" variant="warning">
                      Continue
                    </Button>
                  </Form>
                  <p className="signup-cont position-absolute mt-2">
                    Already have an account ?
                    <b className="pointer" onClick={() => navigate("/")}>
                      Login
                    </b>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default OtpPage;
