import React from "react";
import DownloadSvg from "../../public/svg/DownloadSvg";

const DownloadCardItem = ({ title, handleClick }) => {
  return (
    <button
      className={
        "text-sm font-inter flex items-center justify-between py-1.5 px-1 hover:bg-gray-100 rounded-lg mb-1"
      }
      onClick={handleClick}
    >
      <span>{title}</span>
      <div
        className={
          "h-6 w-6 bg-gray-200 rounded-md flex items-center justify-center"
        }
      >
        <DownloadSvg />
      </div>
    </button>
  );
};

export default DownloadCardItem;
