import React, { useState, Fragment } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ForgotPop from "../forget";
import AuthLayout from "../../../Layout/AuthLayout";
import { login } from "../../../redux/states/auth/thunks/login";
import notifyErrors from "../../../helper/notify-errors";
import { Formik } from "formik";
import FormikField from "../../../formikFields";

const Login = () => {
  const [showForget, setShowForget] = useState();
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleForget = () => setShowForget(!showForget);

  const handleLogin = async (values) => {
    try {
      let response = await dispatch(
        login({
          data: values,
        })
      ).unwrap();
      toast.success("Login success");
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleLogin}>
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
          notifyErrors(errors);
          formikSubmit(e);
        };

        return (
          <Fragment>
            <AuthLayout>
              <div className="top">
                <h2 className="m-0 fw-bold">Log in</h2>
              </div>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col lg="12" className="my-2">
                    <FormikField
                      label="Email"
                      name="email"
                      type="email"
                      required
                    />
                  </Col>
                  <Col lg="12" className="my-2">
                    <FormikField
                      label="Password"
                      name="password"
                      type="password"
                      required
                    />
                  </Col>
                  <Col lg="12" className="my-2 btnWrp pt-3">
                    <Button
                      type="submit"
                      className="d-flex fw-bold btn text-white submitBtn common-btn align-items-center justify-content-center w-100"
                    >
                      Login
                    </Button>
                    <div className="mt-3 text-center">
                      <Button
                        onClick={handleForget}
                        variant="transparent"
                        className="fw-bold border-0 p-0 text-dark link"
                      >
                        Forgot Password
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </AuthLayout>
            <ForgotPop showForgetState={[showForget, setShowForget]} />
          </Fragment>
        );
      }}
    </Formik>
  );
};

export default Login;
