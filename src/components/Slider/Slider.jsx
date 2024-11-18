import React, { useState } from "react";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";

function Slider() {
  const [current, setCurrent] = useState(0);
  const data = [
    { image1: "Leonardo_Phoenix_hey_create_the_banner_D4_designer_Aroma_candl_3-transformed.jpeg" },
    { image1: "t1.jpeg" },
    {image1: "Leonardo_Phoenix_hey_create_the_banner_D4_designer_Aroma_candl_1-transformed.jpeg"},
    { image1: "Leonardo_Phoenix_I_want_to_create_a_banner_the_only_4_candles_1-transformed.jpeg" },
  ];

  const prevSlide = () => {
    setCurrent(current === 0 ? data.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === data.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="relative overflow-hidden">
      <div className="h-[500px] sm:h-[300px] md:h-[500px] lg:h-[700px] w-full relative">
        <div className="flex w-full h-full">
          {/* Slide container */}
          {data.map((slide, index) => (
            <img
              key={index}
              src={slide.image1}
              alt={`Slide ${index + 1}`}
              className={`w-full h-full object-cover absolute transition-opacity duration-700 ease-in-out ${
                index === current ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Left & Right Navigation Icons */}
      <div className="absolute inset-0 flex justify-between items-center px-4">
        {/* Left Icon */}
        <div
          className="bg-white bg-opacity-50 rounded-full cursor-pointer sm:p-4 lg:p-5"
          onClick={prevSlide}
        >
          <WestOutlinedIcon className="text-gray-800 sm:text-[2rem] lg:text-[2.5rem] hover:scale-110 transition-transform duration-300" />
        </div>

        {/* Right Icon */}
        <div
          className="bg-white bg-opacity-50 rounded-full cursor-pointer sm:p-4 lg:p-5"
          onClick={nextSlide}
        >
          <EastOutlinedIcon className="text-gray-800 sm:text-[2rem] lg:text-[2.5rem] hover:scale-110 transition-transform duration-300" />
        </div>
      </div>
    </div>
  );
}

export default Slider;
