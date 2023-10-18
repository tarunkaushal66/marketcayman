import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import styles from "../../profile/Profile.module.css";
import styles2 from "./PostAdd.module.css";
import productImage from "../../../images/room.png";

const dates = {
  start: "start",
  end: "end",
};

export default function PromoteAdd() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [datePicker, setDatePicker] = useState(dates.start);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="d-flex justify-content-center">
      <Container fluid>
        <Row className="d-flex justify-center m-0 m-md-5 ">
          <Col xs={12} lg={6}>
            <div className={`${styles.container} px-0`}>
              <div className={`${styles.main} `}>
                <div className="text-center px-3">
                  <h4 className="text-center mb-5">Promote Add</h4>
                  <img src={productImage} className="productImageToPromote" />
                  <h6> Apple airpods 2nd generationx</h6>
                  <p> ( Mobile & Accessories) </p>
                </div>

                <h6 className="px-3 mb-0 mt-5">Select Dates</h6>
                <div className="datePickerWrapper">
                  <DatePicker
                    selected={startDate}
                    onSelect={(date) => {
                      setStartDate(date);
                      setDatePicker(dates.end);
                    }}
                    customInput={<input className="inputField me-2" />}
                    wrapperClassName="react-date-picker-main"
                    minDate={new Date()}
                    maxDate={endDate ? endDate : null}
                    open={datePicker === dates.start}
                  />
                </div>
                <div className="datePickerWrapper">
                  <DatePicker
                    selected={endDate}
                    onSelect={(date) => setEndDate(date)}
                    customInput={<input className="inputField me-2" />}
                    wrapperClassName="react-date-picker-main"
                    minDate={startDate || new Date()}
                    startDate={startDate}
                    open={datePicker === dates.end}
                  />
                </div>

                <h6 className="px-3">Dates Selected</h6>
                <Row className="px-3">
                  <Col xs={12} sm={6}>
                    <p
                      className="inputField pointer"
                      onClick={() => setDatePicker(dates.start)}
                    >
                      {startDate
                        ? startDate?.toLocaleDateString()
                        : "Select Start Date"}
                    </p>
                  </Col>
                  <Col xs={12} sm={6}>
                    <p
                      className="inputField pointer"
                      onClick={() => setDatePicker(dates.end)}
                    >
                      {endDate
                        ? endDate?.toLocaleDateString()
                        : "Select End Date"}
                    </p>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
