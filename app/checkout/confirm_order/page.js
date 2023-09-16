"use client";

import React from "react";
import {
  ChosenAddress,
  DeliveryMethod,
} from "../../../components/checkout/confirm_order";
import ChosenPaymentOption from "../../../components/checkout/confirm_order/ChosenPaymentOption";
import Constructor from "../../../components/checkout/confirm_order/Constructor";
import OrderSummary from "../OrderSummary";

const ConfirmOrder = () => {
  return (
    <div className={"flex flex-col gap-y-5"}>
      {/*Delivery method*/}
      <DeliveryMethod />

      {/*  Address  */}
      <ChosenAddress />

      {/*  constructor*/}
      <Constructor />

      {/*  Payment Method  */}
      <ChosenPaymentOption />

      <OrderSummary />
    </div>
  );
};

export default ConfirmOrder;
