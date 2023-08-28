import React, { useContext } from "react";
import Check from "../../../public/svg/Check";
import EditSvg from "../../../public/svg/Edit";
import Image from "next/image";
import Mpesa from "@/public/mpesa.png";
import { CContext } from "../../../context/CartContext2";

const ChosenPaymentOption = ({ paymentMethod = "full" }) => {
  const { checkout } = useContext(CContext);

  return (
    <div className="w-full font-barlow py-3 bg-white shadow">
      <div className="gap-4 flex flex-col items-center px-6 justify-center w-full border-b h-14 border-b-gray-200">
        <div className="  font-[600] flex justify-between items-end w-full ">
          <div className="[flex-grow:1] gap-[17px] flex justify-between items-center h-full text-black">
            <Check className="my-auto" />
            <p className="[flex-grow:1] text-[19px] h-6">Payment Option</p>
          </div>

          <div className="text-[#DC2A25] gap-2.5 flex justify-center items-center ">
            <EditSvg />

            <span className={"text-base font-[500]"}>Edit</span>
          </div>
        </div>
      </div>

      <div className="gap-4 flex items-center p-6  w-full border-b border-b-gray-200 font-barlow">
        <button
          className={` h-12 px-6 py-2.5 rounded justify-center items-center gap-2.5 inline-flex ${
            paymentMethod === "full"
              ? "bg-red-600 text-white" + ""
              : "bg-none border border-red-600 text-red-600"
          }`}
        >
          <div className=" text-base capitalize">
            {checkout?.paymentType === "full"
              ? "Pay full amount"
              : "pay in installments"}
          </div>
        </button>
      </div>

      <div className={"p-5"}>
        <div className=" h-[60px] justify-start items-start gap-4 inline-flex">
          <Image className={"h-12 object-contain"} src={Mpesa} alt={"mpesa"} />
          <div className="flex-col justify-start items-start gap-2 inline-flex">
            <div className=" justify-start items-center gap-4 inline-flex">
              <div className="text-black text-base font-medium capitalize">
                {checkout?.payment?.type}
              </div>
            </div>
            <div className=" py-2 justify-start items-center gap-2 inline-flex">
              <div className="text-zinc-700 text-sm font-medium">
                {checkout?.payment?.phone}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChosenPaymentOption;
