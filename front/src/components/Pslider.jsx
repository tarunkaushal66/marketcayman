import React from "react";
import Slider from "react-slick";
import Room from "../images/room.png";

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      {Array.from({ length: 6 }).map((_) => (
        <div className="sl-main">
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
      ))}
    </Slider>
  );
}
