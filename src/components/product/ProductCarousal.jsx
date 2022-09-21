import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ProductCarousal = ({ photos }) => {
  return (
    <Carousel autoPlay infiniteLoop interval={2500}>
      {photos.map((photo, idx) => (
        <div key={idx}>
          <img
            className="lg:w-1/2 w-full lg:h-auto object-cover object-center rounded"
            src={photo.secure_url}
            alt={photo.public_id}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default ProductCarousal;
