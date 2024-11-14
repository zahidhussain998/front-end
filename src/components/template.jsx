/* eslint-disable react/prop-types */
import { animatePageIn } from "./utils/animations";
import { useEffect } from "react";

export default function Template({ children }) {
  useEffect(() => {
    animatePageIn();
  }, []);

  return (
    <div>
      {/* Full screen banner that animates */}
      <div
        id="banner-1"
        className=" bg-white z-50 fixed w-full h-full flex items-center justify-center"
      >
         <img
          src="/IMG.jpg" // Replace with your logo path
          alt="Logo"
          className="lg:w-[1200px] md:h-[748px] sm:w-96 sm:h-96 flex items-center justify-center object-contain" // Adjust the size as needed
        />
        </div>

      
      {/* Page content */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
}
