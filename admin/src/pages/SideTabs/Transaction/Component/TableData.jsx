import React from "react";
import moment from "moment";
import MyPagination from "../../../../components/common/myPagination";

const TableData = ({ transactions, requestDetails, setRequestDetails }) => {
  return (
    <>
      <div className="table-responsive">
        <table className="table commonTable">
          <thead className="border-0">
            <tr>
              <th className=" border-0 p-3">S.No.</th>
              <th className=" border-0 p-3">Transaction ID</th>
              <th className=" border-0 p-3">Amount</th>
              <th className=" border-0 p-3">Date</th>
              <th className=" border-0 p-3">Type</th>
              <th className=" border-0 p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.data &&
              transactions.data.length > 0 &&
              transactions.data.map((data, idx) => {
                return (
                  <>
                    <tr>
                      <td className="p-3 border-0">{idx + 1}</td>
                      <td className="p-3 border-0">
                        {data.payment_gateway_details?.transaction_id}
                      </td>
                      <td className="p-3 border-0">
                        $ {data.transaction_amount}
                      </td>
                      <td className="p-3 border-0">
                        {moment(data.createdAt).format("DD-MM-YYYY HH:MM")}
                      </td>
                      <td className="p-3 border-0">{data.transaction_type}</td>
                      <td className="p-3 border-0">
                        {data.transaction_status}
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
        totalPosts={transactions.total_count}
      />
    </>
  );
};

export default TableData;
