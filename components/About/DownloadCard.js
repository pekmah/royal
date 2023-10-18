import React from "react";
import DownloadCardItem from "./DownloadCardItem";

const DownloadCard = ({ showCard }) => {
  return (
    <div
      className={`rounded-lg absolute left-14 md:left-0 right-0 -top-0 z-10 cursor-pointer `}
    >
      <div className="h-16 w-20" />
      <div
        className={`bg-white border border-gray-300 p-3 rounded-lg shadow-md overflow-hidden w-[270px] ${
          showCard ? "flex flex-col" : "hidden"
        }   `}
      >
        {/*title*/}
        <h6 className={"text-sm text-blue mb-2 "}>Downloads</h6>

        <DownloadCardItem
          title={"Company Profile"}
          handleClick={() => {
            window.open(
              "https://drive.google.com/file/d/1vnFXT214oaDqDLzlfNL-qMIjQgsoQHWa/view?usp=drive_link",
            );
          }}
        />
        <DownloadCardItem
          title={"Coating Analysis"}
          handleClick={() => {
            window.open(
              "https://drive.google.com/file/d/1kjN3yMe5AU_GFXJ7jf1_pi3KQ9XAThIO/view?usp=drive_link",
            );
          }}
        />
        <DownloadCardItem
          title={"Corporate Social Responsibility"}
          handleClick={() => {
            window.open(
              "https://drive.google.com/file/d/1s09hBkqAz5ONzCFvV8fcGee9OpZY3VgV/view?usp=drive_link",
            );
          }}
        />
      </div>
    </div>
  );
};

export default DownloadCard;
