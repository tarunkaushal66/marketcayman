import React, { useEffect } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import userImage from "../../images/userProfile.png";
import styles from "../../screens/profile/Profile.module.css";
import FormikField from "../../formikFields";
import { getUserProfile, updateUserProfile } from "../../redux/profile/thunk";

export default function EditProfile() {
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.profile);

  const initialValues = userProfile
    ? {
        ...userProfile.data,
      }
    : {};

  const handleSubmit = async (values) => {
    console.log("values", values);
    try {
      const request = {
        ...values,
      };
      delete request._id;

      const response = await dispatch(updateUserProfile(request)).unwrap();
      console.log("first", response);
    } catch (error) {
      console.log("error", error);
      toast.error(error.message);
    }
  };

  const getProfileDetails = async () => {
    try {
      const response = await dispatch(getUserProfile()).unwrap();
    } catch (error) {
      console.log("error", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProfileDetails();
  }, []);

  return (
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
          <div className="d-flex justify-content-center">
            <Container fluid>
              <Row className="d-flex justify-center m-0 m-md-5 ">
                <Col xs={12} lg={6}>
                  <div className={styles.container}>
                    <div className={styles.main}>
                      <div className="text-center">
                        <img
                          className={styles.profileImage}
                          src={userImage}
                          alt=""
                        />
                        <h5>Manish Mittal</h5>
                        <p>devmanishmittal@gmail.com</p>
                        <br />
                      </div>
                      <Form onSubmit={handleSubmit} className="mt-5">
                        <h6>Personal Information</h6>
                        <div className="my-3">
                          <FormikField
                            label="Name"
                            placeholder="Name"
                            name="name"
                            type="text"
                            required
                          />
                        </div>
                        <div className="my-3">
                          <FormikField
                            label="Last Name"
                            placeholder="Last Name"
                            name="lastName"
                            type="text"
                          />
                        </div>
                        <div className="my-3">
                          <FormikField
                            label="Email"
                            placeholder="Email"
                            name="email"
                            type="email"
                            required
                          />
                        </div>
                        <div className="my-3">
                          <FormikField
                            label="Mobile Number"
                            placeholder="Mobile Number"
                            name="phoneNumber"
                            type="mobile"
                            required
                          />
                        </div>

                        <div className="text-center">
                          <button className="primaryBtn px-5" type="submit">
                            Update
                          </button>
                        </div>

                        {/* <h6>Add Address</h6>
                        <input
                          type="text"
                          placeholder="Aman Bhatia"
                          className="inputField"
                        /> */}
                      </Form>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        );
      }}
    </Formik>
  );
}
