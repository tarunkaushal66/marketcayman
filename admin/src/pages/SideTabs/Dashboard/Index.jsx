import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NonAuthLayout from "../../../Layout/NonAuthLayout";
import { Button, Col, Container, Modal, Nav, Row, Tab } from "react-bootstrap";
import CounterCards from "./component/CounterCards";
import { dashboard } from "../../../redux/states/dashboard/thunks/dashboard";
import UserChart from "./component/Chart/UserChart";
import { listUsers } from "../../../redux/states/user/thunks/listUsers";
import { listBlockUsers } from "../../../redux/states/user/thunks/listBlockUser";
import { toast } from "react-toastify";
import BarChart from "./component/Chart/BarChart";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { blocked_user, manage_user } = useSelector((s) => s.user) ?? {};
  const { pieChartData } = useSelector((s) => s.dashboard);

  useEffect(() => {
    dispatch(dashboard())
      .unwrap()
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  let fetchData = async (name = "ManagerUser") => {
    let request = { limit: 10, page: 1, showLoader: true };

    try {
      if (name === "Block") {
        await dispatch(listBlockUsers(request)).unwrap();
      } else {
        await dispatch(listUsers(request)).unwrap();
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    fetchData("ManagerUser");
  }, []);

  const pieData = {
    daily: {
      ongoing: 0,
      completed: 0,
      cancelled: 0,
      total: 0,
    },
    weekly: {
      ongoing: 0,
      completed: 0,
      cancelled: 0,
      total: 0,
    },
    overall: {
      ongoing: 0,
      completed: 0,
      cancelled: 0,
      total: 0,
    },
  };

  pieChartData?.forEach((item) => {
    if (item.status === 0) {
      pieData[item.period]["cancelled"] += item.count;
    } else if (item.status === 1) {
      pieData[item.period]["ongoing"] += item.count;
    } else if (item.status === 2) {
      pieData[item.period]["completed"] += item.count;
    }
    pieData[item.period]["total"] += item.count;
  });

  return (
    <>
      <NonAuthLayout>
        <section className="dashboard py-3"></section>
        <Container fluid>
          <CounterCards />
          <Row>
            <Col lg="6" className="my-2">
              <div className="Box cardCstm h-100 p-3">
                <div className="topHead d-flex align-items-start justify-content-between gap-10">
                  <div className="left">
                    <h6 className="m-0 fw-bold theme-blue">Users</h6>
                    <p className="m-0 text-muted m-0">
                      Check total users registered across Time
                    </p>
                  </div>
                </div>
                <div className="GraphBody pt-3">
                  <BarChart />
                </div>
              </div>
            </Col>
            <Col lg="6" className="my-2">
              <div className="Box cardCstm h-100 p-3">
                <div className="topHead d-flex align-items-start justify-content-between gap-10">
                  <div className="left">
                    <h6 className="m-0 fw-bold theme-blue">Revenue</h6>
                    <p className="m-0 text-muted m-0">
                      Check your total revenue across Time
                    </p>
                  </div>
                </div>
                <div className="GraphBody pt-3">
                  <BarChart />
                </div>
              </div>
            </Col>
            <Col lg="6" className="my-2">
              <div className="Box cardCstm h-100 p-3">
                <div className="topHead d-flex align-items-start justify-content-between gap-10">
                  <div className="left">
                    <h6 className="m-0 fw-bold theme-blue">
                      Purchased Featured Adds
                    </h6>
                    <p className="m-0 text-muted m-0">
                      Check total Featured adds purchased across Time
                    </p>
                  </div>
                </div>
                <div className="GraphBody pt-3">
                  <BarChart />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </NonAuthLayout>
    </>
  );
};

export default Dashboard;
