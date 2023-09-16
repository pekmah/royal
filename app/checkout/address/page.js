"use client";

import React from "react";
import {
  AddressForm,
  FundiForm,
  PaymentForm,
  SelectDelivery,
} from "../../../components/checkout/address";

const Address = () => {
  return (
    <div className={"flex flex-col gap-y-8 w-[100vw]"}>
      {/*choose deliver*/}
      <SelectDelivery />

      {/*  enter address  */}
      <AddressForm />

      {/*  Fundi  */}
      <FundiForm />

      {/*    Payment   */}
      <PaymentForm />
    </div>
  );
};

export default Address;
