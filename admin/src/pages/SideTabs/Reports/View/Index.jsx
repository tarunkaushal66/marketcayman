import React, { useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NonAuthLayout from "../../../../Layout/NonAuthLayout";
import { getReportedUsersDetails } from "../../../../redux/states/reported_users/thunks/listReportedUsers";
import { blockUnblockUser } from "../../../../redux/states/user/thunks/blockUnblockUser";
import { toast } from "react-toastify";

const ViewReport = () => {
  const { reported_user_details } = useSelector((state) => state.reported_user);
  const dispatch = useDispatch();
  const state = useParams();

  const getUserDetails = async () => {
    try {
      const response = await dispatch(
        getReportedUsersDetails(state.id)
      ).unwrap();
      console.log("reported_user_details response", response);
    } catch (error) {
      console.log("reported_user_details error", error);
    }
  };

  const handleUserStatus = async () => {
    try {
      const user = {
        id: state.id,
      };
      const response = await dispatch(blockUnblockUser(user)).unwrap();
      if (response.success) {
        toast.success("User blocked successfully");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log("reported_user error", error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  console.log("reported_user_details", reported_user_details);

  return (
    <>
      <NonAuthLayout>
        <section className="reports py-3 position-relative">
          <Container>
            <Row>
              <Col lg="12" className="my-2">
                <div className="Box py-3 pt-lg-4">
                  <div className="filterWrp mb-3 px-lg-5 px-3 d-flex aling-items-center flex-wrap justify-content-between gap-10">
                    <div className="left d-flex align-items-center gap-10 flex-wrap">
                      <Link
                        class="d-flex btn align-items-center justify-content-center rounded-pill px-lg-4"
                        to="/reports"
                        style={{ minWidth: "unset;" }}
                      >
                        <span class="icn me-2">
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
                      <h2 className="m-0 fw-bold">Report</h2>
                    </div>
                  </div>
                  <div className="px-lg-5 px-3 mt-3">
                    <div className="py-2 ">
                      <div className="box2 p-3">
                        <div className="table-responsive">
                          <table className="table commonTable">
                            <thead className="border-0">
                              <tr>
                                <th className="border-0 p-2 text-dark">ID</th>
                                <th className="border-0 p-2 text-dark">User</th>
                                <th className="border-0 p-2 text-dark">
                                  Status
                                </th>
                                <th className="border-0 p-2 text-dark">
                                  User Mobile Number
                                </th>
                                <th className="border-0 p-2 text-dark">
                                  Status
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {reported_user_details.body && (
                                <tr>
                                  <td className="border-0 p-2">
                                    {reported_user_details.body._id}
                                  </td>
                                  <td className="border-0 p-2">
                                    {
                                      reported_user_details.body.reported_to
                                        .name
                                    }
                                  </td>
                                  <td className="border-0 p-2">
                                    <span
                                      className={
                                        reported_user_details.body.reported_to
                                          .status == "0"
                                          ? "statusLabel rounded-pill px-3 py-1 successLabel"
                                          : reported_user_details.body.status ==
                                            "1"
                                          ? "statusLabel rounded-pill px-3 py-1 label2"
                                          : "statusLabel rounded-pill px-3 py-1"
                                      }
                                    >
                                      {reported_user_details.body.status === 1
                                        ? "Active"
                                        : "Blocked"}
                                    </span>
                                  </td>
                                  <td className="border-0 p-2">
                                    {
                                      reported_user_details.body.reported_to
                                        .full_phone_number
                                    }
                                  </td>

                                  <td className="border-0 p-2">
                                    <Button
                                      onClick={handleUserStatus}
                                      className="d-flex align-items-center justify-content-center tableButton"
                                    >
                                      {reported_user_details.body.status === 1
                                        ? "Block"
                                        : "Unblock"}
                                    </Button>
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div className="py-2 ">
                      <div className="box2 p-3 d-flex align-items-center justify-content-between gap-10">
                        <div className="cstmContentWrpper">
                          <h6 className="m-0 py-1">User Email</h6>
                          <p className="m-0 py-1">
                            {reported_user_details.body?.reported_to.email}
                          </p>
                        </div>
                        <div className="cstmContentWrpper">
                          <p className="m-0 py-1">Created at</p>
                          <p className="m-0 py-1">
                            {reported_user_details.body?.date}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="py-2 ">
                      <div className="box2 p-3">
                        <div className="cstmContentWrpper">
                          <h6 className="m-0 py-1">Description</h6>
                          <p className="m-0 py-1">
                            {reported_user_details.body?.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="py-2 ">
                      <div className="box2 p-3">
                        <div className="cstmContentWrpper">
                          <h6 className="m-0 py-1">Reason</h6>
                          <p className="m-0 py-1">
                            {reported_user_details.body?.reason}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </NonAuthLayout>
    </>
  );
};

export default ViewReport;
