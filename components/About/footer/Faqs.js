import React from "react";
import { FaqItem } from "../index";

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
            Quick Answers
          </li>
        </ul>
      </div>
      <div className={"w-full md:w-2/3 font-barlow"}>
        <ul className={"flex flex-col gap-y-3.5"}>
          <FaqItem
            title={"Do you offer transport to customers and at how much?"}
            desc={" We offer free transport countrywide."}
          />

          <FaqItem
            title={
              "What is the difference between ROYAL MABATI and your competitors?"
            }
            desc={
              "Quality and durability. We do free delivery immediately after payment and special\n" +
              "order measurements are produced immediately compared to our competitors who deliver\n" +
              "within 2 to 3 weeks. Our Products have Aluminium and Zinc to prevent corrosion compared to\n" +
              "poor quality mabati from Chinese importers that fade so fast"
            }
          />
          <FaqItem
            title={"Can someone pay by installments?"}
            desc={
              "Our clients can pay at their own convenience and clear before delivery. Failing to Plan is planning to fail. Purchase your roofing material as early as possible to prevent last minute rush and changes in prices. We will deliver on your request."
            }
          />
        </ul>
      </div>
    </div>
  );
};

export default Faqs;
