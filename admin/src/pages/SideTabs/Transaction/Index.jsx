import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import TableData from "./Component/TableData";
import NonAuthLayout from "../../../Layout/NonAuthLayout";
import { toast } from "react-toastify";
import { listTransactions } from "../../../redux/states/transactions/thunks/listTransactions";

const Transaction = () => {
  const { transactions } = useSelector((state) => state.transactions);
  const dispatch = useDispatch();
  const [requestDetails, setRequestDetails] = useState({
    limit: "10",
    page: 1,
  });

  const getTransactionsList = async () => {
    try {
      await dispatch(listTransactions())
        .unwrap()
        .catch((error) => toast.error(error.message));
    } catch (error) {
      toast.error(error.message);
      console.log("transactions error", error);
    }
  };

  useEffect(() => {
    getTransactionsList();
  }, [requestDetails]);

  console.log("transactions", transactions);

  return (
    <>
      <NonAuthLayout>
        <section className="Transaction py-3 position-relative">
          <Container fluid>
            <Row>
              <Col lg="12" className="my-2">
                <div className="Box py-3 pt-lg-4">
                  <div className="filterWrp mb-3 px-lg-5 px-3 d-flex aling-items-center flex-wrap justify-content-between gap-10">
                    <div className="left d-flex align-items-center gap-10 flex-wrap">
                      <h2 className="m-0 fw-bold">Transactions</h2>
                    </div>
                    <div className="right d-flex align-items-center flex-wrap gap-10">
                      <div className="d-flex text-dark align-items-center btn justify-content-center rounded-pill gap-10">
                        <p className="m-0 fw-normal text-muted">
                          Total Earning
                        </p>
                        $ {transactions.totalAmount}
                      </div>
                    </div>
                  </div>
                  <TableData
                    transactions={transactions}
                    requestDetails={requestDetails}
                    setRequestDetails={setRequestDetails}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </NonAuthLayout>
    </>
  );
};

export default Transaction;
