import React from "react";
import { Col, Row } from "react-bootstrap";
import Room from "../../src/images/room.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Adds() {
  const navigate = useNavigate();

  const { allAdds } = useSelector((state) => state.ads);

  console.log("allAdds", allAdds);

  return (
    <div className="future-content">
      <h1 className="mb-4">Featured Ads</h1>
      <Row className="gy-4">
        {Array.from({ length: 12 }).map((item, i) => (
          <Col
            key={i}
            onClick={() => navigate(`/products/${item?._id}`)}
            xs={12}
            md={6}
            lg={3}
          >
            <div className="singleProductColumn pointer">
              <div className="f-main">
                <img className="w-100" src={Room} alt="" />
                <div className="add-cont py-2">
                  <div className="fs-row d-flex align-items-center">
                    <b>1 BHK Flat Rent</b>
                    <b className="ml-auto ">$100</b>
                  </div>
                  <p className=" mb-0 bl-text py-1">
                    1 bhk flat for rent only for girls..
                  </p>

                  <div className="sd-row d-flex align-items-center">
                    <p className="mb-0">Sector 22, chandigarh</p>
                    <p className="ml-auto mb-0">2hrs ago</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}
