import React, { useState } from "react";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import { Link } from "react-router-dom";

function Slider() {
  const [current, setCurrent] = useState(0);
  const data = [
    { image1: "Leonardo_Phoenix_hey_create_the_banner_D4_designer_Aroma_candl_3-transformed.jpeg" },
    { image1: "Leonardo_Phoenix_hey_create_the_banner_D4_designer_Aroma_candl_0-transformed (1).jpeg" },
    { image1: "Leonardo_Phoenix_hey_create_the_banner_D4_designer_Aroma_candl_1_(2)-transformed.jpeg" },
    { image1: "t1.jpeg" },
    { image1: "Leonardo_Phoenix_hey_create_the_banner_D4_designer_Aroma_candl_1-transformed.jpeg" },
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
          {data.map((slide, index) => (
            <Link
              to={`/products/1`} // Adjust the route dynamically based on the index
              key={index}
              className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${
                index === current ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
              }`}
            >
              <img
                src={slide.image1}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Left & Right Navigation Icons */}
      <div className="absolute inset-0 flex justify-between items-center px-4">
        <div
          className="bg-white bg-opacity-50 rounded-full cursor-pointer sm:p-4 lg:p-5"
          onClick={prevSlide}
        >
          <WestOutlinedIcon className="text-gray-800 sm:text-[2rem] lg:text-[2.5rem] hover:scale-110 transition-transform duration-300" />
        </div>

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
