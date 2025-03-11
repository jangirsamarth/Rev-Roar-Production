// eslint-disable-next-line no-unused-vars
import React from "react";
import './Loader.css';
import lionLogo from '../assets/lion-logo1.png'; // Adjust the path as needed

function Loader() {
  return (
    <div className="loader">
      <div className="circle-container">
        {/* Static, enlarged logo image */}
        <img src={lionLogo} alt="Loading" className="center-image" />

        {/* SVG containing the circular text */}
        <svg
          viewBox="0 0 300 300"
          className="circular-text"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="circlePath"
            d="
              M150,150
              m -105,0
              a 105,105 0 1,1 210,0
              a 105,105 0 1,1 -210,0
            "
          />
          <text className="rotating-text">
            <textPath
              xlinkHref="#circlePath"
              startOffset="50%"
              textAnchor="middle"
            >
              LOADING YOUR ROARING ADVENTURES
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  );
}

export default Loader;
