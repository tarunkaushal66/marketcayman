import React from "react";
import NonAuthLayout from "../../../Layout/NonAuthLayout";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import TableData from "./Component/TableData";

const Reports = () => {
  return (
    <>
      <NonAuthLayout>
        <section className="reports py-3 position-relative">
          <Container fluid>
            <Row>
              <Col lg="12" className="my-2">
                <div className="Box py-3 pt-lg-4">
                  <div className="filterWrp mb-3 px-lg-5 px-3 d-flex aling-items-center flex-wrap justify-content-between gap-10">
                    <div className="left d-flex align-items-center gap-10 flex-wrap">
                      <h2 className="m-0 fw-bold">Reports</h2>
                      <div className="">
                        <Form.Select
                          className="form-control rounded-pill"
                          aria-label="Default select example"
                        >
                          <option>Filter By</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </Form.Select>
                      </div>
                    </div>
                  </div>
                  <TableData />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </NonAuthLayout>
    </>
  );
};

export default Reports;
