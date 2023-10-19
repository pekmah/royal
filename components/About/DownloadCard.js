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
          url={"/downloads/coating.pdf"}
          fileName={"coating.pdf"}
        />
        <DownloadCardItem
          title={"Coating Analysis"}
          url={"/downloads/company profile.pdf"}
          fileName={"company profile.pdf"}
        />
        <DownloadCardItem
          title={"Corporate Social Responsibility"}
          url={"/downloads/cooperate social responsibility.pdf"}
          fileName={"cooperate social responsibility.pdf"}
        />
      </div>
    </div>
  );
};

export default DownloadCard;
