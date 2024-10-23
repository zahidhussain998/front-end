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
        className="min-h-[110vh] bg-neutral-950 z-50 fixed w-full h-full"
      />
      
      {/* Page content */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
}
