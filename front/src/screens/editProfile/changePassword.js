import React from "react";
import styles from "../../screens/profile/Profile.module.css";
import userImage from "../../images/userProfile.png";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateUserPassword } from "../../redux/profile/thunk";
import FormikField from "../../formikFields";
import { Formik } from "formik";

const initialValues = {};

export default function ChangePassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    try {
      const request = {
        ...values,
      };
      delete request.confirmPassword;

      const response = await dispatch(updateUserPassword(request)).unwrap();
      toast.success("Password updated successfully");
      navigate("/profile");
      console.log("response", response);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {function FormikForm({ handleSubmit: formikSubmit, validateForm }) {
        const handleSubmit = async (e) => {
          e.preventDefault();
          const errors = await validateForm();
          formikSubmit(e);
        };

        return (
          <Form onSubmit={handleSubmit} className="mt-5">
            <div className="mb-3">
              <FormikField
                label="Old Password"
                type="password"
                placeholder="Old Password"
                name="oldPassword"
                required
                checkRules
              />
            </div>
            <div className="mb-3">
              <FormikField
                label="New Password"
                type="password"
                placeholder="New Password"
                name="newPassword"
                required
                checkRules
                matchWith="confirmPassword"
              />
            </div>
            <div className="mb-3">
              <FormikField
                label="Confirm Password"
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                required
                checkRules
                matchWith="newPassword"
              />
            </div>
            <div className="centerAlignBtn">
              <button
                className="primaryBtn d-flex justify-content-center"
                type="submit"
              >
                Update Password
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
