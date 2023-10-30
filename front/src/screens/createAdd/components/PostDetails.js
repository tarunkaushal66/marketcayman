import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../../profile/Profile.module.css";
import styles2 from "./PostAdd.module.css";
import SelectBox from "../../../components/common/selectBox";
import { useDispatch, useSelector } from "react-redux";
import { createAdd, getProductFormFields } from "../../../redux/adds/thunk";
import { toast } from "react-toastify";
import { BsCardImage } from "react-icons/bs";
import { getImageLink } from "../../../redux/common/thunk";
import phone from "phone";
import PhoneInput from "react-phone-input-2";

export default function PostDetails() {
  const { categoryName, SubCategoryId } = useParams();
  const navigate = useNavigate();
  const imagesRef = useRef(null);

  const dispatch = useDispatch();
  const { productFormFields } = useSelector((state) => state.ads);
  const subCategory = productFormFields.data?.subcategory?.find(
    (subCat) => subCat._id === SubCategoryId
  );
  const [postImages, setPostImages] = useState([]);
  const [postDetails, setPostDetails] = useState({});

  const handleOnChange = (e) => {
    setPostDetails({
      ...postDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validMobile = phone(postDetails["phoneNumber"]).isValid;
    if (!validMobile) return toast.error("Enter Valid Mobile Number");

    try {
      const addDetails = {
        ...postDetails,
        category: productFormFields.data?.category?._id,
        subcategory: SubCategoryId,
        productType: productFormFields.data?.category?.categoryName,
        status: "available",
      };
      const response = await dispatch(createAdd(addDetails)).unwrap();
    } catch (error) {
      console.log("error", error);
    }
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
  console.log("postDetails", postDetails);
  // console.log("subCategoryName", subCategory);
  // console.log("subCategoryId", SubCategoryId);
  // console.log("categoryName", categoryName);
  // console.log("postImages", postImages);
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
                  All categories /{" "}
                  {productFormFields.data?.category?.categoryName} :{" "}
                  {subCategory?.subcategoryName}{" "}
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
                          <h5 className="mb-1">{field.label}</h5>

                          {field.nested.map((val) => (
                            <div key={val.value}>
                              <h6 className="mb-0">{val.label}</h6>
                              {["Number", "String", "ObjectID"].includes(
                                val.type
                              ) && (
                                <input
                                  type={
                                    field.type === "Number" ? "number" : "text"
                                  }
                                  name={val.value}
                                  onChange={handleOnChange}
                                  placeholder={val.placeHolder}
                                  className="inputField my-2"
                                />
                              )}
                            </div>
                          ))}
                        </>
                      ) : (
                        <div key={field.value}>
                          {["Number", "String", "ObjectID"].includes(
                            field.type
                          ) ? (
                            <>
                              <p className="mb-0">{field.label}</p>
                              {field.value === "phoneNumber" ? (
                                <PhoneInput
                                  placeholder=""
                                  onChange={(
                                    value,
                                    others,
                                    event,
                                    formattedData
                                  ) => {
                                    setPostDetails({
                                      ...postDetails,
                                      [field.value]: formattedData,
                                    });
                                  }}
                                  value={postDetails[field.value]}
                                  country={"in"}
                                  inputClass="w-100 mobileInputField my-2"
                                  dropdownClass="countryDropdown scrollBar"
                                  buttonClass="countryDropdownBtn"
                                />
                              ) : (
                                <input
                                  type={
                                    field.type === "Number" ? "number" : "text"
                                  }
                                  name={field.value}
                                  onChange={handleOnChange}
                                  placeholder={field.placeHolder}
                                  className="inputField my-2"
                                />
                              )}
                            </>
                          ) : field.value === "images" &&
                            field.type === "Array" ? (
                            <div
                              className="imageSelector my-2"
                              onClick={() => {
                                imagesRef.current.click();
                              }}
                            >
                              <div>
                                <BsCardImage
                                  style={{ width: 100, height: 50 }}
                                />
                              </div>
                              <p className="mb-0">Select Image</p>
                              <input
                                type="file"
                                multiple="multiple"
                                className="position-absolute d-none"
                                ref={imagesRef}
                                onChange={async (e) => {
                                  const allFiles = [...e.target.files];
                                  console.log(
                                    "allFiles",
                                    allFiles,
                                    e.target.files[0]
                                  );
                                  try {
                                    const formData = new FormData();
                                    for (let i in allFiles) {
                                      const file = allFiles[i];
                                      formData.append(`images`, file);
                                    }

                                    const response = await dispatch(
                                      getImageLink(formData)
                                    ).unwrap();
                                    setPostImages(response);
                                    console.log("response", response);
                                  } catch (error) {
                                    console.log("error", error);
                                  }
                                }}
                              />
                            </div>
                          ) : (
                            field.type === "Boolean" && (
                              <div className="checkboxContainer">
                                <p className="mb-0 me-2">{field.label}</p>
                                <input
                                  type="checkbox"
                                  name={field.value}
                                  onChange={(e) => {
                                    setPostDetails({
                                      ...postDetails,
                                      [field.value]: e.target.checked,
                                    });
                                  }}
                                />
                              </div>
                            )
                          )}
                        </div>
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
