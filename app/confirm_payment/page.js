"use client";
import React, { useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Group from "../../public/svg/Group";
import Mpesa from "../../public/mpesa.png";
import { CheckInput } from "../../components/checkout/address/SelectDelivery";
import { CContext } from "../../context/CartContext2";
import { useMutation } from "react-query";
import cartServices from "../../services/CartServices";
import { useCustomToast } from "../../hooks/useToast";
import Helpers from "../../utils/helpers";
import FloatingLoader from "../../components/FloatingLoader";

const ConfirmPayment = () => {
  const router = useRouter();
  const { setCheckout, checkout } = useContext(CContext);
  const { showSuccessToast } = useCustomToast();
  const orderId = useSearchParams().get("orderId");
  const pricing = useSearchParams().get("pricing");
  const paymentIndex = useSearchParams().get("index");
  console.log(pricing);

  const paymentMutation = useMutation(
    async (data) => {
      return await cartServices.makePayment(data?.body);
    },
    {
      onSuccess: (res, { order }) => {
        showSuccessToast("Payment Initiated.");

        router.push(
          `/checkout/payment?order_id=${order?.id}&index=${paymentIndex}`,
        );
      },
    },
  );

  return (
    <div className="w-full bg-white rounded shadow relative">
      {/*  Header */}
      <div className="gap-4 flex flex-col items-center px-6 justify-center w-full border-b h-14 border-b-gray-200">
        <div className="h-[25px]  font-[600] flex justify-between items-end w-full ">
          <div className="[flex-grow:1] gap-[17px] flex justify-between items-center h-full text-black">
            <Group className=" h-[17px] my-auto" />
            <p className="[flex-grow:1] text-xl h-6 font-barlow">
              Payment Option
            </p>
          </div>
        </div>
      </div>

      {/*choose payment option*/}
      <div className="gap-4 flex flex-col justify-center p-6  w-full border-t border-b-gray-200 font-barlow">
        <h6 className={"text-lg font-barlow font-medium"}>
          Pick a Payment Option
        </h6>

        <div className="w-full mt-2 rounded border border-zinc-100 p-5">
          <div className={"flex gap-x-3 items-center"}>
            <div className={"my-auto flex items-center mt-2"}>
              <CheckInput isChecked={true} />
            </div>

            <h6 className={"text-lg font-barlow font-medium"}>Mobile Money</h6>
          </div>

          <div className={"py-6"}>
            {/*  Landmark input  */}
            <div className="w-full h-[69px] rounded border border-zinc-200 flex items-center px-5 bg-white">
              <div className={"flex-shrink-0"}>
                <Image
                  className={"h-12 object-contain"}
                  src={Mpesa}
                  alt={"mpesa"}
                />
              </div>

              {/*Pretext*/}
              <span className={"text-black font-[600]  mr-3 font-barlow"}>
                +254
              </span>
              <input
                className={
                  "flex-1 h-full focus:outline-none  placeholder-gray-500 font-barlow font-[500]"
                }
                placeholder={"712334455"}
                onChange={(e) =>
                  setCheckout((prev) => ({
                    ...prev,
                    payment: {
                      ...prev?.payment,
                      phone: e.target.value,
                    },
                  }))
                }
                value={checkout?.payment?.phone}
              />
            </div>
          </div>
        </div>
      </div>

      {/*  Footer   */}
      <div className={"flex px-6 py-5 gap-x-6 border-0 border-gray-200"}>
        <button className="w-32 h-11 p-2.5 rounded border border-red-600 justify-center items-center gap-2.5 inline-flex">
          <div className=" text-red-600 text-base font-bold">Cancel</div>
        </button>
        <button
          disabled={!checkout?.payment?.phone}
          className={`w-32 h-11 p-2.5 bg-red-600 rounded justify-center items-center gap-2.5 inline-flex ${
            !checkout?.payment?.phone && "opacity-70 cursor-no-drop"
          }`}
          onClick={() => {
            const paymentObj = pricing
              ? { payment_record: pricing }
              : { order_id: order?.order?.id };

            paymentMutation.mutate({
              body: {
                phone_number: Helpers?.getPhoneNumber(checkout?.payment?.phone),
                ...paymentObj,
              },
              order: { id: orderId },
            });
          }}
        >
          <div className=" text-white text-base font-bold">Continue</div>
        </button>
      </div>

      {paymentMutation.isLoading && (
        <FloatingLoader message={"Making payment . . . "} />
      )}
    </div>
  );
};

export default ConfirmPayment;
