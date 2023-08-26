import React, { useState } from "react";
import Group from "../../../public/svg/Group";
import FullPayment from "./FullPayment";
import InstallmentPayment from "./InstallmentPayment";
import { useRouter } from "next/navigation";

const PaymentForm = () => {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("full"); //Payment methods: full/installments
  return (
    <div className="w-full bg-white rounded shadow">
      {/*  Header */}
      <div className="gap-4 flex flex-col items-center px-6 justify-center w-full border-b h-14 border-b-gray-200">
        <div className="h-[25px]  font-[600] flex justify-between items-end w-full ">
          <div className="[flex-grow:1] gap-[17px] flex justify-between items-center h-full text-black">
            <Group className=" h-[17px] my-auto" />
            <p className="[flex-grow:1] text-xl h-6 font-barlow">
              Confirm Your Address
            </p>
          </div>
        </div>
      </div>

      {/*    Payment*/}
      <div className="gap-4 flex items-center p-6  w-full border-b border-b-gray-200 font-barlow">
        <button
          className={` h-12 px-6 py-2.5 rounded justify-center items-center gap-2.5 inline-flex ${
            paymentMethod === "full"
              ? "bg-red-600 text-white" + ""
              : "bg-none border border-red-600 text-red-600"
          }`}
          onClick={() => {
            setPaymentMethod("full");
          }}
        >
          <div className=" text-base ">Pay Full Amount</div>
        </button>

        <button
          className={` h-12 px-6 py-2.5 rounded justify-center items-center gap-2.5 inline-flex ${
            paymentMethod === "installments"
              ? "bg-red-600 text-white" + ""
              : "bg-none border border-red-600 text-red-600"
          }`}
          onClick={() => {
            setPaymentMethod("installments");
          }}
        >
          <div className=" text-base ">Pay In Installments</div>
        </button>
      </div>

      {/*    Payment option select*/}
      {paymentMethod === "full" ? <FullPayment /> : <InstallmentPayment />}

      {/*  Footer   */}
      <div className={"flex px-6 py-5 gap-x-6 border-0 border-gray-200"}>
        <button className="w-32 h-11 p-2.5 rounded border border-red-600 justify-center items-center gap-2.5 inline-flex">
          <div className=" text-red-600 text-base font-bold">Cancel</div>
        </button>
        <button
          className="w-32 h-11 p-2.5 bg-red-600 rounded justify-center items-center gap-2.5 inline-flex"
          onClick={() => router.push("/checkout/confirm_order")}
        >
          <div className=" text-white text-base font-bold">Save</div>
        </button>
      </div>
    </div>
  );
};

export default PaymentForm;
