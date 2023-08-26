"use client";

import React from "react";
import { ChosenPaymentOption } from "../../../components/checkout/confirm_order";
import FailedCard from "../../../components/checkout/payment/FailedCard";

const Page = () => {
  return (
    <div className={"flex flex-col gap-y-5"}>
      <div className="w-full font-barlow bg-white shadow ">
        {/*loader & text*/}
        {/*<ProcessingCard />*/}
        <FailedCard />
        {/*<SuccessfulCard />*/}

        <div
          className={
            "flex justify-end px-6 py-5 gap-x-6 border-t border-gray-200"
          }
        >
          <button className="w-32 h-11 p-2.5 rounded border border-red-600 justify-center items-center gap-2.5 inline-flex">
            <div className=" text-red-600 text-base font-bold">
              Cancel order
            </div>
          </button>

          <button
            className="w-32 h-11 p-2.5 bg-red-600 rounded justify-center items-center gap-2.5 inline-flex"
            onClick={() => router.push("/checkout/confirm_order")}
          >
            <div className=" text-white text-base font-bold">I have paid</div>
          </button>
        </div>
      </div>

      <ChosenPaymentOption />
    </div>
  );
};

export default Page;
