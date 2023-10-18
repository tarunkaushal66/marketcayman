import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import SideBanner from "../../../components/SideBanner";
import FormikField from "../../../../../formikFields";

const MobilePage = ({ handleSubmit }) => {
  const navigate = useNavigate();

  return (
    <div className="main-part">
      <Container className="sm-contain">
        <Row className="align-items-center">
          <Col xs={12} lg={7}>
            <SideBanner />
          </Col>
          <Col xs={11} lg={5} className="mx-auto">
            <div className="login-form position-relative">
              <h3 className=" fw-bold primaryTextColor">Sign Up</h3>
              <div className="sm-text primaryTextColor">
                Enter your phone number to continue
                <>
                  <Form onSubmit={handleSubmit}>
                    <div className="my-3">
                      <FormikField
                        label="Mobile Number"
                        placeholder="Phone number"
                        name="phoneNumber"
                        type="mobile"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-100" variant="warning">
                      Send OTP
                    </Button>
                  </Form>
                  <p className="signup-cont position-absolute mt-2">
                    Already have an account?
                    <b className="pointer" onClick={() => navigate("/")}>
                      {` Login`}
                    </b>
                  </p>
                </>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MobilePage;
