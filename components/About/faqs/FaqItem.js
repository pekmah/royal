"use client";

import React, { useState } from "react";
import CancelSvg from "../../../public/svg/CancelSvg";
import PlusSvg from "../../../public/svg/PlusSvg";

const FaqItem = ({ title, desc }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className={"font-[600] py-3 border-b border-zinc-200 flex flex-col"}>
      <button
        className={"font-[600] flex justify-between w-full"}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>

        {isOpen ? <CancelSvg /> : <PlusSvg />}
      </button>

      {isOpen && (
        <p className={"leading-9 mt-3 font-[400] text-gray-600"}>{desc}</p>
      )}
    </li>
  );
};

export default FaqItem;
