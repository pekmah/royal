import React from "react";

const HeartSvg = ({ fill = "none" }) => {
  return (
    <svg
      width="27"
      height="27"
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.5 8.0936C11.25 2.81236 3.375 3.37486 3.375 10.1249C3.375 16.8749 13.5 22.5001 13.5 22.5001C13.5 22.5001 23.625 16.8749 23.625 10.1249C23.625 3.37486 15.75 2.81236 13.5 8.0936Z"
        stroke="#2C3699"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={fill}
      />
    </svg>
  );
};

export default HeartSvg;
