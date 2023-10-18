import moment from "moment";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserProfileView from "../../../../components/Modals/UserProfileVIew";
import { blockUnblockUser } from "../../../../redux/states/user/thunks/blockUnblockUser";
import { deleteUser } from "../../../../redux/states/user/thunks/deleteUser";
import MyPagination from "../../../../components/common/myPagination";

const MUTableData = ({ requestDetails, setRequestDetails }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [viewData, setViewData] = useState(null);
  const [blockedUsers, setBlockedUsers] = useState({});

  const { manage_user } = useSelector((s) => s.user) ?? {};

  const handleDelete = async (id, event) => {
    try {
      let request = { id, showLoader: true };
      await dispatch(deleteUser(request)).unwrap();
      toast.success("Deleted Successfully");
    } catch (error) {
      toast.error(error?.message);
    }
  };

  async function blockUnblock(id) {
    try {
      let request = { id, showLoader: true };
      const response = await dispatch(blockUnblockUser(request)).unwrap();

      if (response?.body?.is_blocked) {
        toast.success("Blocked Successfully");
      } else {
        toast.success("Unblocked Successfully");
      }
      setBlockedUsers((prev) => ({
        ...prev,
        [response?.body?.id]: !!response?.body?.is_blocked,
      }));
    } catch (error) {
      toast.error(error?.message);
    }
  }

  const data = manage_user?.data;

  return (
    <>
      <div className="table-responsive">
        <table className="table commonTable">
          <thead className="border-0">
            <tr>
              <th className=" border-0 p-3">S.No.</th>
              <th className=" border-0 p-3">Name</th>
              <th className=" border-0 p-3">Username</th>
              <th className=" border-0 p-3">Email</th>
              <th className=" border-0 p-3">Mobile</th>
              <th className=" border-0 p-3">Registered At</th>
              <th className=" border-0 p-3">Last Active</th>
              <th className=" border-0 p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.length > 0 &&
              data.map((data, idx) => {
                return (
                  <>
                    <tr>
                      <td className="p-3 border-0">{idx + 1}</td>
                      <td className="p-3 border-0">{data.name}</td>
                      <td className="p-3 border-0">{data.username}</td>
                      <td className="p-3 border-0">{data.email}</td>

                      <td className="p-3 border-0">{data.full_phone_number}</td>
                      <td className="p-3 border-0">
                        {moment(data.createdAt)?.format("DD MMM, Y")}
                      </td>
                      <td className="p-3 border-0">{data.Last_active}</td>
                      <td className="p-3 border-0">
                        <div className="d-flex align-items-center gap-10">
                          <Button
                            variant="transparent"
                            className="border-0 p-0"
                            onClick={() =>
                              navigate("/manage-users/edit/" + data._id)
                            }
                          >
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_209_2593)">
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
                                <clipPath id="clip0_209_2593">
                                  <rect width="15" height="15" fill="white" />
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
                              width="14"
                              height="15"
                              viewBox="0 0 14 15"
                              fill="none"
                            >
                              <g clipPath="url(#clip0_0_95)">
                                <path
                                  d="M6.63038 4.80319e-09C7.20202 -3.74237e-05 7.75201 0.218671 8.16752 0.61126C8.58299 1.00384 8.83255 1.54055 8.86493 2.11128L8.8684 2.23799H12.4835C12.6144 2.23802 12.7404 2.28773 12.836 2.37707C12.9316 2.46639 12.9897 2.58869 12.9987 2.71924C13.0076 2.84979 12.9666 2.97885 12.884 3.08035C12.8015 3.18186 12.6834 3.24824 12.5538 3.26608L12.4835 3.2709H11.9354L11.054 12.2366C11.0099 12.6836 10.8082 13.1003 10.4852 13.4123C10.1621 13.7244 9.73869 13.9116 9.29045 13.9402L9.16926 13.9443H4.09148C3.64213 13.9443 3.20744 13.7845 2.86507 13.4935C2.5227 13.2025 2.29497 12.7992 2.22259 12.3557L2.20676 12.2359L1.32464 3.2709H0.777199C0.652397 3.27089 0.531819 3.2257 0.437763 3.14367C0.343706 3.06164 0.282536 2.94832 0.265562 2.82468L0.260742 2.75444C0.260747 2.62963 0.305944 2.50906 0.387974 2.415C0.470005 2.32095 0.583319 2.25978 0.706961 2.2428L0.777199 2.23799H4.3924C4.3924 1.64443 4.62819 1.07519 5.04789 0.655489C5.46759 0.235787 6.03683 4.80319e-09 6.63038 4.80319e-09ZM10.8977 3.2709H2.36238L3.23485 12.1347C3.25417 12.3325 3.34132 12.5174 3.48152 12.6583C3.62173 12.7991 3.80633 12.8871 4.00402 12.9073L4.09148 12.9114H9.16926C9.58247 12.9114 9.93298 12.6188 10.0129 12.2215L10.0266 12.1347L10.8977 3.2709ZM7.83545 5.16457C7.96025 5.16458 8.08083 5.20977 8.17489 5.29181C8.26894 5.37384 8.33012 5.48715 8.34708 5.61079L8.35191 5.68103V10.5013C8.35187 10.6322 8.30216 10.7581 8.21283 10.8537C8.1235 10.9494 8.0012 11.0074 7.87066 11.0164C7.7401 11.0253 7.61104 10.9843 7.50953 10.9018C7.40802 10.8192 7.34165 10.7011 7.32381 10.5715L7.31899 10.5013V5.68103C7.31899 5.54406 7.37341 5.41269 7.47026 5.31584C7.56712 5.21899 7.69847 5.16457 7.83545 5.16457ZM5.42531 5.16457C5.55012 5.16458 5.67069 5.20977 5.76475 5.29181C5.85881 5.37384 5.91998 5.48715 5.93695 5.61079L5.94177 5.68103V10.5013C5.94173 10.6322 5.89203 10.7581 5.8027 10.8537C5.71336 10.9494 5.59107 11.0074 5.46051 11.0164C5.32997 11.0253 5.2009 10.9843 5.0994 10.9018C4.99789 10.8192 4.93151 10.7011 4.91368 10.5715L4.90886 10.5013V5.68103C4.90886 5.54406 4.96327 5.41269 5.06013 5.31584C5.15698 5.21899 5.28834 5.16457 5.42531 5.16457ZM6.63038 1.03291C6.32795 1.03292 6.03658 1.14665 5.81411 1.35152C5.59164 1.55639 5.45433 1.83742 5.42944 2.13882L5.42531 2.23799H7.83545C7.83545 1.91838 7.70849 1.61186 7.48249 1.38587C7.2565 1.15988 6.94999 1.03291 6.63038 1.03291Z"
                                  fill="black"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_0_95">
                                  <rect
                                    width="13.2174"
                                    height="14.0435"
                                    fill="white"
                                    transform="translate(0.260742)"
                                  />
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
                          {(
                            blockedUsers?.[data._id] === undefined
                              ? !!data?.is_blocked
                              : blockedUsers?.[data._id]
                          ) ? (
                            <Button
                              onClick={() => blockUnblock(data._id)}
                              className="d-flex align-items-center justify-content-center tableButton"
                            >
                              Unblock
                            </Button>
                          ) : (
                            <Button
                              onClick={() => blockUnblock(data._id)}
                              className="d-flex align-items-center justify-content-center tableButton"
                            >
                              Block
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </table>
      </div>

      <MyPagination
        requestDetails={requestDetails}
        setRequestDetails={setRequestDetails}
        totalPosts={manage_user?.total_count}
      />
      <UserProfileView
        data={viewData}
        toggle={() => setViewData((prev) => !prev)}
        isBlocked={
          blockedUsers?.[viewData?._id] === undefined
            ? !!viewData?.is_blocked
            : blockedUsers?.[viewData?._id]
        }
        onToggleBlock={() => blockUnblock(viewData?._id)}
      />
    </>
  );
};

export default MUTableData;
