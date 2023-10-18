import React from "react";
import { Form, Pagination } from "react-bootstrap";

export default function MyPagination({
  requestDetails,
  setRequestDetails,
  totalPosts,
}) {
  const lastPage = Math.ceil(totalPosts / requestDetails.limit);
  const handleNextPageClick = () => {
    setRequestDetails({
      ...requestDetails,
      page: requestDetails.page + 1,
    });
  };

  const handlePrevPageClick = () => {
    setRequestDetails({
      ...requestDetails,
      page: requestDetails.page - 1,
    });
  };

  const handleLimitChange = (e) => {
    const limit = e.target.value;
    const lastPage = Math.ceil(totalPosts / limit);

    setRequestDetails({
      ...requestDetails,
      limit: limit,
      page: requestDetails.page > lastPage ? lastPage : requestDetails.page,
    });
  };

  // console.log("requestDetails", requestDetails);
  // console.log("totalPosts", totalPosts);

  return (
    <div className="d-flex align-items-center justify-content-between paginationWrpper flex-wrap mt-3">
      <div className="left d-flex align-items-center gap-10">
        <label htmlFor="" className="form-label m-0">
          Show Result
        </label>
        <Form.Select
          aria-label="Default select example"
          onChange={handleLimitChange}
          value={requestDetails.limit}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </Form.Select>
      </div>
      <Pagination>
        <Pagination.Prev
          onClick={handlePrevPageClick}
          disabled={requestDetails.page === 1}
        />
        <Pagination.Item active>{requestDetails.page}</Pagination.Item>
        <Pagination.Next
          onClick={handleNextPageClick}
          disabled={requestDetails.page === lastPage}
        />
      </Pagination>
    </div>
  );
}
