"use client";
import React from "react";
import { useRouter } from "next/navigation";
import useCustomQuery from "@/hooks/useCustomQuery";
import { Paths } from "@/services/AxiosUtility";
import FloatingLoader from "@/components/FloatingLoader";

const Page = () => {
  const router = useRouter();
  const { isLoading, data: res } = useCustomQuery(Paths.installmentsUrl);

  return (
    <div className={"py-3 relative"}>
      <div className="gap-4 flex flex-col items-center px-6 justify-center w-full border-b h-14 border-b-gray-200">
        <div className="h-[25px]  font-[600] flex justify-between items-end w-full ">
          <div className="[flex-grow:1] gap-[17px] flex justify-between items-center h-full text-black">
            <p className="[flex-grow:1] w-[198px] text-xl h-6">Installments</p>
          </div>
        </div>
      </div>

      <div className={"flex flex-col p-6 gap-y-5"}>
        {/*    installments list*/}
        {res?.data?.results?.map((item) => {
          const isPending = item?.payment_records.some(
            (item) => item?.payment_status?.toLowerCase() !== "success",
          );

          return (
            <button
              key={item?.id}
              className=" rounded border border-zinc-200 px-3 py-6 flex justify-between"
              onClick={() => router.push(`account/installments/${item?.id}`)}
            >
              <h6 className={"font-[600] text-base underline"}>
                {item?.order_code}
              </h6>

              {isPending ? <PendingTag /> : <SuccessTag />}
            </button>
          );
        })}
      </div>

      {isLoading && <FloatingLoader message={"Loading Installments . . ."} />}
    </div>
  );
};

export default Page;

const installmentsList = [
  {
    name: "Order TSZKJLO8",
    status: "pending",
  },
  {
    name: "Order SGS53DF",
    status: "success",
  },
];

const SuccessTag = () => (
  <div className={"flex gap-x-5"}>
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
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

    {/*    text*/}
    <span className={"font-semibold text-emerald-500"}>Fully Paid</span>
  </div>
);

const PendingTag = () => (
  <div className="w-[82px] h-[25px] px-4 py-1 bg-amber-300 bg-opacity-20 rounded-2xl justify-center items-center gap-2.5 inline-flex">
    <div className="text-right text-yellow-500 text-sm font-medium">
      Pending
    </div>
  </div>
);
