import React, { useRef, useState } from "react";
import Slider from "react-slick";
import peopl from "../images/peopl.png";
import Room from "../images/room.png";
import Sl1 from "../images/sl1.png";
import Sl2 from "../images/sl2.png";
import Sl3 from "../images/sl3.png";
import Sl4 from "../images/sl4.png";

export default function ThumbnailSlider() {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    initialSlide: currentSlide, // Set the initial slide based on state
  };

  const itemStyle = {
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "bold",
    height: "435px",
  };

  const handleImageClick = (index) => {
    // Update the state to the clicked image's index
    setCurrentSlide(index);
    // Move the slider to the clicked image's index
    sliderRef.current.slickGoTo(index);
  };

  return (
    <>
      <div className="thumb-slides">
        <Slider {...settings} ref={sliderRef}>
          <div>
            <div style={itemStyle}>
              <img src={Sl1} alt="" />
            </div>
          </div>
          <div>
            <div style={itemStyle}>
              <img src={Sl2} alt="" />
            </div>
          </div>
          <div>
            <div style={itemStyle}>
              <img src={Sl3} alt="" />
            </div>
          </div>
          <div>
            <div style={itemStyle}>
              <img src={Sl4} alt="" />
            </div>
          </div>
        </Slider>
      </div>
      <div className="lower-img-row">
        <img src={Sl1} alt="" onClick={() => handleImageClick(0)} />
        <img src={Sl2} alt="" onClick={() => handleImageClick(1)} />
        <img src={Sl3} alt="" onClick={() => handleImageClick(2)} />
        <img src={Sl4} alt="" onClick={() => handleImageClick(3)} />
        <img src={Sl1} alt="" onClick={() => handleImageClick(3)} />
      </div>
    </>
  );
}
