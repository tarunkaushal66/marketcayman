import React, { useState, useEffect } from "react";
import NonAuthLayout from "../../../Layout/NonAuthLayout";
import { Button, Col, Container, Row } from "react-bootstrap";
import TableData from "./Component/TableData";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { listContest } from "../../../redux/states/contest/thunks/listContest";

const ManageContest = () => {
  const dispatch = useDispatch();

  const [request, setRequest] = useState({
    search_string: "",
    limit: 10,
    page: 1,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRequest((prevState) => ({
      ...prevState,
      [name]: value, // Update the corresponding property with the new value
    }));
  };

  const updateRequest = (updatedRequest) => {
    setRequest(updatedRequest);
  };

  useEffect(() => {
    dispatch(listContest(request))
      .unwrap()
      .catch((error) => console.error(error.message));
  }, [request]);

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
                      <h2 className="m-0 fw-bold">Manage Contest</h2>

                      <div className="searchForm position-relative icon-with-text">
                        <input
                          name="search_string"
                          value={request.search_string}
                          onChange={handleInputChange}
                          type="text"
                          placeholder="Search by Name"
                          className="form-control rounded-pill"
                        />
                        <span className="icn position-absolute">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                          >
                            <path
                              d="M7.1875 13.125C10.4667 13.125 13.125 10.4667 13.125 7.1875C13.125 3.90831 10.4667 1.25 7.1875 1.25C3.90831 1.25 1.25 3.90831 1.25 7.1875C1.25 10.4667 3.90831 13.125 7.1875 13.125Z"
                              stroke="#9DA3BB"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M13.75 13.75L12.5 12.5"
                              stroke="#9DA3BB"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div className="right">
                      <Link
                        to="/manage-contest/add"
                        className="d-flex btn text-dark align-items-center justify-content-center rounded-pill"
                      >
                        + Add Contest
                      </Link>
                    </div>
                  </div>
                  <TableData request={request} updateRequest={updateRequest} />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </NonAuthLayout>
    </>
  );
};

export default ManageContest;
