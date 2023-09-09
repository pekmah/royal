"use client";

import React, { useState } from "react";
import WhoWeAre from "./footer/WhoWeAre";
import Terms from "./footer/Terms";

const renderBody = (screen) => {
  switch (screen) {
    case 1:
      return <WhoWeAre />;
    case 2:
      return <Terms />;

    default:
      return <WhoWeAre />;
  }
};
const Footer = () => {
  const [current, setCurrent] = useState(1);
  return (
    <div className={"text-black px-[8vw] py-14"}>
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
  <button
    className={`font-barlow  ${
      isCurrent
        ? "about-h3 font-[700] text-xl"
        : "font-[400] text-gray-500 text-lg"
    }`}
    onClick={handleSwitch}
  >
    {text}
  </button>
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
