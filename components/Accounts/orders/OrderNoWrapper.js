import React from "react";

const OrderNoWrapper = ({ orderNo }) => {
  return (
    <div
      className={
        "border border-gray-200 text-primary_red font-[600] px-1 rounded text-sm"
      }
    >
      {orderNo}
    </div>
  );
};

export default OrderNoWrapper;
