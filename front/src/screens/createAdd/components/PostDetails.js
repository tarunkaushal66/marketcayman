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
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productFormFields } = useSelector((state) => state.ads);
  const [formFields, setFormFields] = useState({});

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

  let newFormFields = {};
  const getProductFields = (data) => {
    Object.entries(data[1]).map((field) => {
      if (typeof field[1] === "object") {
        getProductFields(field);
      } else {
        newFormFields = {
          ...newFormFields,
          [data[0]]: newFormFields[data[0]]
            ? [...newFormFields[data[0]], { Label: field[0], type: field[1] }]
            : [{ Label: field[0], type: field[1] }],
        };
      }
    });
    setFormFields((prev) => {
      return { ...prev, ...newFormFields };
    });
  };

  useEffect(() => {
    if (productFormFields.data) {
      getProductFields(["Specification", productFormFields.data]);
    }
  }, [productFormFields]);

  console.log("productFormFields", productFormFields);
  console.log("categoryName", categoryName);
  console.log("formFields", formFields);

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
                  {formFields.Specification &&
                    Object.entries(formFields).map((formGroup) => (
                      <>
                        <h6>{formGroup[0]}</h6>
                        {formGroup[1].map(
                          (field) =>
                            ["Number", "String", "ObjectID"].includes(
                              field.type
                            ) && (
                              <input
                                type="text"
                                placeholder="Title"
                                className="inputField"
                              />
                            )
                        )}
                      </>
                    ))}

                  <div className="d-flex justify-content-start">
                    <input type="checkbox" placeholder="" className="mx-2" />
                    <span>Price is negotiable</span>
                  </div>
                  <SelectBox
                    options={[
                      { label: "YES", value: "yes" },
                      { label: "NO", value: "no" },
                    ]}
                    placeholder={"used"}
                  />

                  <input
                    type="date"
                    placeholder="Expiry Date"
                    className="inputField"
                  />
                  <h6>Add More Information</h6>
                  <textarea
                    placeholder="Write a Description"
                    className="inputField"
                  />

                  <h6>Add Details</h6>
                  <input
                    type="text"
                    placeholder="Landmark"
                    className="inputField"
                  />
                  <div className="d-block d-md-flex justify-content-between gap-3">
                    <SelectBox
                      options={[
                        { label: "1", value: "1" },
                        { label: "2", value: "2" },
                        { label: "3", value: "3" },
                        { label: "4", value: "4" },
                      ]}
                      placeholder={"No. of Bathrooms"}
                      style={{
                        container: (baseSyles) => ({
                          ...baseSyles,
                          width: "100%",
                        }),
                      }}
                    />
                    <SelectBox
                      options={[
                        { label: "1", value: "1" },
                        { label: "2", value: "2" },
                        { label: "3", value: "3" },
                        { label: "4", value: "4" },
                      ]}
                      placeholder={"No. of Bedrooms"}
                      style={{
                        container: (baseSyles) => ({
                          ...baseSyles,
                          width: "100%",
                        }),
                      }}
                    />
                  </div>
                  <div className="d-block d-md-flex justify-content-between gap-3">
                    <SelectBox
                      options={[
                        { label: "YES", value: "yes" },
                        { label: "NO", value: "no" },
                      ]}
                      placeholder={"Living Rooms"}
                      style={{
                        container: (baseSyles) => ({
                          ...baseSyles,
                          width: "100%",
                        }),
                      }}
                    />
                    <SelectBox
                      options={[
                        { label: "YES", value: "yes" },
                        { label: "NO", value: "no" },
                      ]}
                      placeholder={"Type"}
                      style={{
                        container: (baseSyles) => ({
                          ...baseSyles,
                          width: "100%",
                        }),
                      }}
                    />
                  </div>
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
