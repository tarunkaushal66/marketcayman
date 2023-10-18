import moment from "moment/moment";
import React, { useState, useEffect } from "react";
import { Button, Form, Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteContest } from "../../../../redux/states/contest/thunks/deleteContest";
import ContestView from "../../../../components/Modals/ContestView";
import updateContestStatus from "../../../../redux/states/contest/thunks/updateContestStatus";

const TableData = ({ request, updateRequest }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [viewData, setViewData] = useState(null);
  const [inactiveContests, setInactiveContests] = useState({});

  const { contests } = useSelector((s) => s.contest) ?? {};
  const [deletedContest, setDeletedContest] = useState({});
  const handleLimitChange = (e) => {
    let limit = e.target.value;
    let updatedRequest = { ...request, limit };

    updateRequest(updatedRequest);
  };

  const handleNextPageClick = () => {
    let updatedRequest = { ...request, page: request.page + 1 };
    updateRequest(updatedRequest);
  };

  const handlePrevPageClick = () => {
    if (request.page > 1) {
      let updatedRequest = { ...request, page: request.page - 1 };
      updateRequest(updatedRequest);
    }
  };

  const handleDelete = async (id, event) => {
    try {
      let request = { id, showLoader: true };
      await dispatch(deleteContest(request)).unwrap();
      toast.success("Deleted Successfully");
      setDeletedContest((prev) => ({ ...prev, [id]: true }));
    } catch (error) {
      toast.error(error?.message);
    }
  };

  function toggleStatus(id, isInActive) {
    dispatch(
      updateContestStatus({
        data: { id },
        showLoader: true,
      })
    )
      .unwrap()
      .then((response) => {
        setInactiveContests((prev) => ({ ...prev, [id]: !isInActive }));
        if (!isInActive) {
          toast.success("Contest Deactivated");
        } else {
          toast.success("Contest Activated");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  const data = contests?.data;

  console.log("Love", inactiveContests);
  console.log("Love view", viewData);
  return (
    <>
      <div className="table-responsive">
        <table className="table commonTable">
          <thead className="border-0">
            <tr>
              <th className=" border-0 p-3 para">Image</th>
              <th className=" border-0 p-3 para">Question</th>
              {/* <th className=" border-0 p-3 para">Description</th> */}
              <th className=" border-0 p-3">Contest ID</th>
              <th className=" border-0 p-3">Contest Name</th>
              {/* <th className=" border-0 p-3">Values</th> */}
              <th className=" border-0 p-3 para">Shelter Link</th>
              <th className=" border-0 p-3">Fees</th>
              <th className=" border-0 p-3">Winner Count</th>
              <th className=" border-0 p-3">Created at</th>
              <th className=" border-0 p-3">Status</th>
              <th className=" border-0 p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.length > 0 &&
              data.map((data, idx) => {
                if (deletedContest?.[data._id]) {
                  return null;
                }
                console.log("Bugga", data);
                return (
                  <>
                    <tr>
                      <td className="p-3 border-0">
                        <div className="profile d-flex align-items-center gap-10">
                          <div className="imgWrp">
                            <img
                              src={data?.media?.[0]?.media}
                              alt=""
                              width="50"
                              height="50"
                              className="img-fluid border-0"
                            />
                          </div>
                          <div className="content">{data?.media[0]?.name}</div>
                        </div>
                      </td>
                      <td className="p-3 border-0 ws-normal para">
                        {data?.question_title}
                      </td>
                      {/* <td className="p-3 border-0 ws-normal para">
                        {data?.description}
                      </td> */}
                      <td className="p-3 border-0">{data.unique_contest_id}</td>

                      <td className="p-3 border-0">{data.contest_name}</td>
                      {/* <td className="p-3 border-0">
                        <img
                          src="/assets/images/graph.png"
                          alt=""
                          className="img-fluid"
                        />
                      </td> */}
                      <td className="p-3 border-0  ws-normal">
                        <Link
                          to={data.website_and_address}
                          className="text-dark underline"
                        >
                          {data.website_and_address}
                        </Link>
                      </td>
                      <td className="p-3 border-0">
                        ${data.participation_fee}
                      </td>
                      <td className="p-3 border-0">{data.number_of_winners}</td>
                      <td className="p-3 border-0">
                        {moment(data.createdAt).format("DD MMM, Y")}
                      </td>
                      <td className="p-3 border-0">
                        {" "}
                        <span
                          className={
                            !(inactiveContests?.[data?._id] === undefined
                              ? !data?.status
                              : inactiveContests?.[data?._id])
                              ? "statusLabel rounded-pill px-3 py-1 successLabel"
                              : "statusLabel rounded-pill px-3 py-1 dangerLabel"
                          }
                        >
                          {!(inactiveContests?.[data?._id] === undefined
                            ? !data?.status
                            : inactiveContests?.[data?._id])
                            ? "Active"
                            : "Inactive"}
                        </span>
                      </td>
                      <td className="p-3 border-0">
                        <div className="d-flex align-items-center gap-10">
                          <Button
                            variant="transparent"
                            className="border-0 p-0"
                            onClick={() =>
                              navigate("/manage-contest/edit/" + data._id)
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="15"
                              height="15"
                              viewBox="0 0 15 15"
                              fill="none"
                            >
                              <g clipPath="url(#clip0_209_2623)">
                                <path
                                  d="M6.71051 0.954834H5.39472C2.10525 0.954834 0.789459 2.27063 0.789459 5.5601V9.50746C0.789459 12.797 2.10525 14.1127 5.39472 14.1127H9.34206C12.6316 14.1127 13.9474 12.797 13.9474 9.50746V8.19165"
                                  stroke="black"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M10.0264 1.62577L4.84213 6.80997C4.64476 7.00734 4.4474 7.3955 4.40792 7.67839L4.12502 9.65869C4.01976 10.3758 4.52635 10.8757 5.24345 10.7771L7.22371 10.4942C7.50002 10.4547 7.88818 10.2573 8.09216 10.06L13.2763 4.87576C14.1711 3.98103 14.5921 2.94155 13.2763 1.62577C11.9606 0.309974 10.9211 0.731026 10.0264 1.62577Z"
                                  stroke="black"
                                  strokeMiterlimit="10"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M9.28287 2.36914C9.72363 3.9415 10.9539 5.17177 12.5329 5.61914"
                                  stroke="black"
                                  strokeMiterlimit="10"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_209_2623">
                                  <rect width="15" height="15" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </Button>
                          <Button
                            variant="transparent"
                            className="border-0 p-0"
                            onClick={() => setViewData(data)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="19"
                              viewBox="0 0 20 19"
                              fill="none"
                            >
                              <g clipPath="url(#clip0_0_97)">
                                <mask
                                  id="mask0_0_97"
                                  // style="mask-type:luminance"
                                  maskUnits="userSpaceOnUse"
                                  x="0"
                                  y="0"
                                  width="19"
                                  height="19"
                                >
                                  <path
                                    d="M18.8324 0H0.658447V18.1739H18.8324V0Z"
                                    fill="white"
                                  />
                                </mask>
                                <g mask="url(#mask0_0_97)">
                                  <path
                                    d="M18.2303 8.89374C17.5623 7.16592 16.4027 5.67167 14.8947 4.5957C13.3867 3.51973 11.5965 2.90921 9.74532 2.8396C7.89417 2.90921 6.10397 3.51973 4.59599 4.5957C3.08802 5.67167 1.92838 7.16592 1.2604 8.89374C1.21528 9.01857 1.21528 9.1552 1.2604 9.28002C1.92838 11.0079 3.08802 12.5021 4.59599 13.5781C6.10397 14.654 7.89417 15.2645 9.74532 15.3342C11.5965 15.2645 13.3867 14.654 14.8947 13.5781C16.4027 12.5021 17.5623 11.0079 18.2303 9.28002C18.2754 9.1552 18.2754 9.01857 18.2303 8.89374ZM9.74532 14.1983C6.73529 14.1983 3.55485 11.9663 2.40195 9.08688C3.55485 6.20745 6.73529 3.97547 9.74532 3.97547C12.7554 3.97547 15.9358 6.20745 17.0887 9.08688C15.9358 11.9663 12.7554 14.1983 9.74532 14.1983Z"
                                    fill="black"
                                  />
                                  <path
                                    d="M9.74552 5.6792C9.07151 5.6792 8.41271 5.87905 7.85234 6.25349C7.29195 6.62792 6.85519 7.16012 6.59728 7.78277C6.33937 8.40545 6.27189 9.09061 6.40337 9.75156C6.53485 10.4126 6.8594 11.0198 7.33596 11.4963C7.81252 11.9729 8.4197 12.2975 9.08068 12.4289C9.74172 12.5604 10.4269 12.4929 11.0496 12.235C11.6722 11.9771 12.2044 11.5404 12.5788 10.98C12.9533 10.4196 13.1531 9.76073 13.1531 9.08681C13.1531 8.18305 12.7941 7.31631 12.155 6.67726C11.516 6.03822 10.6493 5.6792 9.74552 5.6792ZM9.74552 11.3585C9.29621 11.3585 8.85698 11.2253 8.48339 10.9757C8.10981 10.7261 7.81863 10.3713 7.64668 9.95618C7.47474 9.54107 7.42975 9.08425 7.51741 8.64361C7.60507 8.20294 7.82143 7.79815 8.13914 7.48045C8.45684 7.16274 8.8616 6.94638 9.30232 6.85872C9.74295 6.77106 10.1998 6.81605 10.6149 6.98799C11.03 7.15993 11.3848 7.45111 11.6344 7.8247C11.884 8.19829 12.0173 8.6375 12.0173 9.08681C12.0173 9.68927 11.7779 10.2671 11.3518 10.6931C10.9258 11.1192 10.348 11.3585 9.74552 11.3585Z"
                                    fill="black"
                                  />
                                </g>
                              </g>
                              <defs>
                                <clipPath id="clip0_0_97">
                                  <rect
                                    width="19"
                                    height="18.1739"
                                    fill="white"
                                    transform="translate(0.564941)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                          </Button>
                          <Button
                            variant="transparent"
                            className="border-0 p-0"
                            onClick={(e) => handleDelete(data._id, e)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="17"
                              viewBox="0 0 16 17"
                              fill="none"
                            >
                              <g clipPath="url(#clip0_209_2652)">
                                <path
                                  d="M7.71062 5.81438e-09C8.4026 -4.53024e-05 9.06838 0.264707 9.57136 0.739946C10.0743 1.21518 10.3764 1.86488 10.4156 2.55576L10.4198 2.70914H14.796C14.9544 2.70918 15.1069 2.76936 15.2227 2.8775C15.3384 2.98563 15.4088 3.13368 15.4196 3.29171C15.4304 3.44974 15.3808 3.60598 15.2808 3.72885C15.1809 3.85173 15.038 3.93208 14.8811 3.95367L14.796 3.95951H14.1325L13.0655 14.8127C13.0121 15.3538 12.768 15.8583 12.377 16.236C11.9859 16.6138 11.4733 16.8403 10.9307 16.875L10.784 16.88H4.63721C4.09326 16.88 3.56705 16.6865 3.15261 16.3342C2.73816 15.982 2.46249 15.4938 2.37487 14.9569L2.3557 14.8119L1.28788 3.95951H0.625185C0.474109 3.9595 0.328146 3.90479 0.214288 3.80549C0.10043 3.70619 0.0263814 3.56902 0.00583504 3.41935L0 3.33432C6.37097e-06 3.18324 0.0547184 3.03728 0.154018 2.92342C0.253318 2.80957 0.390488 2.73552 0.54016 2.71497L0.625185 2.70914H5.00148C5.00148 1.99063 5.28691 1.30155 5.79497 0.793487C6.30303 0.285426 6.99211 5.81438e-09 7.71062 5.81438e-09ZM12.8763 3.95951H2.54409L3.60023 14.6894C3.62362 14.9288 3.72912 15.1527 3.89884 15.3232C4.06856 15.4937 4.29203 15.6002 4.53134 15.6246L4.63721 15.6296H10.784C11.2842 15.6296 11.7085 15.2754 11.8052 14.7944L11.8218 14.6894L12.8763 3.95951ZM9.16938 6.25185C9.32046 6.25186 9.46642 6.30657 9.58028 6.40587C9.69414 6.50517 9.76819 6.64234 9.78873 6.79201L9.79457 6.87704V12.7121C9.79452 12.8705 9.73435 13.023 9.62621 13.1387C9.51807 13.2545 9.37003 13.3248 9.212 13.3356C9.05396 13.3464 8.89773 13.2968 8.77485 13.1969C8.65197 13.0969 8.57162 12.954 8.55003 12.7971L8.5442 12.7121V6.87704C8.5442 6.71123 8.61007 6.55221 8.72731 6.43496C8.84456 6.31772 9.00357 6.25185 9.16938 6.25185ZM6.25185 6.25185C6.40293 6.25186 6.54889 6.30657 6.66275 6.40587C6.77661 6.50517 6.85066 6.64234 6.8712 6.79201L6.87704 6.87704V12.7121C6.87699 12.8705 6.81682 13.023 6.70868 13.1387C6.60054 13.2545 6.4525 13.3248 6.29446 13.3356C6.13643 13.3464 5.98019 13.2968 5.85732 13.1969C5.73444 13.0969 5.65409 12.954 5.6325 12.7971L5.62667 12.7121V6.87704C5.62667 6.71123 5.69253 6.55221 5.80978 6.43496C5.92702 6.31772 6.08604 6.25185 6.25185 6.25185ZM7.71062 1.25037C7.34452 1.25038 6.99181 1.38805 6.7225 1.63605C6.45319 1.88405 6.28698 2.22424 6.25685 2.5891L6.25185 2.70914H9.16938C9.16938 2.32225 9.01569 1.9512 8.74212 1.67763C8.46855 1.40406 8.09751 1.25037 7.71062 1.25037Z"
                                  fill="black"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_209_2652">
                                  <rect width="16" height="17" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="d-flex align-items-center justify-content-between paginationWrpper flex-wrap mt-3">
        <div className="left d-flex align-items-center gap-10">
          <label htmlFor="" className="form-label m-0">
            Show Result
          </label>
          <Form.Select aria-label="Default select example">
            <option>10</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </div>
        <Pagination>
          <Pagination.Prev />
          <Pagination.Item active>{1}</Pagination.Item>
          <Pagination.Next />
        </Pagination>
      </div>
      <ContestView
        data={viewData}
        toggle={() => setViewData((prev) => !prev)}
        isInActive={
          inactiveContests?.[viewData?._id] === undefined
            ? !viewData?.status
            : inactiveContests?.[viewData?._id]
        }
        onToggleStatus={() =>
          toggleStatus(
            viewData?._id,
            inactiveContests?.[viewData?._id] === undefined
              ? !viewData?.status
              : inactiveContests?.[viewData?._id]
          )
        }
      />
    </>
  );
};

export default TableData;
