import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";

import Banner1 from "../../assets/landing-page-images/banner1.jpg";
import Banner2 from "../../assets/landing-page-images/banner2.jpg";
import Banner3 from "../../assets/landing-page-images/banner-3.png";
const SaleCarousel = () => {
  const navigate = useNavigate();
  return (
    <Carousel
      autoPlay
      infiniteLoop
      onClickItem={() => navigate("/products")}
      interval={2500}
      showThumbs={false}
      showStatus={false}
    >
      <div>
        <img src={Banner3} alt="Banner1" />
      </div>
      <div>
        <img src={Banner2} alt="Banner2" />
      </div>
      <div>
        <img src={Banner1} alt="Banner1" />
      </div>
    </Carousel>
  );
};

export default SaleCarousel;
