import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import NonAuthLayout from "../../../../Layout/NonAuthLayout";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Switch from "react-switch";
import { imageUpload } from "../../../../redux/states/common/thunks/imageUpload";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../../../redux/states/user/thunks/addUser";
import { fetchUser } from "../../../../redux/states/user/thunks/fetchUser";
import { editUser } from "../../../../redux/states/user/thunks/editUser";

const AddManageUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchedUser } = useSelector((s) => s.user);
  const [state, setState] = useState({
    status: false,
  });

  const [imageUrl, setImageUrl] = useState("");

  const handleSwitchChange = (name, key) => {
    setState((pre) => ({ ...pre, [name]: !key }));
    setFormData((prev) => ({
      ...prev,
      status: !key,
    }));
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

  let [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    full_phone_number: "",
    image: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (id) {
        const response = await dispatch(
          editUser({ data: formData, showLoader: true })
        ).unwrap();
        toast.success("User Update Successfully");
      } else {
        const response = await dispatch(
          addUser({ data: formData, showLoader: true })
        ).unwrap();
        toast.success("User Created Successfully");
        navigate("/manage-users");
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchUser({ data: { id }, showLoader: true })).unwrap().catch((error) =>
        console.error(error.message)
      );
    }
  }, [id]);

  useEffect(() => {
    if (id && id === fetchedUser?._id) {
      setFormData({
        id,
        name: fetchedUser?.name,
        username: fetchedUser?.username,
        email: fetchedUser?.email,
        full_phone_number: fetchedUser?.full_phone_number,
        image: fetchedUser?.image,
        // password: fetchedUser?.password,
        status: !!fetchedUser?.status,
      });
      setImageUrl(fetchedUser?.image);
      setState({
        status: !!fetchedUser?.status,
      });
    }
  }, [fetchedUser]);

  return (
    <>
      <NonAuthLayout>
        <section className="manageUsers position-relative py-3">
          <Container fluid>
            <Row>
              <Col lg="12" className="my-2">
                <div className="Box py-3 pt-lg-4">
                  <div className="filterWrp mb-3 px-lg-5 px-3 d-flex aling-items-center flex-wrap justify-content-between gap-10">
                    <div className="left d-flex align-items-center gap-10 flex-wrap">
                      <Link
                        to="/manage-users"
                        className="d-flex btn align-items-center justify-content-center rounded-pill px-lg-4"
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
                            ></path>
                          </svg>
                        </span>
                        Back
                      </Link>
                      <h2 className="m-0 fw-bold">
                        {id ? "Edit" : "Add"} User
                      </h2>
                    </div>
                  </div>
                  <Form className=" px-lg-5 px-3 mt-5" onSubmit={handleSubmit}>
                    <Row>
                      <Col lg="6" className="my-2">
                        <label htmlFor="" className="form-label">
                          Name <span className="text-danger">*</span>
                        </label>
                        <input
                          name="name"
                          onChange={handleChange}
                          type="text"
                          className="form-control"
                          value={formData.name}
                        />
                      </Col>
                      <Col lg="6" className="my-2">
                        <label htmlFor="" className="form-label">
                          User Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="username"
                          onChange={handleChange}
                          className="form-control"
                          value={formData.username}
                        />
                      </Col>
                      <Col lg="6" className="my-2">
                        <label htmlFor="" className="form-label">
                          Email <span className="text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          onChange={handleChange}
                          className="form-control"
                          value={formData.email}
                        />
                      </Col>
                      <Col lg="6" className="my-2">
                        <label htmlFor="" className="form-label">
                          Mobile No. <span className="text-danger">*</span>
                        </label>
                        <input
                          type="tel"
                          name="full_phone_number"
                          onChange={handleChange}
                          className="form-control"
                          value={formData.full_phone_number}
                        />
                      </Col>
                      <Col lg="6" className="my-2">
                        <label htmlFor="" className="form-label">
                          Profile Image
                        </label>
                        <div className="UploadProfile position-relative upload">
                          <input
                            type="file"
                            className="position-absolute h-100 w-100"
                            onChange={handleFileChange}
                            value=""
                          />
                          <div className="imgWrp h-100 w-100">
                            <img
                              src={
                                imageUrl ? imageUrl : "/assets/images/dp.jpg"
                              }
                              alt=""
                              className="img-fluid rounded-circle w-100 h-100"
                            />
                          </div>
                          <span className="icn position-absolute d-flex align-items-center justify-content-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M14.738 7.97199L5.7 17.01L5.109 19.026L7.084 18.455L16.152 9.38699L14.738 7.97199ZM16.28 6.42999L17.694 7.84399L19.012 6.52599C19.1057 6.43223 19.1584 6.30508 19.1584 6.17249C19.1584 6.03991 19.1057 5.91276 19.012 5.81899L18.304 5.11199C18.2102 5.01826 18.0831 4.9656 17.9505 4.9656C17.8179 4.9656 17.6908 5.01826 17.597 5.11199L16.281 6.42999H16.28ZM19.719 3.69799L20.426 4.40499C20.8947 4.87381 21.158 5.50958 21.158 6.17249C21.158 6.8354 20.8947 7.47117 20.426 7.93999L8.134 20.233L3.914 21.453C3.74199 21.5026 3.55982 21.5051 3.38651 21.4603C3.2132 21.4154 3.0551 21.3249 2.92872 21.1981C2.80233 21.0713 2.71231 20.9129 2.66803 20.7395C2.62375 20.566 2.62685 20.3838 2.677 20.212L3.925 15.957L16.185 3.69699C16.6538 3.22832 17.2896 2.96503 17.9525 2.96503C18.6154 2.96503 19.2512 3.22832 19.72 3.69699L19.719 3.69799Z"
                                fill="white"
                              />
                            </svg>
                          </span>
                        </div>
                        <p className="text-muted m-0 pt-2">
                          Max. Upload File Size: 5 MB{" "}
                          {imageUrl && (
                            <a
                              href={imageUrl}
                              target="_blank"
                              className="theme-clr fw-bold"
                            >
                              Preview
                            </a>
                          )}
                        </p>
                      </Col>
                      <Col lg="6" className="my-2">
                        <label htmlFor="" className="form-label">
                          Password <span className="text-danger">*</span>
                        </label>
                        <input
                          type="password"
                          name="password"
                          onChange={handleChange}
                          className="form-control"
                          value={formData.password}
                        />
                      </Col>
                      <Col lg="6" className="my-2">
                        <label htmlFor="" className="form-label">
                          {" "}
                          Status
                        </label>
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
                      </Col>
                    </Row>
                    <Row className="mt-4">
                      <Col lg="6" className="my-2">
                        <Button
                          type="submit"
                          className="d-flex align-items-center fw-bold w-100 justify-content-center common-btn"
                        >
                          Save
                        </Button>
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

export default AddManageUser;
