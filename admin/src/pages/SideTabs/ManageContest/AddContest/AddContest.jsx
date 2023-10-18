import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Switch from "react-switch";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import NonAuthLayout from "../../../../Layout/NonAuthLayout";
import { addContest } from "../../../../redux/states/contest/thunks/addContest";
import axios from "axios";
import { imageUpload } from "../../../../redux/states/common/thunks/imageUpload";
import { toast } from "react-toastify";
import fetchContest from "../../../../redux/states/contest/thunks/fetchContest";
import { editContest } from "../../../../redux/states/contest/thunks/editContest";
import { cloneDeep } from "lodash";

const AddContest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState({
    status: 0,
    contestCreation: 0,
  });
  const [imageUrl, setImageUrl] = useState("");
  const { id } = useParams();
  const { fetchedContest } = useSelector((s) => s.contest);
  console.log("lalala ", fetchContest);
  const handleSwitchChange = (name, key) => {
    setState((pre) => ({ ...pre, [name]: !key }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("////name", name, "//////value", value);

    if (name === "participation_fee") {
      setFormData((prev) => ({
        ...prev,
        [name]: Math.abs(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const [imageURLs, setImageURLs] = useState([]); // State to store image URLs

  // Function to handle image upload
  const handleImageUpload = async () => {
    try {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";
      fileInput.click();

      fileInput.addEventListener("change", async (e) => {
        const file = e.target.files[0];
        console.log("e=======>", e.target.files);
        // if (file) {
        //   const formData = new FormData();
        //   formData.append("image", file);

        //   const response = await axios.post("/upload-image-endpoint", formData);
        //   setImageURLs([...imageURLs, response.data.imageUrl]);
        // }

        if (file) {
          try {
            let request = { file, showLoader: true };
            let response = await dispatch(imageUpload(request)).unwrap();
            const { image_url } = response?.body[0];

            setImageURLs([...imageURLs, image_url]);

            // setImageUrl(image_url);
            // setFormData((prev) => ({
            //   ...prev,
            //   image: image_url,
            // }));
          } catch (error) {
            console.error("Error uploading image:", error);
          }
        }
      });
    } catch (error) {
      console.error("Image Upload Error:", error);
      // Handle errors (e.g., show error message to the user)
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    console.log("///////", file);
    if (file) {
      try {
        let request = { file, showLoader: true };
        let response = await dispatch(imageUpload(request)).unwrap();
        const { image_url } = response?.body[0];
        setImageUrl(image_url);
        setFormData((prev) => ({
          ...prev,
          image: image_url,
        }));
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const [sections, setSections] = useState([{ name: "", percentage: "" }]);

  const handleSectionChange = (index, e) => {
    e.preventDefault();
    const { name, value } = e.target;

    const updatedSections = cloneDeep(sections);
    if (name.includes("name")) {
      updatedSections[index].name = value;
    }
    if (name.includes("percentage")) {
      updatedSections[index].percentage = value;
    }
    setSections(updatedSections);
  };

  const addSection = () => {
    setSections([...sections, { name: "", percentage: "" }]);
  };

  const [formData, setFormData] = useState({
    contest_name: "",
    description: "",
    pie_chart_percentage: [],
    media: [],
    question_title: "",
    participation_fee: "",
    number_of_winners: "",
    website_and_address: "",
    auto_creation: 0,
    status: 0,
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      pie_chart_percentage: sections,
    }));
  }, [sections]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      status: state.status,
      auto_creation: state.contestCreation,
    }));
  }, [state]);

  useEffect(() => {
    if (id) {
      dispatch(fetchContest({ data: { id }, showLoader: true }));
    }
  }, [id]);

  console.log("fff  fff", fetchedContest);
  useEffect(() => {
    if (id && id === fetchedContest?._id) {
      setFormData({
        id,
        contest_name: fetchedContest?.contest_name,
        description: fetchedContest?.description,
        pie_chart_percentage: fetchedContest?.pie_chart_percentage,
        media: fetchedContest?.media,
        question_title: fetchedContest?.question_title,
        participation_fee: fetchedContest?.participation_fee,
        number_of_winners: fetchedContest?.number_of_winners,
        website_and_address: fetchedContest?.website_and_address,
        auto_creation: fetchedContest?.auto_creation,
        status: fetchedContest?.status,
      });

      setState({
        status: fetchedContest?.status,
        contestCreation: fetchedContest?.auto_creation,
      });

      setImageURLs(fetchedContest?.media?.map((itm) => itm.media) || []);

      setSections(fetchedContest?.pie_chart_percentage);
    }
  }, [fetchedContest]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = {
        ...formData,
        status: state.status,
        auto_creation: state.contestCreation,
        media:
          imageURLs?.map((itm) => ({
            image_url: itm,
            name: "dog",
          })) || [],
        pie_chart_percentage: sections,
      };

      if (id) {
        await dispatch(editContest(data)).unwrap();
        toast.success("Contest Updated Successfully");
      } else {
        await dispatch(addContest(data)).unwrap();
        toast.success("Contest Created Successfully");
        navigate("/manage-contest");
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <>
      <NonAuthLayout>
        <section className="addContest position-relative py-3">
          <Container>
            <Row>
              <Col lg="12" className="my-2">
                <div className="Box py-3 pt-lg-4">
                  <div className="filterWrp mb-3 px-lg-5 px-3 d-flex aling-items-center flex-wrap justify-content-between gap-10">
                    <div className="left d-flex align-items-center gap-10 flex-wrap">
                      <Link
                        to="/manage-contest"
                        className="d-flex btn align-items-center justify-content-center rounded-pill px-lg-4"
                        style={{ minWidth: "unset" }}
                      >
                        <span className="icn me-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="16"
                            viewBox="0 0 20 16"
                            fill="none"
                          >
                            <path
                              d="M7.70406 15.546L0.954061 8.79596C0.849182 8.69144 0.765966 8.56725 0.709186 8.4305C0.652404 8.29376 0.623174 8.14715 0.623174 7.99908C0.623174 7.85102 0.652404 7.70441 0.709186 7.56766C0.765966 7.43092 0.849182 7.30672 0.954061 7.20221L7.70406 0.452207C7.91541 0.240863 8.20205 0.122131 8.50094 0.122131C8.79982 0.122131 9.08647 0.240863 9.29781 0.452207C9.50916 0.663552 9.62789 0.950196 9.62789 1.24908C9.62789 1.54797 9.50916 1.83461 9.29781 2.04596L4.46875 6.87502L18.25 6.87502C18.5484 6.87502 18.8345 6.99355 19.0455 7.20452C19.2565 7.4155 19.375 7.70165 19.375 8.00002C19.375 8.29839 19.2565 8.58454 19.0455 8.79552C18.8345 9.00649 18.5484 9.12502 18.25 9.12502L4.46875 9.12502L9.29875 13.9541C9.51009 14.1654 9.62883 14.4521 9.62883 14.751C9.62883 15.0498 9.51009 15.3365 9.29875 15.5478C9.08741 15.7592 8.80076 15.8779 8.50187 15.8779C8.20299 15.8779 7.91634 15.7592 7.705 15.5478L7.70406 15.546Z"
                              fill="#A9AEC3"
                            />
                          </svg>
                        </span>
                        Back
                      </Link>
                      <h2 className="m-0 fw-bold">
                        {!id ? "Add" : "Edit"} Contest
                      </h2>
                    </div>
                    <div className="right d-flex align-items-center gap-10">
                      <h6 className="fw-bold m-0">Status</h6>
                      <div className="cstmSwitch d-flex  align-items-center">
                        <Switch
                          offColor={"transparent"}
                          onColor={"transparent"}
                          offHandleColor="#3D3A34"
                          onHandleColor="#FFA800"
                          onChange={() =>
                            handleSwitchChange("status", state.status)
                          }
                          checked={state.status}
                        />
                      </div>
                      <span className="text-muted">
                        {state.status ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                  <Form className="px-lg-5 px-3" onSubmit={handleSubmit}>
                    <Row className="mt-4">
                      <Col lg="12" className="my-2">
                        <label htmlFor="" className="form-label m-0 ps-2">
                          Contest Name
                        </label>
                        <input
                          name="contest_name"
                          onChange={handleChange}
                          type="text"
                          className="form-control bg-transparent rounded"
                          value={formData?.contest_name}
                        />
                      </Col>
                      <Col lg="12" className="my-2">
                        <label htmlFor="" className="form-label m-0 ps-2">
                          Description
                        </label>
                        <textarea
                          name="description"
                          onChange={handleChange}
                          id=""
                          rows="4"
                          className="form-control bg-transparent"
                          value={formData?.description}
                        ></textarea>
                      </Col>
                      <Col lg="12" className="my-2">
                        <ul className="list-unstyled portfolio-Wrp ps-0 mb-0 d-flex align-items-center gap-10 my-3">
                          {imageURLs.length > 0 ? (
                            <>
                              {imageURLs.map((imageUrl, index) => (
                                <li key={index}>
                                  <img
                                    style={{
                                      height: "70px",
                                      aspectRatio: "1/1",
                                    }}
                                    src={imageUrl}
                                    alt=""
                                    className="img-fluid border"
                                  />
                                </li>
                              ))}
                              {/* <li>
                                <Button
                                  className="border-0 p-0"
                                  variant="transparent"
                                  onClick={handleImageUpload}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="66"
                                    height="66"
                                    viewBox="0 0 66 66"
                                    fill="none"
                                  >
                                    <path
                                      d="M24.75 35.75L33 24.75L41.25 37.125V33H52.25V13.75C52.25 10.7167 49.7832 8.25 46.75 8.25H11C7.96675 8.25 5.5 10.7167 5.5 13.75V46.75C5.5 49.7832 7.96675 52.25 11 52.25H33V41.25H13.75L22 30.25L24.75 35.75Z"
                                      fill="#241F20"
                                    />
                                    <path
                                      d="M52.25 38.5H46.75V46.75H38.5V52.25H46.75V60.5H52.25V52.25H60.5V46.75H52.25V38.5Z"
                                      fill="#241F20"
                                    />
                                  </svg>
                                </Button>
                              </li> */}
                            </>
                          ) : (
                            <li>
                              <Button
                                className="border-0 p-0"
                                variant="transparent"
                                onClick={handleImageUpload}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="66"
                                  height="66"
                                  viewBox="0 0 66 66"
                                  fill="none"
                                >
                                  <path
                                    d="M24.75 35.75L33 24.75L41.25 37.125V33H52.25V13.75C52.25 10.7167 49.7832 8.25 46.75 8.25H11C7.96675 8.25 5.5 10.7167 5.5 13.75V46.75C5.5 49.7832 7.96675 52.25 11 52.25H33V41.25H13.75L22 30.25L24.75 35.75Z"
                                    fill="#241F20"
                                  />
                                  <path
                                    d="M52.25 38.5H46.75V46.75H38.5V52.25H46.75V60.5H52.25V52.25H60.5V46.75H52.25V38.5Z"
                                    fill="#241F20"
                                  />
                                </svg>
                              </Button>
                            </li>
                          )}
                        </ul>
                      </Col>
                    </Row>
                    <Row>
                      {sections.map((section, index) => (
                        <Col lg="6" className="my-2">
                          <Row className="align-items-center">
                            <Col md="6" className="my-2">
                              <label
                                htmlFor={`name-${index}`}
                                className="form-label m-0"
                              >
                                Name
                              </label>
                              <input
                                name={`name-${index}`}
                                onChange={(e) => handleSectionChange(index, e)}
                                value={section.name}
                                type="text"
                                className="form-control bg-transparent"
                              />
                            </Col>
                            <Col md="6" className="my-2">
                              <label
                                htmlFor={`percentage-${index}`}
                                className="form-label m-0"
                              >
                                Set Percentage
                              </label>
                              <Form.Range
                                name={`percentage-${index}`}
                                value={section.percentage}
                                onChange={(e) => handleSectionChange(index, e)}
                              />
                            </Col>
                          </Row>
                        </Col>
                      ))}
                      <Col lg="3" sm="6" className="my-2 pt-3">
                        <Button
                          className="d-flex w-100 align-items-center fw-bold justify-content-center common-btn"
                          onClick={addSection}
                        >
                          Add Section
                        </Button>
                      </Col>
                    </Row>
                    <Row className="my-2 orderReverse">
                      <Col lg="6" className="my-2">
                        <div className="py-2 my-2">
                          <label htmlFor="" className="form-label m-0 ps-2">
                            Question Title
                          </label>
                          <textarea
                            name="question_title"
                            onChange={handleChange}
                            rows={4}
                            className="form-control bg-transparent rounded"
                            value={formData.question_title}
                          ></textarea>
                        </div>
                        <div className="py-2 my-2">
                          <div className="d-flex align-items-center flex-wrap gap-10">
                            <h6 className="m-0 fw-bold">
                              Contest Auto Creation
                            </h6>
                            <div className="d-flex align-items-center gap-10 ms-5">
                              <span className="text-muted">
                                {state.contestCreation ? "On" : "Off"}
                              </span>
                              <div className="cstmSwitch d-flex align-items-center">
                                <Switch
                                  offColor={"transparent"}
                                  onColor={"transparent"}
                                  offHandleColor="#3D3A34"
                                  onHandleColor="#FFA800"
                                  onChange={() =>
                                    handleSwitchChange(
                                      "contestCreation",
                                      state.contestCreation
                                    )
                                  }
                                  checked={state.contestCreation}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="py-2 mt-3">
                          <Button
                            type="submit"
                            className="d-flex align-items-center fw-bold w-100 justify-content-center common-btn"
                          >
                            Save
                          </Button>
                        </div>
                      </Col>

                      <Col lg="6" className="my-2">
                        <div className="py-2 my-2">
                          <label htmlFor="" className="form-label ps-2 m-0">
                            Add Participation fees
                          </label>
                          <input
                            name="participation_fee"
                            onChange={handleChange}
                            type="number"
                            className="form-control bg-transparent rounded"
                            value={formData.participation_fee}
                          />
                        </div>
                        <div className="py-2 my-2">
                          <label htmlFor="" className="form-label ps-2 m-0">
                            Add Number of Winners to be declared
                          </label>
                          <input
                            name="number_of_winners"
                            onChange={handleChange}
                            type="number"
                            className="form-control bg-transparent rounded"
                            value={formData.number_of_winners}
                          />
                        </div>
                        <div className="py-2 my-2">
                          <label htmlFor="" className="form-label ps-2 m-0">
                            Website and Address
                          </label>
                          <input
                            name="website_and_address"
                            onChange={handleChange}
                            type="text"
                            className="form-control bg-transparent rounded"
                            value={formData.website_and_address}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </NonAuthLayout>
    </>
  );
};

export default AddContest;
