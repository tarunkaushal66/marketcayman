import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../../profile/Profile.module.css";
import styles2 from "./PostAdd.module.css";
import SelectBox from "../../../components/common/selectBox";
import { useDispatch, useSelector } from "react-redux";
import { getProductFormFields } from "../../../redux/adds/thunk";
import { toast } from "react-toastify";

export default function PostDetails() {
  const { categoryName, SubCategoryId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productFormFields } = useSelector((state) => state.ads);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const fetchProductDetails = async () => {
    try {
      const response = await dispatch(
        getProductFormFields(categoryName)
      ).unwrap();
      console.log("response", response);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  console.log("productFormFields", productFormFields);
  // console.log("categoryName", categoryName);
  // console.log("formFields", formFields);

  return (
    <div className="d-flex justify-content-center">
      <Container fluid>
        <Row className="d-flex justify-center m-0 m-md-5 ">
          <Col xs={12} lg={6}>
            <div className={styles.container}>
              <div className={styles.main}>
                <h4 className="text-center mb-5">Create your AD Post</h4>
                <h6>Add more details about your product</h6>
                <p>
                  All categories / For Sale : Houses / Apartments{" "}
                  <span
                    className={`${styles2.changeCategory} pointer`}
                    onClick={() => navigate("/createPost/selectCategory")}
                  >
                    Change
                  </span>
                </p>

                <Form onSubmit={handleSubmit} className="mt-5">
                  {productFormFields.data?.data?.length > 0 &&
                    productFormFields.data?.data?.map((field) =>
                      Object.keys(field).includes("nested") ? (
                        <>
                          <h5>{field.label}</h5>
                          {["Number", "String", "ObjectID"].includes(
                            field.type
                          ) && (
                            <input
                              type="text"
                              placeholder="Title"
                              className="inputField"
                            />
                          )}
                        </>
                      ) : (
                        <>
                          <p className="mb-1">{field.label}</p>
                          {["Number", "String", "ObjectID"].includes(
                            field.type
                          ) && (
                            <input
                              type={field.type === "Number" ? "number" : "text"}
                              placeholder={field.placeHolder}
                              className="inputField"
                            />
                          )}
                        </>
                      )
                    )}

                  <div className="centerAlignBtn">
                    <button type="submit" className="primaryBtn px-5">
                      Post job
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
