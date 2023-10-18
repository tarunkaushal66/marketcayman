import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import SideBanner from "../../../components/SideBanner";
import FormikField from "../../../../../formikFields";

const DetailsPage = ({ handleSubmit }) => {
  const navigate = useNavigate();

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
                    <div className="mb-2">
                      <FormikField
                        placeholder="Name"
                        name="name"
                        type="text"
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <FormikField
                        placeholder="Email"
                        name="email"
                        type="email"
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <FormikField
                        placeholder="Password"
                        name="password"
                        type="password"
                        required
                        checkRules
                      />
                    </div>
                    <div className="mb-2">
                      <FormikField
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        matchWith="password"
                        required
                      />
                    </div>

                    <Button type="submit" className="w-100" variant="warning">
                      Sign Up
                    </Button>
                  </Form>
                  <p className="signup-cont position-absolute mt-2">
                    Already have an account ?{" "}
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

export default DetailsPage;
