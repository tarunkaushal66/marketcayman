import React, { Fragment } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import FormikField from "../../../formikFields";
import notifyErrors from "../../../helper/notify-errors";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import forgotPassword from "../../../redux/states/auth/thunks/forgot-password";
import { toast } from "react-toastify";

const ForgotPop = ({ showForgetState }) => {
  const dispatch = useDispatch();
  const [showForget, setShowForget] = showForgetState;
  const toggleForget = () => setShowForget(!showForget);
  const initialValues = { email: "" };
  function handleLogin(values, formik) {
    console.log("Munna", formik);
    dispatch(
      forgotPassword({
        data: values,
        showLoader: true,
      })
    )
      .unwrap()
      .then((payload) => {
        console.log("payloa", payload);
        formik.setFieldValue("sentEmail", true);
      })
      .catch((error) => {
        toast.error(error.message);
        formik.setFieldError("email", error.message);
      });
  }

  return (
    <>
      <Modal
        show={showForget}
        onHide={toggleForget}
        backdrop="static"
        keyboard={false}
        centered
        className="AuthPops"
      >
        <Modal.Body className="px-lg-5">
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
              setFieldError,
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

              return !values.sentEmail ? (
                <Fragment>
                  <div className="inner px-lg-5 py-4">
                    <div className="py-2 top">
                      <h4 className="fw-bold m-0">Forgot Password</h4>
                      <p className="py-2">
                        If you have an market-cayman account, you will receive a
                        password reset link to this e-mail.
                      </p>
                    </div>
                    <div className="py-2">
                      <Form>
                        <div className="py-2">
                          <FormikField
                            label="Enter Email"
                            errorLabel="Email"
                            name="email"
                            type="email"
                            required
                          />
                        </div>
                        <div className="py-2">
                          <div className="btnWrp d-flex align-items-center justify-content-end gap-10 mt-3">
                            <Button
                              onClick={handleSubmit}
                              className="common-btn d-flex align-items-center justify-content-center"
                            >
                              Send
                            </Button>
                            <Button
                              onClick={toggleForget}
                              className="common-btn common-btn2 d-flex align-items-center justify-content-center"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </Form>
                    </div>
                  </div>{" "}
                </Fragment>
              ) : (
                <div className="inner px-lg-5 py-4">
                  <div className="py-2 top">
                    <h4 className="fw-bold m-0">Email Sent</h4>
                    <p className="py-2">
                      Please check your email for the password reset link.
                    </p>
                  </div>
                  <div className="py-2">
                    <div className="btnWrp d-flex align-items-center justify-content-end gap-10 mt-3">
                      <Button
                        onClick={toggleForget}
                        className="common-btn common-btn2 d-flex align-items-center justify-content-center"
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              );
            }}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ForgotPop;
