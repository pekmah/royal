"use client";
import React, { useContext } from "react";
import Check from "../../../public/svg/Check";
import EditSvg from "../../../public/svg/Edit";
import { CContext } from "../../../context/CartContext2";

const DeliveryMethod = () => {
  const { checkout } = useContext(CContext);

  return (
    <div className="w-full  font-barlow py-3 bg-white shadow">
      <div className="gap-4 flex flex-col items-center px-6 justify-center w-full border-b h-14 border-b-gray-200">
        <div className="  font-[600] flex justify-between items-end w-full ">
          <div className="[flex-grow:1] gap-[17px] flex justify-between items-center h-full text-black">
            <Check className="w-[17px] h-[17px] my-auto" />
            <p className="[flex-grow:1]  text-[19px] h-6">Type of Delivery</p>
          </div>

          <div className="text-[#DC2A25] gap-2.5 flex justify-center items-center ">
            <EditSvg />

            <span className={"text-base font-[500]"}>Edit</span>
          </div>
        </div>
      </div>

      <div className={"p-5"}>
        <div className="text-black text-base font-medium">
          {checkout?.del_option === "FREE_DELIVERY"
            ? "Free Delivery"
            : checkout?.del_option === "EXPRESS_DELIVERY"
            ? "Express Delivery"
            : "Own collection"}
        </div>

        {/*<div className="">*/}
        {/*  <span className="text-zinc-800 text-sm font-medium">*/}
        {/*    Delivery between{" "}*/}
        {/*  </span>*/}
        {/*  <span className="text-zinc-800 text-sm font-semibold">Jun 30</span>*/}
        {/*  <span className="text-zinc-800 text-sm font-medium"> and </span>*/}
        {/*  <span className="text-zinc-800 text-sm font-semibold">Jun 24</span>*/}
        {/*</div>*/}
      </div>
    </div>
  );
};

export default DeliveryMethod;
