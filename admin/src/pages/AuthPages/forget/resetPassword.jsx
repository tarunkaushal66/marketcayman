import React, { useState, Fragment } from "react";
import AuthLayout from "../../../Layout/AuthLayout";
import { Button, Col, Form, Row } from "react-bootstrap";
import ForgotPop from "../forget";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/states/auth/thunks/login";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import notifyErrors from "../../../helper/notify-errors";
import { Formik } from "formik";
import FormikField from "../../../formikFields";
import resetPassword from "../../../redux/states/auth/thunks/reset-password";
import * as yup from "yup";

const ResetPassword = () => {
  const [showForget, setShowForget] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const initialValues = {
    new_password: "",
    confirm_password: "",
    reset_token: token,
  };

  const handleLogin = async (values) => {
    try {
      let response = await dispatch(
        resetPassword({
          data: values,
          showLoader: true,
        })
      ).unwrap();
      toast.success("Password Reset Successfully");
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleLogin}
      validationSchema={yup.object().shape({
        confirm_password: yup
          .string()
          .oneOf([yup.ref("new_password"), null], "Passwords must match")
          .required("Confirm Password is required."),
      })}
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
          notifyErrors(errors);
          formikSubmit(e);
        };

        console.log("Values", values);
        console.log("Errors", errors);

        return (
          <Fragment>
            <AuthLayout>
              <div className="top">
                <h2 className="m-0 fw-bold">Reset Password</h2>
              </div>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col lg="12" className="my-2">
                    <FormikField
                      label="Password"
                      name="new_password"
                      type="password"
                      checkRules
                      required
                    />
                    <FormikField
                      label="Confirm Password"
                      name="confirm_password"
                      type="password"
                      required
                      matchWith={"new_password"}
                    />
                  </Col>
                  <Col lg="12" className="my-2 btnWrp pt-3">
                    <Button
                      type="submit"
                      className="d-flex fw-bold btn text-white submitBtn common-btn align-items-center justify-content-center w-100"
                    >
                      Reset
                    </Button>
                    <div className="mt-3 text-center">
                      <Button
                        onClick={() => navigate("/login")}
                        variant="transparent"
                        className="fw-bold border-0 p-0 text-dark link"
                      >
                        Back To Login
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

export default ResetPassword;
