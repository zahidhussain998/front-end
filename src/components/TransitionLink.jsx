/* eslint-disable react/prop-types */
import { useNavigate, useLocation } from "react-router-dom";
import { animatePageOut } from "./utils/animations";

const TransitionLink = ({ to, label }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname !== to) {
      animatePageOut(to, navigate);  // Run the page-out animation, then navigate
    }
  };

  return (
    <button
      className="hover:underline"
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default TransitionLink;
