import React, { useContext } from "react";
import Check from "../../../public/svg/Check";
import EditSvg from "../../../public/svg/Edit";
import { CContext } from "../../../context/CartContext2";

const ChosenAddress = () => {
  const { checkout } = useContext(CContext);

  return (
    <div className="w-full font-barlow py-3 bg-white shadow">
      <div className="gap-4 flex flex-col items-center px-6 justify-center w-full border-b h-14 border-b-gray-200">
        <div className=" font-[600] flex justify-between items-end w-full ">
          <div className="[flex-grow:1] gap-[17px] flex justify-between items-center h-full text-black">
            <Check className="w-[17px] h-[17px] my-auto" />
            <p className="[flex-grow:1]  text-[19px] h-6">
              Confirm Your Address
            </p>
          </div>

          <div className="text-[#DC2A25] gap-2.5 flex justify-center items-center ">
            <EditSvg />

            <span className={"text-base font-[500]"}>Edit</span>
          </div>
        </div>
      </div>

      <div className=" flex-col justify-start items-start gap-4 inline-flex p-5">
        {checkout.location.pickupPoint?.id ? (
          <div className="text-black text-base font-medium">
            {checkout.location?.pickupPoint?.name}
          </div>
        ) : (
          <>
            <div className="self-stretch justify-start items-center gap-4 inline-flex">
              <div className="text-black text-base font-medium">
                {checkout.location?.chosenLocation?.loc?.region?.region}
              </div>
              <div className="w-1.5 h-1.5 bg-zinc-800 rounded-full" />
              <div className="text-black text-base font-medium">
                {checkout.location?.chosenLocation?.loc?.instructions}
              </div>
            </div>
            <div className=" text-zinc-800 text-sm font-medium">
              +254{checkout.location?.chosenLocation?.delivery_phone_number}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChosenAddress;
