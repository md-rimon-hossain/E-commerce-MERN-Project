/* eslint-disable no-unused-vars */

import React, { useCallback, useEffect, useState } from "react";

import { assets } from "../../assets";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const index =
      (currentIndex - 1 + assets.carouselImages.length) %
      assets.carouselImages.length;
    setCurrentIndex(index);
  };

  const goToNext = useCallback(() => {
    const index = (currentIndex + 1) % assets.carouselImages.length;
    setCurrentIndex(index);
  }, [currentIndex]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      goToNext();
    }, 7000);

    // Clean up the interval when the component unmounts or when count reaches a certain value
    return () => {
      clearInterval(intervalId);
    };
  }, [goToNext]);

  return (
    <div className=" w-full  mb-5">
      <div className=" relative w-full">
        <img
          src={assets.carouselImages[currentIndex]}
          alt={`carousel-item-${currentIndex}`}
          style={{ animation: "fadeIn 0.5s ease-in-out forwards" }}
          className={` w-full carousel-image sm:max-h-[577.78px] man-h-[577.78px] object-cover rounded-md  transition-opacity duration-500 
           }`}
        />

        <div className="absolute top-[50%] left-0 right-0 flex justify-between px-8">
          <button
            onClick={goToPrevious}
            className="btn btn-circle text-white bg-gray-800 opacity-75 hover:opacity-100"
          >
            ❮
          </button>
          <button
            onClick={goToNext}
            className="btn btn-circle text-white bg-gray-800 opacity-75 hover:opacity-100"
          >
            ❯
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
