import React, { useContext } from "react";
import { CContext } from "../../../context/CartContext2";

const FullPayment = () => {
  const { setCheckout, checkout } = useContext(CContext);

  return (
    <div className="gap-4 flex flex-col justify-center p-6  w-full border-b border-b-gray-200 font-barlow">
      <h6 className={"text-lg font-barlow font-medium"}>
        Pick a Payment Option
      </h6>
    </div>
  );
};

export default FullPayment;
