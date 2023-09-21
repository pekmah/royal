"use client";

import React, { useState } from "react";
import WhoWeAre from "./footer/WhoWeAre";
import Terms from "./footer/Terms";
import Faqs from "./footer/Faqs";

const renderBody = (screen) => {
  switch (screen) {
    case 1:
      return <WhoWeAre />;
    case 2:
      return <Terms />;
    case 3:
      return <Faqs />;

    default:
      return <WhoWeAre />;
  }
};
const Footer = () => {
  const [current, setCurrent] = useState(1);
  return (
    <div className={"text-black px-2 md:px-[8vw] py-14"}>
      <Header current={current} setCurrent={setCurrent} />

      {renderBody(current)}
    </div>
  );
};

export default Footer;

const Header = ({ setCurrent, current }) => {
  return (
    <div
      className={"flex justify-center items-center py-3 gap-x-8 font-barlow"}
    >
      {navList?.map((item) => (
        <HeaderItem
          key={item?.index}
          text={item?.name}
          handleSwitch={() => setCurrent(item?.index)}
          isCurrent={item?.index === current}
        />
      ))}
    </div>
  );
};

const HeaderItem = ({ isCurrent, text, handleSwitch }) => (
  <div className={"flex flex-col items-center gap-y-2"}>
    <button
      className={`font-barlow  ${
        isCurrent
          ? "about-h3 font-[700] text-lg md:text-xl"
          : "font-[400] text-gray-500 text-base md:text-lg"
      }`}
      onClick={handleSwitch}
    >
      {text}
    </button>

    {isCurrent ? (
      <div className={"w-14 h-1 bg-gray-200 rounded-full "} />
    ) : (
      <div />
    )}
  </div>
);

export const navList = [
  {
    name: "Who we Are",
    index: 1,
  },
  {
    name: "Our Terms & Conditions",
    index: 2,
  },
  {
    name: "FAQs",
    index: 3,
  },
];
