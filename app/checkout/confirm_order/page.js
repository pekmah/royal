"use client";

import React from "react";
import {
  ChosenAddress,
  DeliveryMethod,
} from "../../../components/checkout/confirm_order";

const ConfirmOrder = () => {
  return (
    <div className={"flex flex-col gap-y-5"}>
      {/*Delivery method*/}
      <DeliveryMethod />

      {/*  Address  */}
      <ChosenAddress />

      {/*    Payment Method  */}
    </div>
  );
};

export default ConfirmOrder;
