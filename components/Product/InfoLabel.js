import React from "react";

const InfoLabel = ({ text }) => {
  return (
    <div
      className={
        "p-1 bg-[#2C36990A] flex gap-x-1 text-[#2C3699] ml-1 items-center"
      }
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 6.41667V9.33333M7 12.25C4.1005 12.25 1.75 9.89949 1.75 7C1.75 4.1005 4.1005 1.75 7 1.75C9.89949 1.75 12.25 4.1005 12.25 7C12.25 9.89949 9.89949 12.25 7 12.25ZM7.02905 4.66667V4.725L6.97095 4.72511V4.66667H7.02905Z"
          stroke="#2C3699"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <span className={"text-[11px]"}>{text}</span>
    </div>
  );
};

export default InfoLabel;
