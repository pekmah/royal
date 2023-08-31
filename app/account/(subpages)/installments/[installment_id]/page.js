"use client";

import React, { useMemo } from "react";
import useCustomQuery from "../../../../../hooks/useCustomQuery";
import { Paths } from "../../../../../services/AxiosUtility";
import FloatingLoader from "../../../../../components/FloatingLoader";
import { installments } from "../../../../../components/checkout/address/InstallmentPayment";

const Page = ({ params }) => {
  const { isLoading, data: res } = useCustomQuery(
    Paths.singleOrder + params?.installment_id + "/",
  );

  console.log("SINGLE INSTALLMENT: ", res);
  const paidInstallments = res?.data?.payment_records?.filter(
    (item) => item?.payment_status?.toLowerCase() === "success",
  );

  const unpaidInstallments = res?.data?.payment_records?.filter(
    (item) => item?.payment_status?.toLowerCase() !== "success",
  );

  const currentPendingInstallment = res?.data?.payment_records?.filter(
    (item) => item?.payment_status?.toLowerCase() !== "success",
  )[0];
  const itemIndex = res?.data?.payment_records?.findIndex(
    (i) => i?.id === currentPendingInstallment?.id,
  );

  const calculations = useMemo(() => {
    const totalPaid = paidInstallments?.reduce(function (prev, cur) {
      return prev + Math.ceil(parseFloat(cur.amount));
    }, 0);

    const totalPending = unpaidInstallments?.reduce(function (prev, cur) {
      return prev + Math.ceil(parseFloat(cur.amount));
    }, 0);

    return {
      paid: totalPaid,
      balance: totalPending,
    };
  }, [paidInstallments, unpaidInstallments]);

  return (
    <div className={"py-3 relative"}>
      <div className="gap-4 flex flex-col items-center px-6 justify-center w-full border-b h-14 border-b-gray-200">
        <div className="h-[25px]  font-[600] flex justify-between items-end w-full ">
          <div className="[flex-grow:1] gap-[17px] flex justify-between items-center h-full text-black">
            <p className="[flex-grow:1] w-[198px] text-xl h-6">Installments</p>
          </div>
        </div>
      </div>

      <div className={"p-6 flex flex-col gap-y-6 font-barlow"}>
        <div className={"flex flex-row justify-between"}>
          <span className={"font-semibold "}>Your Installment Plan</span>
          <span className={"text-gray-700"}>
            {
              installments?.find(
                (item) => item?.type === res?.data?.payment_plan,
              )?.title
            }
          </span>
        </div>
        <div className={"flex flex-row justify-between"}>
          <span className={"font-semibold "}>Model of Payment</span>
          <span className={"text-gray-700"}>
            Pay Ksh {res?.data?.payment_records?.at(0)?.amount} for{" "}
            {res?.data?.payment_records?.length} month(s)
          </span>
        </div>
        {res?.data?.payment_records?.map((item, ind) => {
          if (item?.payment_status.toLowerCase() === "success") {
            return (
              <div
                key={item?.id}
                className="flex justify-between py-5 px-2 border rounded border-zinc-300"
              >
                <span className={"text-black font-[500]"}>
                  {ind + 1}
                  <sup>{indexList[ind + 1]}</sup> Installment
                </span>
                <span className={"text-[#15CF74] font-medium flex gap-x-3"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M10.243 16.314L6 12.07L7.414 10.656L10.243 13.484L15.899 7.82703L17.314 9.24203L10.243 16.312V16.314Z"
                      fill="#15CF74"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1 12C1 5.925 5.925 1 12 1C18.075 1 23 5.925 23 12C23 18.075 18.075 23 12 23C5.925 23 1 18.075 1 12ZM12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12C21 14.3869 20.0518 16.6761 18.364 18.364C16.6761 20.0518 14.3869 21 12 21Z"
                      fill="#15CF74"
                    />
                  </svg>
                  Fully Paid
                </span>
              </div>
            );
          } else return null;
        })}
        <div className="w-full rounded border border-zinc-300">
          <div className="gap-4 flex flex-col items-center px-3 justify-center w-full border-b h-14 border-b-gray-200">
            <div className="h-[25px]  font-[600] flex justify-between items-end w-full ">
              <div className="[flex-grow:1] gap-[17px] flex justify-between items-center h-full text-black">
                <p className="[flex-grow:1] text-base h-6">
                  {(itemIndex ?? 0) + 1}
                  <sup>{indexList[(itemIndex ?? 0) + 1]}</sup> Installment
                </p>
              </div>

              <div>
                <span className={"text-red-500 font-[500]"}>Due in 2 days</span>
              </div>
            </div>
          </div>

          <div className={"p-5 flex flex-col gap-y-2"}>
            {paidInstallments?.map((item, ind) => (
              <div key={item?.id} className={"flex justify-between "}>
                <div>
                  {ind + 1}
                  {indexList[ind + 1]} Installment
                </div>

                <div>
                  <span className={""}>ksh. {item?.amount}</span>
                </div>
              </div>
            ))}
          </div>

          <div
            className={
              "p-5 flex justify-between border-t border-zinc-300 text-lg font-[600]"
            }
          >
            <span className={""}>Installment Balance</span>
            <span className={""}>Ksh.{calculations?.balance}</span>
          </div>

          <div
            className={
              "px-5 py-6 flex justify-end border-t border-zinc-300 text-lg font-[500]"
            }
          >
            <button
              className={` h-12 px-6 py-2.5 rounded justify-center items-center gap-2.5 inline-flex bg-none border border-red-600 text-red-600`}
            >
              <div className=" text-base ">Make Payment</div>
            </button>
          </div>
        </div>
      </div>

      <div className={" flex flex-col font-barlow border border-zinc-300 mx-5"}>
        <div
          className={
            "flex flex-row justify-between p-4 border-b border-zinc-300"
          }
        >
          <span className={"font-semibold "}>Payment Method</span>
        </div>

        <div className={"flex flex-row justify-between p-5"}>
          <span className={"font-semibold "}>Mpesa</span>
        </div>
      </div>

      {isLoading && <FloatingLoader message={"Loading Installment . . ."} />}
    </div>
  );
};

export default Page;
const indexList = {
  1: "st",
  2: "nd",
  3: "rd",
  4: "th",
  5: "th",
  6: "th",
  7: "th",
  8: "th",
  9: "th",
  10: "th",
  11: "th",
  12: "th",
};
