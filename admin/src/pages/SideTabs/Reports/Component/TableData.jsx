import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as OpenEyeIcon } from "../../../../assets/icons/openEye.svg";
import { listReportedUsers } from "../../../../redux/states/reported_users/thunks/listReportedUsers";
import MyPagination from "../../../../components/common/myPagination";

const TableData = () => {
  const { reported_user } = useSelector((state) => state.reported_user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [requestDetails, setRequestDetails] = useState({
    limit: "10",
    page: 1,
  });

  const getTransactionsList = async () => {
    try {
      const response = await dispatch(listReportedUsers()).unwrap();
      console.log("reported_user response", response);
    } catch (error) {
      console.log("reported_user error", error);
    }
  };

  useEffect(() => {
    getTransactionsList();
  }, [requestDetails]);

  console.log("reported_user", reported_user);

  return (
    <>
      <div className="table-responsive">
        <table className="table commonTable">
          <thead className="border-0">
            <tr>
              <th colSpan={3}>Reported By</th>
              <th colSpan={3}>Reported to</th>
              <th>Time</th>
              <th></th>
            </tr>

            <tr>
              <th className=" border-0 p-3">User Name</th>
              <th className=" border-0 p-3">Email</th>
              <th className=" border-0 p-3 para">Phone Number</th>
              <th className=" border-0 p-3">User Name</th>
              <th className=" border-0 p-3">Email</th>
              <th className=" border-0 p-3 para">Phone Number</th>
              <th className=" border-0 p-3">Created At</th>{" "}
              <th className=" border-0 p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {reported_user.data &&
              reported_user.data.length > 0 &&
              reported_user.data.map((data, idx) => {
                return (
                  <>
                    <tr>
                      <td className="p-3 border-0">{data.reported_by.name}</td>
                      <td className="p-3 border-0">{data.reported_by.email}</td>
                      <td className="p-3 border-0">
                        {data.reported_by.full_phone_number}
                      </td>
                      <td className="p-3 border-0">{data.reported_to.name}</td>
                      <td className="p-3 border-0">{data.reported_to.email}</td>
                      <td className="p-3 border-0">
                        {data.reported_to.full_phone_number}
                      </td>
                      <td className="p-3 border-0 ">{data.date}</td>
                      <td className="p-3 border-0">
                        <div className="d-flex align-items-center gap-10">
                          <Button
                            onClick={() =>
                              navigate(`/reports/view/${data._id}`)
                            }
                            variant="transparent"
                            className="border-0 p-0 "
                          >
                            <OpenEyeIcon />
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
      <MyPagination
        requestDetails={requestDetails}
        setRequestDetails={setRequestDetails}
        totalPosts={reported_user.total_count}
      />
    </>
  );
};

export default TableData;
