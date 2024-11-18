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
          className="w-full h-auto max-w-[1200px] sm:max-w-[400px] sm:h-auto object-contain mx-auto"
          />
        </div>

      
      {/* Page content */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
}
