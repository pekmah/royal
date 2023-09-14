import React, { useContext } from "react";
import Check from "../../../public/svg/Check";
import EditSvg from "../../../public/svg/Edit";
import { CContext } from "../../../context/CartContext2";
import { useRouter } from "next/navigation";

const Constructor = ({ paymentMethod = "full" }) => {
  const { checkout } = useContext(CContext);
  const router = useRouter();

  return (
    <div className="w-full font-barlow py-3 bg-white shadow">
      <div className="gap-4 flex flex-col items-center px-6 justify-center w-full border-b h-14 border-b-gray-200">
        <div className="  font-[600] flex justify-between items-end w-full ">
          <div className="[flex-grow:1] gap-[17px] flex justify-between items-center h-full text-black">
            <Check className="my-auto" />
            <p className="[flex-grow:1] text-[19px] h-6">Construction Expert</p>
          </div>

          <button
            className="text-[#DC2A25] gap-2.5 flex justify-center items-center "
            onClick={() => {
              router.push("/checkout/address");
            }}
          >
            <EditSvg />

            <span className={"text-base font-[500]"}>Edit</span>
          </button>
        </div>
      </div>

      <div className="gap-4  p-6  w-full border-b border-b-gray-200 font-barlow">
        <h4 className={"font-[600]"}>
          {checkout?.fundi?.fName} {checkout?.fundi?.lName}
        </h4>
        <h6 className={"text-sm mt-2"}> {checkout?.fundi?.phone}</h6>
      </div>
    </div>
  );
};

export default Constructor;
