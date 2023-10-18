import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useState } from "react";
import SideBanner from "../components/SideBanner";
import { toast } from "react-toastify";
import { Formik } from "formik";
import FormikField from "../../../formikFields";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/auth/thunk";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  console.log("user", user);
  const initialValues = localStorage.getItem("market-cayman-user")
    ? JSON.parse(localStorage.getItem("market-cayman-user"))
    : {};
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (values) => {
    try {
      if (rememberMe) {
        localStorage.setItem("market-cayman-user", JSON.stringify(values));
      }
      const request = { ...values };

      const response = await dispatch(login(request)).unwrap();
      console.log("response", response);
      toast.success("Login success");
      navigate("/home");
    } catch (error) {
      toast.error(error.message);
      console.log("error", error);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {function FormikForm({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit: formikSubmit,
          isSubmitting,
          validateForm,
          setFieldValue,
          setFieldTouched,
          setValues,
          /* and other goodies */
        }) {
          const handleSubmit = async (e) => {
            e.preventDefault();
            const errors = await validateForm();
            formikSubmit(e);
          };

          return (
            <div className="main-part">
              <Container>
                <Row className="align-items-center">
                  <Col xs={12} lg={7}>
                    <SideBanner />
                  </Col>
                  <Col xs={11} lg={5} className="mx-auto">
                    <div className="login-form position-relative ">
                      <h3 className="fw-bold primaryTextColor">Login</h3>
                      <div className="sm-text primaryTextColor">
                        Glad you're back..!
                        <Form onSubmit={handleSubmit} className="mt-3">
                          <div className="my-1">
                            <FormikField
                              errorLabel="Email"
                              placeholder="Enter your Email"
                              name="email"
                              type="email"
                              required
                            />
                          </div>
                          <div className="my-1">
                            <FormikField
                              errorLabel="Password"
                              placeholder="Enter your Password"
                              name="password"
                              type="password"
                              required
                              checkRules
                            />
                          </div>
                          <div className="d-flex mt-2 align-items-center check-row">
                            <input
                              className=""
                              type="checkbox"
                              checked={rememberMe}
                              onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <p className="mb-0">Remember me</p>
                          </div>
                          <Button
                            type="submit"
                            className="w-100"
                            variant="warning"
                          >
                            Login
                          </Button>
                        </Form>
                        <p className="signup-cont position-absolute">
                          Don’t have an account ?
                          <b
                            className="pointer"
                            onClick={() => navigate("signup")}
                          >
                            Signup
                          </b>
                        </p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          );
        }}
      </Formik>
    </>
  );
};

export default Login;
