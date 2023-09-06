"use client";

import React, { useEffect, useState } from "react";
import { ChosenPaymentOption } from "../../../components/checkout/confirm_order";
import FailedCard from "../../../components/checkout/payment/FailedCard";
import { ProcessingCard } from "../../../components/checkout/payment";
import SuccessfulCard from "../../../components/checkout/payment/SuccessfulCard";
import { useSearchParams } from "next/navigation";
import useCustomQuery from "../../../hooks/useCustomQuery";
import { Paths } from "../../../services/AxiosUtility";
import FloatingLoader from "../../../components/FloatingLoader";
import { useCustomToast } from "../../../hooks/useToast";

const Page = () => {
  const [status, setStatus] = useState(1); //0-failed 1-processing 2-success
  const index = useSearchParams().get("index");
  const order_id = useSearchParams().get("order_id");
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const {
    isLoading,
    data: res,
    refetch,
    isRefetching,
  } = useCustomQuery(Paths.orderUrl + "/" + order_id);

  useEffect(() => {
    const checkTransactionStatus = () => {
      const currentPayment = res?.data?.payment_records?.at(index);

      if (currentPayment?.message) {
        // returns 0-success, 1 - error

        // check if transaction was successful
        if (currentPayment?.payment_status?.toLowerCase() === "success") {
          setStatus(2);
          showSuccessToast("Transaction successful.");
        } else if (currentPayment?.payment_status?.toLowerCase() === "failed") {
          setStatus(0);
          showErrorToast("Transaction failed.");
        }
        // not successful
        else {
          // error response
          setStatus(1);
        }
      } else {
        setStatus(1);
      }
    };
    checkTransactionStatus();
  }, [res?.data]);

  return (
    <div className={"flex flex-col gap-y-5 relative"}>
      <div className="w-full font-barlow bg-white shadow ">
        {/*loader & text*/}
        {status === 1 || isLoading ? (
          <ProcessingCard />
        ) : status === 2 ? (
          <SuccessfulCard />
        ) : (
          <FailedCard />
        )}

        <div
          className={
            "flex justify-end px-6 py-5 gap-x-6 border-t border-gray-200"
          }
        >
          <button
            className="w-32 h-11 p-2.5 bg-red-600 rounded justify-center items-center gap-2.5 inline-flex"
            onClick={() => refetch()}
          >
            <div className=" text-white text-base font-bold">I have paid</div>
          </button>
        </div>
      </div>

      <ChosenPaymentOption />

      {(isLoading || isRefetching) && (
        <FloatingLoader message={"Verifying transaction . . ."} />
      )}
    </div>
  );
};

export default Page;
