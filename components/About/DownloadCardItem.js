import React from "react";
import DownloadSvg from "../../public/svg/DownloadSvg";

const DownloadCardItem = ({ title, url, fileName }) => {
  const handleDownloadFile = async () => {
    window.open(url);
  };

  return (
    <a
      className={
        "text-sm font-inter flex items-center justify-between py-1.5 px-1 hover:bg-gray-100 rounded-lg mb-1"
      }
      href={url}
      download={fileName}
    >
      <span>{title}</span>
      <div
        className={
          "h-6 w-6 bg-gray-200 rounded-md flex items-center justify-center"
        }
      >
        <DownloadSvg />
      </div>
    </a>
  );
};

export default DownloadCardItem;
