import React from "react";
import { RadioButton } from "./SelectDelivery";
import Image from "next/image";
import Mpesa from "@/public/mpesa.png";

const FullPayment = () => {
  return (
    <div className="gap-4 flex flex-col justify-center p-6  w-full border-b border-b-gray-200 font-barlow">
      <h6 className={"text-lg font-barlow font-medium"}>
        Pick a Payment Option
      </h6>

      <div className="w-full mt-2 rounded border border-zinc-100 p-5">
        <div className={"flex gap-x-3 items-center"}>
          <div className={"my-auto flex items-center mt-2"}>
            <RadioButton />
          </div>

          <h6 className={"text-lg font-barlow font-medium"}>Mobile Money</h6>
        </div>

        <div className={"py-6"}>
          {/*  Landmark input  */}
          <div className="w-full h-[69px] rounded border border-zinc-200 flex items-center px-5 bg-white">
            <div className={"flex-shrink-0"}>
              <Image
                className={"h-12 object-contain"}
                src={Mpesa}
                alt={"mpesa"}
              />
            </div>

            {/*Pretext*/}
            <span className={"text-black font-[600]  mr-3 font-barlow"}>
              +254
            </span>
            <input
              className={
                "flex-1 h-full focus:outline-none placeholder-gray-700 font-barlow font-[500]"
              }
              placeholder={"Enter Landmark"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPayment;
