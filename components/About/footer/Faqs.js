import React from "react";
import PlusSvg from "../../../public/svg/PlusSvg";
import CancelSvg from "../../../public/svg/CancelSvg";

const Faqs = () => {
  return (
    <div className={"flex"}>
      <div className={"w-1/3 hidden md:flex font-barlow "}>
        <ul className={"flex flex-col gap-y-4"}>
          <li
            className={
              "py-2 border-b border-zinc-200 pr-10 text-black font-[500]"
            }
          >
            Sales Questions
          </li>
          <li className={"py-2 text-gray-400 pr-6"}>Sales Questions</li>
          <li className={"py-2 text-gray-400 pr-6"}>Sales Questions</li>
          <li className={"py-2 text-gray-400 pr-6"}>Sales Questions</li>
        </ul>
      </div>
      <div className={"w-full md:w-2/3 font-barlow"}>
        <ul className={"flex flex-col gap-y-3.5"}>
          <li
            className={
              "font-[600] py-3 border-b border-zinc-200 flex justify-between"
            }
          >
            <span>Our Frequently asked questions</span>
            <PlusSvg />
          </li>

          <li
            className={
              "font-[600] py-3 border-b border-zinc-200 flex justify-between"
            }
          >
            <span>Our Frequently asked questions</span>
            <PlusSvg />
          </li>
          <li
            className={"font-[600] py-3 border-b border-zinc-200 flex flex-col"}
          >
            <button className={"font-[600] flex justify-between w-full"}>
              <span>Our Frequently asked questions</span>

              <CancelSvg />
            </button>

            <p className={"leading-9 mt-3 font-[500] text-gray-600"}>
              The customer is responsible for the selection and specifications
              of the goods. Under no circumstance shall RMFL accept the return
              or replacement of the materials selected by the customer or be
              liable for the selection made by the customer. Claims in respect
              of shortages shall be made in writing, immediately upon receipt of
              the consignment in respect of which a shortage is alleged.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Faqs;
