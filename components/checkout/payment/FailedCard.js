import React from "react";
import FailedPayment from "../../../public/svg/FailedPayment";
import Group from "../../../public/svg/Group";

const FailedCard = () => {
  return (
    <div className={"flex flex-col justify-center items-center font-barlow"}>
      <div className="gap-4 flex flex-col items-center px-6 justify-center w-full border-b h-14 border-b-gray-200">
        <div className="  font-[600] flex justify-between items-end w-full ">
          <div className="[flex-grow:1] gap-[17px] flex justify-between items-center h-full text-black">
            <Group className="my-auto h-6" />
            <p className="[flex-grow:1] text-[19px] h-6">Payment Failed</p>
          </div>
        </div>
      </div>

      <div className={"p-6 flex flex-col items-center"}>
        <div>
          <FailedPayment />
        </div>

        <h6 className={"font-[600] my-3"}>Payment Unsuccessful</h6>
        <p className={"md:w-3/5 text-center"}>
          Your transaction was not completed. Try entering your PIN when the
          prompt pops up on your phone. Request prompt to retry the transaction.
        </p>
      </div>
    </div>
  );
};

export default FailedCard;
