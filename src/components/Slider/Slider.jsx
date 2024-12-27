import React, { useState } from "react";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import { Link } from "react-router-dom";

function Slider() {
  const [current, setCurrent] = useState(0);
  const data = [
    { id: 1, image1: "Leonardo_Phoenix_hey_create_the_banner_D4_designer_Aroma_candl_3-transformed.jpeg" },
    { id: 2, image1: "Leonardo_Phoenix_hey_create_the_banner_D4_designer_Aroma_candl_0-transformed (1).jpeg" },
    { id: 3, image1: "Leonardo_Phoenix_hey_create_the_banner_D4_designer_Aroma_candl_1_(2)-transformed.jpeg" },
    { id: 4, image1: "t1.jpeg" },
    { id: 5, image1: "Leonardo_Phoenix_hey_create_the_banner_D4_designer_Aroma_candl_1-transformed.jpeg" },
    { id: 6, image1: "Leonardo_Phoenix_I_want_to_create_a_banner_the_only_4_candles_1-transformed.jpeg" },
  ];

  const prevSlide = () => {
    setCurrent(current === 0 ? data.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === data.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Slider Container */}
      <div className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[700px] w-full relative">
        <div className="flex w-full h-full">
          {data.map((slide, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${
                index === current ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
              }`}
            >
              {/* Clickable Image */}
              <Link to="/products/1">
                <img
                  src={slide.image1}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover cursor-pointer"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Left & Right Navigation Icons */}
      <div className="absolute inset-0 flex justify-between items-center px-4 z-10">
        <button
          className="bg-white bg-opacity-50 rounded-full cursor-pointer p-2 sm:p-4 lg:p-5"
          onClick={prevSlide}
        >
          <WestOutlinedIcon className="text-gray-800 text-[1.5rem] sm:text-[2rem] lg:text-[2.5rem] hover:scale-110 transition-transform duration-300" />
        </button>

        <button
          className="bg-white bg-opacity-50 rounded-full cursor-pointer p-2 sm:p-4 lg:p-5"
          onClick={nextSlide}
        >
          <EastOutlinedIcon className="text-gray-800 text-[1.5rem] sm:text-[2rem] lg:text-[2.5rem] hover:scale-110 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
}

export default Slider;
