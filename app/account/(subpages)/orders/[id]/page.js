"use client";

import React from "react";
import { useRouter } from "next/navigation";
import useCustomQuery from "../../../../../hooks/useCustomQuery";
import { Paths } from "../../../../../services/AxiosUtility";
import FloatingLoader from "../../../../../components/FloatingLoader";
import { installments } from "../../../../../components/checkout/address/InstallmentPayment";

const Page = ({ params }) => {
  const { isLoading, data: res } = useCustomQuery(
    Paths.singleOrder + params?.id + "/",
  );

  const router = useRouter();
  console.log(states[res?.data?.order_status]);

  // const
  return (
    <div className={"relative pb-10"}>
      <div className={"relative w-full"}>
        <div className={"px-5 p-3.5 flex gap-x-6 border-b border-gray-300 "}>
          <h5 className={"text-xl font-semibold flex"}>
            {states[res?.data?.order_status]} /{" "}
            <div
              className={
                "p-0.5 border border-zinc-200 ml-2 text-sm rounded text-gray-800 px-1 font-[500]"
              }
            >
              {res?.data?.order_code}
            </div>
          </h5>
        </div>

        <div className={"m-4 p-4 border border-gray-200 font-barlow"}>
          <div className={"text-lg font-[600]"}>
            Order Items({res?.data?.order_items?.items?.length})
          </div>

          {res?.data?.order_items?.at(0)?.items?.map((item) => (
            <div
              key={item?.id}
              className={"flex gap-x-3 p-2 border border-zinc-200 mb-3"}
            >
              <img
                className={"h-40 w-56 object-cover"}
                src={item?.product?.thumbnails?.at(0)?.image}
                alt={item?.product?.thumbnails?.at(0)?.image}
              />

              <div className={" flex flex-col gap-y-3"}>
                <h6 className={"text-lg font-[500]"}>{item?.product?.name}</h6>
                {item?.pricing?.gauge_size && (
                  <div className={"flex gap-x-5 "}>
                    <div className={"gap-x-3 flex items-center"}>
                      <span>Finish: </span>

                      <div
                        className={
                          "border border-zinc-200 flex gap-2 p-1 gap-x-3 items-center"
                        }
                      >
                        <div
                          className={`h-5 w-5 rounded-full`}
                          style={{ backgroundColor: item?.color }}
                        />

                        <span className={"text-sm"}>
                          {item?.pricing?.finish}
                        </span>
                      </div>
                    </div>

                    <div className={"gap-x-3 flex items-center"}>
                      <span>Gauge: </span>

                      <div
                        className={
                          "border border-zinc-200 flex gap-2 p-1 gap-x-3 items-center"
                        }
                      >
                        <span className={"text-sm"}>
                          {item?.length} X {item?.pricing?.width}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className={"gap-x-3 flex items-center"}>
                  <span>Cost: </span>

                  <span className={"text-sm"}>{item?.pricing?.price}</span>
                </div>

                <div className={"gap-x-3 flex items-center"}>
                  <span>Quantity: </span>

                  <span className={"text-sm"}>{item?.quantity} unit (s)</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className={"flex gap-x-3 flex-col border border-zinc-200 mb-3 mx-4"}
        >
          <div className={"p-3 border-b border-slate-200 font-semibold "}>
            Order Bill
          </div>

          <div className={" p-3 font-barlow text-gray-500 "}>
            <div className={"flex flex-1 justify-between"}>
              <span>Subtotal: </span>
              <span>Ksh. {res?.data?.balance} </span>
            </div>

            <div className={"flex flex-1 justify-between my-3"}>
              <span>Vat%: </span>
              <span>Ksh. {Math.ceil(res?.data?.vat)} </span>
            </div>
          </div>
          <div
            className={
              "border-t border-zinc-200 flex flex-1 justify-between py-3 font-[600] text-gray-900 font-barlow px-3"
            }
          >
            <span>TOTAL: </span>
            <span>Ksh. {res?.data?.grand_total_price} </span>
          </div>
        </div>

        <div
          className={"flex gap-x-3 flex-col border border-zinc-200 mb-3 mx-4"}
        >
          <div className={"p-3 border-b border-slate-200 font-semibold  "}>
            Delivery Address
          </div>

          <div className={"font-barlow text-gray-500 px-3"}>
            {paymentPlans[res?.data?.order_type]}
          </div>

          {res?.data?.order_type === "OWN_COLLECTION" ? (
            <div className={" p-3 font-barlow text-gray-500 "}>
              <div className={"flex flex-1 justify-between"}>
                <span>Pickup Center: </span>
                <div>
                  <h6>{res?.data?.pickup_center?.name}</h6>
                  <p className={"text-sm"}>{res?.data?.pickup_center?.desc}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className={" p-3 font-barlow text-gray-500 "}>
              <div className={"flex flex-1 justify-between"}>
                <span>SubCounty: </span>
                <span> {res?.data?.delivery_cost?.region} </span>
              </div>

              <div className={"flex flex-1 justify-between my-3"}>
                <span>Instructions: </span>
                <span> {res?.data?.location?.instructions} </span>
              </div>

              <div className={"flex flex-1 justify-between my-3"}>
                <span>Phone No: </span>
                <span> +254{res?.data?.location?.delivery_phone_number} </span>
              </div>
            </div>
          )}
        </div>

        <div
          className={"flex gap-x-3 flex-col border border-zinc-200 mb-3 mx-4"}
        >
          <div className={"p-3 border-b border-slate-200 font-semibold  "}>
            Payment Method
          </div>

          <div className={" p-3 font-barlow text-gray-500 "}>
            <div className={"flex flex-1 justify-between"}>
              {res?.data?.payment_plan === "FULL_PAYMENT" ? (
                <span>Full Payment: </span>
              ) : (
                <span>
                  {
                    installments?.find(
                      (item) => item?.type === res?.data?.payment_plan,
                    )?.title
                  }{" "}
                </span>
              )}
              <div>
                <h6>MPesa</h6>
              </div>
            </div>
          </div>
        </div>
        {isLoading && <FloatingLoader message={"Fetching order"} />}
      </div>
    </div>
  );
};

export default Page;

const paymentPlans = {
  OWN_COLLECTION: "Own Collection",
  FREE_DELIVERY: "Free Delivery",
  EXPRESS_DELIVERY: "Express Delivery",
};

const states = {
  FULLY_PAID: "Closed Orders",
  FAILED: "Closed Orders",
  SUCCESS: "Closed Orders",
  ADMIN_CANCELLED: "Closed Orders",
  NEWLY_SUBMITTED: "Pending Orders",
  PARTIALLY_PAID: "Pending Orders",
};
