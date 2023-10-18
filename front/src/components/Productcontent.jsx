import React from "react";
import { Col, Row } from "react-bootstrap";
import Star from "../../src/images/Star.png";
import Amn from "../../src/images/amn.png";
import Thumbnailslider from "../components/Thumbnailslider";
import { ReactComponent as WhatsappIcon } from "../assets/icons/whatsapp.svg";
import { ReactComponent as PhoneIcon } from "../assets/icons/phone.svg";
import { ReactComponent as EmailIcon } from "../assets/icons/email.svg";

export default function Productcontent() {
  return (
    <div className="product-part py-5">
      <Row>
        <Col xs={12} lg={4}>
          <Thumbnailslider />
        </Col>
        <Col className="pr-5" xs={12} lg={4}>
          <h1>2 BHK flat for rent for single family</h1>
          <p className="avenue-text">
            5th Avenue Times Square, Near SD College, Sec 32, Chandigarh
          </p>
          <p className="rating-text d-flex align-items-center">
            <img src={Star} alt="" />
            4.8 Rating
          </p>
          <ul className="expiry-text d-flex align-items-cnter pl-0">
            <li>Posted : 20th Oct, 2023</li>
            <li>Expiry : 20th Oct, 2023</li>
          </ul>
          <h2>$4500</h2>
          <p className="pf-cont">
            Discover the perfect blend of comfort and practicality in this
            charming 1 room set that's ideal for singles or couples. Situated in
            a desirable neighborhood, this well-maintained space offers a
            versatile layout, combining a bright living area, a cozy bedroom
            alcove, and a modern en-suite bathroom. The room features large
            windows that fill the space with natural light, creating an inviting
            atmosphere throughout the day.{" "}
          </p>
        </Col>
        <Col xs={12} lg={4}>
          <div className="lft-border">
            <div className="mb-3">
              <div className="detail-box">
                <h3 className="primaryTextColor">Details</h3>
                <div className="list-cont mb-2 d-flex align-items-center">
                  <p className="dim-text">Land Mark:</p>
                  <p className="primaryTextColor">Near SD College, sector 32</p>
                </div>
                <div className="list-cont mb-2 d-flex align-items-center">
                  <p className="dim-text">Bathroom:</p>
                  <p className="primaryTextColor">1</p>
                </div>
                <div className="list-cont mb-2 d-flex align-items-center">
                  <p className="dim-text">Living Room:</p>
                  <p className="primaryTextColor">1</p>
                </div>
                <div className="list-cont mb-2 d-flex align-items-center">
                  <p className="dim-text">Type:</p>
                  <p className="primaryTextColor">House - Individual</p>
                </div>
                <div className="list-cont mb-2 d-flex align-items-center">
                  <p className="dim-text">Bedroom ::</p>
                  <p className="primaryTextColor">1</p>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <div className="detail-box">
                <h3 className="primaryTextColor">Specifications</h3>
                <div className="list-cont mb-2 d-flex align-items-center">
                  <p className="dim-text">Pric:</p>
                  <p className="primaryTextColor">$200</p>
                </div>
                <div className="list-cont mb-2 d-flex align-items-center">
                  <p className="dim-text">Category:</p>
                  <p className="primaryTextColor">Flats</p>
                </div>
                <div className="list-cont mb-2 d-flex align-items-center">
                  <p className="dim-text">Negotiable:</p>
                  <p className="primaryTextColor">Yes</p>
                </div>
                <div className="list-cont mb-2 d-flex align-items-center">
                  <p className="dim-text">Used :</p>
                  <p className="primaryTextColor">Never</p>
                </div>
                <div className="list-cont mb-2 d-flex align-items-center">
                  <p className="dim-text">Posted On :</p>
                  <p className="primaryTextColor">15th Aug, 2023</p>
                </div>
                <div className="list-cont mb-2 d-flex align-items-center">
                  <p className="dim-text">Expiry On:</p>
                  <p className="primaryTextColor">25th Aug, 2023</p>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="py-3 my-4 align-items-center amn-row-cont">
        <Col xs={12} lg={6}>
          <Row>
            <Col xs={12} md={6}>
              <div className="d-flex align-items-center dm-cont">
                <img src={Amn} alt="" />
                <div className="ml-3">
                  <b>Aman Bhatia</b>
                  <p className="mb-0">Amanb123@gmail.com</p>
                </div>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div className="d-flex align-items-center justify-content-around my-2 m-md-0">
                <div className="dm-cont text-center">
                  <b>12</b>
                  <p className="mb-0">Ads Posted</p>
                </div>
                <p className="myVerticalLine" />
                <div className="dm-cont  text-center">
                  <b>2020</b>
                  <p className="mb-0">Member SInce</p>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col className="" xs={12} lg={6}>
          <div className="ml-auto p-3 d-none d-md-flex align-items-center justify-content-between nws-cont">
            <div className=" mx-2 mx-xl-3 d-flex align-items-center primaryTextColor">
              <WhatsappIcon className="icon me-2" />
              <p className="mb-0">Message Seller</p>
            </div>

            <div className=" mx-2 mx-xl-3 d-flex align-items-center primaryTextColor ">
              <PhoneIcon className="icon me-2" />
              <p className="mb-0">Contact Seller</p>
            </div>

            <div className=" mx-2 mx-xl-3 d-flex align-items-center primaryTextColor ">
              <EmailIcon className="icon me-2" />
              <p className="mb-0"> Email Seller</p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
