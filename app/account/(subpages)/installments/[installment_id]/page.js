"use client";

import React from "react";

const Page = () => {
  return (
    <div className={"py-3"}>
      <div className="gap-4 flex flex-col items-center px-6 justify-center w-full border-b h-14 border-b-gray-200">
        <div className="h-[25px]  font-[600] flex justify-between items-end w-full ">
          <div className="[flex-grow:1] gap-[17px] flex justify-between items-center h-full text-black">
            <p className="[flex-grow:1] w-[198px] text-xl h-6">Installments</p>
          </div>
        </div>
      </div>

      <div className={"p-6 flex flex-col gap-y-4 font-barlow"}>
        <div className={"flex flex-row justify-between"}>
          <span className={"font-semibold "}>Your Installment Plan</span>
          <span className={" "}>3 Months Plan</span>
        </div>

        <div className={"flex flex-row justify-between"}>
          <span className={"font-semibold "}>Model of Payment</span>
          <span className={" "}>Pay Ksh 1,200 for 3 months</span>
        </div>

        <div className="w-full h-[317px] rounded border border-zinc-300">
          <div className="gap-4 flex flex-col items-center px-6 justify-center w-full border-b h-14 border-b-gray-200">
            <div className="h-[25px]  font-[600] flex justify-between items-end w-full ">
              <div className="[flex-grow:1] gap-[17px] flex justify-between items-center h-full text-black">
                <p className="[flex-grow:1] w-[198px] text-base h-6">
                  2nd Installment
                </p>
              </div>

              <div>
                <span className={"text-red-500 font-[500]"}>
                  {" "}
                  Due in 2 days
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
