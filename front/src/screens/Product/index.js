import React, { useEffect } from "react";
import { Button, Col, Container, Dropdown, Row } from "react-bootstrap";
import Eclp from "../../images/eclp.png";
import Str from "../../images/str.png";
import Productcontent from "../../components/Productcontent";
import Pslider from "../../components/Pslider";
import { ReactComponent as WhatsappIcon } from "../../assets/icons/whatsapp.svg";
import { ReactComponent as PhoneIcon } from "../../assets/icons/phone.svg";
import { ReactComponent as EmailIcon } from "../../assets/icons/email.svg";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAddDetails } from "../../redux/adds/thunk";
import { toast } from "react-toastify";

export default function Products() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { addDetails } = useSelector((state) => state.ads);

  const getProductDetails = async () => {
    try {
      const response = await dispatch(getAddDetails(id)).unwrap();
      // console.log("response", response);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  console.log("addDetails", addDetails);

  return (
    <>
      <Container fluid className="px-3 px-md-5">
        <Productcontent />
        <div className="review-part">
          <div className="d-flex align-items-center mb-5">
            <h4>Customer Reviews</h4>
            <div className="sort-content d-flex align-items-center justify-content-end ml-auto">
              <p className="sort mb-0 me-2">Sort By:</p>
              <Dropdown>
                <Dropdown.Toggle
                  className="primaryTextColor box-shadow-none pe-0"
                  variant=""
                  id="dropdown-basic"
                >
                  Newest
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Action</Dropdown.Item>
                  <Dropdown.Item>Another action</Dropdown.Item>
                  <Dropdown.Item>Something else</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Button className="rating ml-3" variant="">
                Give Rating
              </Button>
            </div>
          </div>
          {Array.from({ length: 3 }).map((_, index) => (
            <Row
              className={`review-part pb-4 mb-4 ${
                index < 2 && "border-bottom"
              }`}
            >
              <Col lg={12}>
                <div className="d-flex align-items-center rev-text">
                  <img src={Eclp} alt="" />
                  <div className="ml-2">
                    <b className=" mb-1">David Smith Jones</b>
                    <p className="d-flex align-items-center mb-0 str-cont">
                      <img className="mr-2" src={Str} alt="" />
                      24mins ago
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          ))}
        </div>
        <div className="product-slider-content pb-5">
          <h4 className="mb-4">You may also like</h4>
          <Pslider />
        </div>
      </Container>
      <div className="product-bar w-100 px-3 py-1 d-md-none d-flex align-items-center justify-content-between position-fixed bottom-0">
        <a
          href="https://wa.me/9813853938"
          className="text-center text-decoration-none"
        >
          <WhatsappIcon className="icon" />
          <p className="mb-0 contactLink">Whatsapp</p>
        </a>
        <a href="tel:9813853938" className="text-decoration-none">
          <div className="text-center">
            <PhoneIcon className="icon" />
            <p className="mb-0 contactLink">Call Seller</p>
          </div>
        </a>
        <a
          href="mailto:devmanishmittal@gmail.com"
          className="text-center text-decoration-none"
        >
          <EmailIcon className="icon" />
          <br />

          <p className="mb-0 contactLink">Email</p>
        </a>
      </div>
    </>
  );
}
