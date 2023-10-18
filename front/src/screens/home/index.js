import React, { useEffect, useRef } from "react";
import { Container, Row, Col, Button, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as HomeIcon } from "../../assets/icons/home.svg";
import { ReactComponent as ProfileIcon } from "../../assets/icons/profile.svg";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg";
import { ReactComponent as BottomPad } from "../../assets/icons/Rectangle 42.svg";
import { ReactComponent as CrossIcon } from "../../assets/icons/cross.svg";
import Hbanr from "../../images/hbanr.png";
import Sale from "../../images/sale.png";
import Anm from "../../images/anm.png";
import Category from "../../components/Category";
import Adds from "../../components/Adds";
import { toast } from "react-toastify";
import { getAllAdds } from "../../redux/adds/thunk";
import { toggleCategoryBar } from "../../redux/responsive/slice";
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { openCategoryBar } = useSelector((state) => state.responsive);
  const { allAdds } = useSelector((state) => state.ads);

  const [paginationDetails, setPaginationDetails] = useState({
    page: 1,
  });

  const openFilterBar = () => {
    dispatch(toggleCategoryBar(true));
  };
  const closeFilterBar = () => {
    dispatch(toggleCategoryBar(false));
  };

  const fetchAdds = async () => {
    try {
      const response = await dispatch(getAllAdds()).unwrap();
      console.log("rsponse", response);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAdds();
  }, []);

  const bodyRect = document.body.getBoundingClientRect();
  const headerHeight = document
    .getElementById("header")
    ?.getBoundingClientRect();
  const offset = headerHeight?.top - bodyRect.top;

  // console.log("offset", offset);
  // console.log("allAdds", allAdds);

  return (
    <div className="position-relative">
      <Container fluid className="px-3 px-md-5">
        <div
          className={`${
            openCategoryBar ? "categoryBarActive" : "categoryBarClosed"
          }`}
        >
          <CrossIcon
            className="icon position-absolute right-0 m-2"
            onClick={closeFilterBar}
          />
          <Category />
        </div>
        <div className="home-banr">
          <img className="w-100 hm-img" src={Hbanr} alt="" />
          <div className="home-category-part">
            <div className="d-flex align-items-center mt-3">
              <h4 className="mb-0">Select Category</h4>
              <Button
                className="filter d-flex text-black align-items-center ml-auto"
                variant=""
                onClick={openFilterBar}
              >
                <img className="mr-1" src={Anm} alt="" />
                Filter
              </Button>
            </div>
            <div className="bt-group mt-3">
              <ButtonGroup
                aria-label=""
                className="mobileCategoryScroll hideScroll"
              >
                {/* <Button>
                    <img src={Frdots} className="primaryText" />
                  </Button> */}
                <Button variant="outline-light" className="MobileCategoryBtn">
                  Cars/ Bikes
                </Button>
                <Button variant="outline-light" className="MobileCategoryBtn">
                  Mobile Phone
                </Button>
                <Button variant="outline-light" className="MobileCategoryBtn">
                  Cars/ Bikes
                </Button>
                <Button variant="outline-light" className="MobileCategoryBtn">
                  Cars/ Bikes
                </Button>
                <Button variant="outline-light" className="MobileCategoryBtn">
                  Mobile Phone
                </Button>
                <Button variant="outline-light" className="MobileCategoryBtn">
                  Cars/ Bikes
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </div>

        <div className="category-part py-4">
          <Row>
            <Col xs={12} lg={3} className="d-none d-lg-block">
              <Category />
            </Col>
            <Col xs={12} lg={9}>
              <Adds />
            </Col>
          </Row>
        </div>

        <div className="sale-img">
          <img className="w-100" src={Sale} alt="" />
        </div>
      </Container>

      <div className=" w-100 d-md-none d-flex align-items-center justify-content-between position-fixed bottom-0">
        <BottomPad className="homePageBottomTab px-n3" />

        <div className="text-center ps-3">
          <HomeIcon className="icon" />
          <p className="primaryTextColor text-center mb-0">Home</p>
        </div>
        <div
          className="mx-auto position-relative w-100"
          onClick={() => navigate("/createPost/selectCategory")}
        >
          <div>
            <span className="plus-cover">
              <PlusIcon className="icon" />
            </span>
          </div>
        </div>
        <div className="text-center pe-3" onClick={() => navigate("/profile")}>
          <ProfileIcon className="icon" />
          <p className="primaryTextColor text-center mb-0">Profile</p>
        </div>
      </div>
    </div>
  );
};
export default Home;
