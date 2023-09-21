import React from "react";
import Check from "../../../public/svg/Check";
import SuccessPayment from "../../../public/svg/SuccessPayment";

const SuccessfulCard = () => {
  return (
    <div className={"flex flex-col justify-center items-center font-barlow"}>
      <div className="gap-4 flex flex-col items-center px-6 justify-center w-full border-b h-14 border-b-gray-200">
        <div className="  font-[600] flex justify-between items-end w-full ">
          <div className="[flex-grow:1] gap-[17px] flex justify-between items-center h-full text-black">
            <Check className="my-auto h-6" />
            <p className="[flex-grow:1] text-[19px] h-6">Payment Successful</p>
          </div>
        </div>
      </div>

      <div className={"p-6 flex flex-col items-center"}>
        <div>
          <SuccessPayment />
        </div>

        <h6 className={"font-[600] my-3"}>Payment Successful</h6>
        <p className={"md:w-3/5 text-center"}>
          Your payment transaction has been processed. Your order will be
          processed and shipped within 5 business days. Thank you.
        </p>
      </div>
    </div>
  );
};

export default SuccessfulCard;
