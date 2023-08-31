"use client";

import React, { useMemo } from "react";
import useCustomQuery from "../../../../../hooks/useCustomQuery";
import { Paths } from "../../../../../services/AxiosUtility";
import FloatingLoader from "../../../../../components/FloatingLoader";
import { installments } from "../../../../../components/checkout/address/InstallmentPayment";
import moment from "moment";

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
            Pay Ksh <strong>{res?.data?.payment_records?.at(0)?.amount}</strong>{" "}
            for {res?.data?.payment_records?.length} month(s)
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
                  <span className={"px-3 text-gray-500 font-[400]"}>
                    Paid on{" "}
                    {moment(item?.expected_date)?.format("Do MMMM YYYY")}
                  </span>
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
                  <span className={"px-3 text-gray-500 font-[400]"}>
                    Expected at{" "}
                    {moment(currentPendingInstallment?.expected_date)?.format(
                      "Do MMMM YYYY",
                    )}
                  </span>
                </p>
              </div>

              <div>
                {moment().diff(
                  currentPendingInstallment?.expected_date,
                  "days",
                ) > -5 ? (
                  <span className={"text-red-500 font-[500]"}>
                    Due{" "}
                    {Math.abs(
                      moment().diff(
                        currentPendingInstallment?.expected_date,
                        "days",
                      ),
                    )}
                  </span>
                ) : moment().diff(
                    currentPendingInstallment?.expected_date,
                    "days",
                  ) > 0 ? (
                  <div className={"flex items-center gap-x-3"}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M9 5V11L14.2 14.1L15 12.9L10.5 10.2V5H9ZM18 10V16H20V10H18ZM18 18V20H20V18H18ZM16 18C14.3 19.3 12.3 20 10 20C4.5 20 0 15.5 0 10C0 4.5 4.5 0 10 0C14.8 0 18.9 3.4 19.8 8H17.7C16.8 4.6 13.7 2 10 2C5.6 2 2 5.6 2 10C2 14.4 5.6 18 10 18C12.4 18 14.5 16.9 16 15.3V18Z"
                        fill="#DC2A25"
                      />
                    </svg>

                    <span className={"mr-1 text-primary_red"}>Overdue</span>
                  </div>
                ) : null}
              </div>
            </div>
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

        {res?.data?.payment_records
          ?.slice(itemIndex + 1, res?.data?.payment_records?.length)
          ?.map((item, ind) => (
            <div className="w-full rounded border border-zinc-300">
              <div
                key={item?.id}
                className="gap-4 flex flex-col items-center px-3 justify-center w-full h-14 "
              >
                <div className="h-[25px]  font-[600] flex justify-between items-end w-full ">
                  <div className="[flex-grow:1] gap-[17px] flex justify-between items-center h-full text-black">
                    <p className="[flex-grow:1] text-base h-6">
                      {(paidInstallments?.length ?? 0) + 2 + ind}
                      <sup>
                        {indexList[(paidInstallments?.length ?? 0) + 2 + ind]}
                      </sup>{" "}
                      Installment
                      <span className={"px-3 text-gray-500 font-[400]"}>
                        Expected at{" "}
                        {moment(item?.expected_date)?.format("Do MMMM YYYY")}
                      </span>
                    </p>
                  </div>

                  <div>
                    <span className={"font-[500]"}>
                      Due in{" "}
                      {Math.abs(moment().diff(item?.expected_date, "days"))}{" "}
                      days
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
