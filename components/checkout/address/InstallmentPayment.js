import React from "react";
import { RadioButton } from "./SelectDelivery";
import Image from "next/image";
import Mpesa from "@/public/mpesa.png";

const InstallmentPayment = () => {
  return (
    <div className="flex flex-col justify-center  w-full border-b font-barlow">
      <h6 className={"text-lg font-barlow font-medium mx-6 my-5"}>
        Choose installment plan
      </h6>

      <div className="w-full px-5 flex flex-col gap-y-4 pb-4">
        {/*    installments  */}
        {installments?.map(({ title, duration }) => (
          <div
            key={duration}
            className="p-6 w-full bg-neutral-50 rounded border border-zinc-100 justify-start items-start gap-2.5 flex gap-x-4"
          >
            <div className={"my-1"}>
              <RadioButton />
            </div>

            <div className=" left-[40px] flex-col justify-start items-start gap-4 inline-flex">
              <div className="self-stretch  flex-col justify-start items-start gap-4 flex">
                <div className="w-full justify-start items-center gap-4 inline-flex">
                  <div className="text-black text-base font-medium">
                    {title}
                  </div>
                </div>
                <div className="self-stretch text-zinc-800 text-sm font-medium">
                  Pay Ksh. 1,200 for {duration} months
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/*choose payment option*/}
      <div className="gap-4 flex flex-col justify-center p-6  w-full border-t border-b-gray-200 font-barlow">
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
    </div>
  );
};

export default InstallmentPayment;

const installments = [
  {
    duration: 3,
    title: "3 Month Plan",
    type: "3_MONTHS",
  },
  {
    duration: 6,
    title: "6 Month Plan",
    type: "6_MONTHS",
  },
  {
    duration: 9,
    title: "9 Month Plan",
    type: "9_MONTHS",
  },
  {
    duration: 12,
    title: "12 Month Plan",
    type: "12_MONTHS",
  },
];