import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Switch from "react-switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { toggleTheme } from "../redux/theme/slice";
import logo from "../images/mklogo.png";
import { ReactComponent as ThreeBars } from "../assets/icons/threeBars.svg";
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";
import { ReactComponent as Logo } from "../assets/icons/appLogo.svg";
import { ReactComponent as Plus } from "../assets/icons/plus.svg";
import { ReactComponent as ProfileIcon } from "../assets/icons/profile.svg";

export default function Header() {
  const { theme } = useSelector((state) => state.theme);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showSearchBox, setShowSearchBox] = useState(false);

  const changeTheme = () => {
    dispatch(toggleTheme());
  };

  const handleSearchBox = () => {
    setShowSearchBox(!showSearchBox);
  };

  return (
    <div className="header-part py-3" id="header">
      <Container fluid className="px-3 px-md-5">
        <Row className="align-items-center">
          <Col xs={12} md={2}>
            <div className="mb-header d-flex align-items-center">
              {/* {pathname === "/home" ? (
                <div onClick={openCategoryBar}>
                  <ThreeBars className="icon" />
                </div>
              ) : ( */}
              <Logo className="icon logoIcon" />
              {/* )} */}
              <p className="appName m-0 ms-3">MARKET CAYMAN</p>
              <p className=" mb-0 ms-auto" onClick={handleSearchBox}>
                <SearchIcon
                  className="icon"
                  style={{ width: 26, height: 26 }}
                />
              </p>
              <p className="mb-0 ms-3" onClick={changeTheme}>
                {theme === "light" ? (
                  <FontAwesomeIcon
                    icon={faSun}
                    className="themeIcon text-black d-flex justify-content-center align-items-center"
                  />
                ) : (
                  <FontAwesomeIcon icon={faMoon} className="themeIcon" />
                )}
              </p>
            </div>
            <img
              onClick={() => navigate("/home")}
              className="pointer w-100 ds-log home-logo"
              src={logo}
              alt=""
            />
          </Col>
          <Col
            xs={12}
            md={4}
            className={`d-${
              showSearchBox ? "inline" : "none"
            } d-md-inline mt-4 mt-md-0`}
          >
            <div className="srch-part d-flex align-items-center ">
              <input
                className="border-rounded bg-transparent outline-none"
                type="search"
                placeholder="Seacrh for anything..."
              />
              <SearchIcon className="icon position-absolute m-3" />
            </div>
          </Col>
          <Col xs={12} md={6} className="d-none d-md-inline">
            <div className="post-cols d-flex align-items-center justify-content-end gap-4">
              <Button
                className="d-flex"
                variant="warning"
                onClick={() => navigate("/createPost/selectCategory")}
              >
                <Plus />
                Post Free
              </Button>
              {/* <Link className="rg-link primaryTextColor ml-5" to="/">
                  <ProfileIcon className="icon me-1" />
                  Login / Register
                </Link> */}
              <div className="m-0 d-flex align-items-center d-md-none d-lg-flex">
                <span className="primaryTextColor mr-2">Dark Theme</span>
                <Switch
                  checked={theme === "dark"}
                  onChange={changeTheme}
                  checkedIcon={false}
                  uncheckedIcon={false}
                  onColor={"#000"}
                  offColor="#fff"
                  offHandleColor="#000"
                  onHandleColor="#fff"
                  handleDiameter={13}
                  activeBoxShadow={"0 0 0px 2px #7e7e7e"}
                  className="switchBtn"
                />
              </div>
              <p className="mb-0 ms-auto d-lg-none" onClick={changeTheme}>
                {theme === "light" ? (
                  <FontAwesomeIcon
                    icon={faSun}
                    className="themeIcon text-black d-flex justify-content-center align-items-center"
                  />
                ) : (
                  <FontAwesomeIcon icon={faMoon} className="themeIcon" />
                )}
              </p>
              <p
                className="userAccountIcon"
                onClick={() => navigate("/profile")}
              >
                <ProfileIcon className="icon2" />
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
