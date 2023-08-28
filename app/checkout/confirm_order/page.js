"use client";

import React from "react";
import {
  ChosenAddress,
  DeliveryMethod,
} from "../../../components/checkout/confirm_order";
import ChosenPaymentOption from "../../../components/checkout/confirm_order/ChosenPaymentOption";

const ConfirmOrder = () => {

  return (
    <div className={"flex flex-col gap-y-5"}>
      {/*Delivery method*/}
      <DeliveryMethod />

      {/*  Address  */}
      <ChosenAddress />

      {/*  Payment Method  */}
      <ChosenPaymentOption />
    </div>
  );
};

export default ConfirmOrder;
