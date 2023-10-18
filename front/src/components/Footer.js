import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../images/mklogo.png";
import { ReactComponent as FacebookIcon } from "../assets/icons/facebook.svg";
import { ReactComponent as InstagramIcon } from "../assets/icons/instagram.svg";
import { ReactComponent as YoutubeIcon } from "../assets/icons/youtube.svg";
import { ReactComponent as LinkedinIcon } from "../assets/icons/linkedin.svg";
import { ReactComponent as TwitterIcon } from "../assets/icons/twitter.svg";
import { ReactComponent as AppleIcon } from "../assets/icons/apple.svg";
import { ReactComponent as PlayStoreIcon } from "../assets/icons/playStore.svg";

export default function Footer() {
  return (
    <div className="footer-part pt-3">
      <Container fluid className="px-3 px-md-5">
        <Row>
          <Col lg="12">
            <img className="ft-log" src={Logo} alt="" />
          </Col>
        </Row>

        <Row className="py-3">
          <Col xs={12} lg={8}>
            <ul className="ftr-menus d-flex align-items-center pl-0">
              <li>
                <Link to="/aboutus">About us</Link>
              </li>
              <li>
                <Link to="/policies">Privacy policy</Link>
              </li>
              <li>
                <Link to="/t&c">Terms and conditions</Link>
              </li>
              {/* <li>
                <Link to="">Contact us</Link>
              </li> */}
            </ul>
          </Col>

          <Col xs={12} lg={4}>
            <ul className="social d-flex justify-content-end">
              <li>Follow Us:</li>
              <li>
                <Link to="">
                  <span className="ft-icons">
                    <FacebookIcon />
                  </span>
                </Link>
                <Link to="">
                  <span className="ft-icons">
                    <InstagramIcon />
                  </span>
                </Link>
                <Link to="">
                  <span className="ft-icons">
                    <YoutubeIcon />
                  </span>
                </Link>
                <Link to="">
                  <span className="ft-icons">
                    <LinkedinIcon />
                  </span>
                </Link>
                <Link to="">
                  <span className="ft-icons">
                    <TwitterIcon />
                  </span>
                </Link>
              </li>
            </ul>
          </Col>
        </Row>

        <Row className="py-4 bottm-row">
          <Col xs={12} lg={4}></Col>

          <Col xs={12} lg={4}>
            <p className="text-center mb-0 primaryTextColor">
              ©2020 All Rights Reserved
            </p>
          </Col>

          <Col xs={12} lg={4}>
            <Button
              className="d-flex align-items-center ml-auto warn-btn justify-content-center"
              variant="warning"
            >
              Download
              <AppleIcon className="appStoreIcon mx-1" />
              <p className="verticalLine m-0" />
              <PlayStoreIcon className="appStoreIcon mx-1" />
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
