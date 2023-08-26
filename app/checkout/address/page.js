"use client";

import React from "react";
import {
  AddressForm,
  PaymentForm,
  SelectDelivery,
} from "../../../components/checkout/address";

const Address = () => {
  return (
    <div className={"flex flex-col gap-y-8"}>
      {/*choose deliver*/}
      <SelectDelivery />

      {/*  enter address  */}
      <AddressForm />

      {/*    Payment   */}
      <PaymentForm />
    </div>
  );
};

export default Address;
