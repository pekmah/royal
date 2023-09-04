import React from "react";
import OrderItem from "./OrderItem";
import useCustomQuery from "../../../hooks/useCustomQuery";
import { Paths } from "../../../services/AxiosUtility";
import Image from "next/image";
import empty from "../../../public/empty.png";
import FloatingLoader from "../../FloatingLoader";
import moment from "moment";

const PendingOrders = ({ dates, current }) => {
  const { isLoading, data: res } = useCustomQuery(Paths.openOrdersUrl);

  const { isLoading: loadingSearch, data: searchData } = useCustomQuery(
    `${Paths.openOrdersUrl}&date_from=${moment(dates?.start).format(
      "YYYY-MM-DD",
    )}&date_to=${moment(dates?.end).format("YYYY-MM-DD") || ""}`,
    dates?.start?.trim() !== "" && dates?.end?.trim() !== "" && current === 0,
  );

  return (
    <div className={"flex flex-col gap-3 py-4 relative min-h-[124px]"}>
      {res?.data.results?.length === 0 ? (
        <div
          className={"flex-1 flex flex-col gap-y-2 justify-center items-center"}
        >
          <Image src={empty} alt={"empty"} />
          <h5 className={"font-barlow font-[500] text-gray-400 text-center"}>
            There are no pending orders yet.
            <br /> Your order might not be checked out or it is delivered.
          </h5>
        </div>
      ) : (
        <>
          {dates?.start?.trim() !== "" && dates?.end?.trim() !== ""
            ? searchData?.data?.results?.map((ord, ind) => (
                <OrderItem key={ind} order={ord} type={"pending"} />
              ))
            : res?.data?.results?.map((ord, ind) => (
                <OrderItem key={ind} order={ord} type={"pending"} />
              ))}
        </>
      )}

      {(isLoading || loadingSearch) && (
        <FloatingLoader
          message={loadingSearch ? "Filtering by date" : "Fetching orders"}
        />
      )}
    </div>
  );
};

export default PendingOrders;
