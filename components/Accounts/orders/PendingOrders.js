import React from "react";
import OrderItem from "./OrderItem";
import useCustomQuery from "../../../hooks/useCustomQuery";
import { Paths } from "../../../services/AxiosUtility";
import Image from "next/image";
import empty from "../../../public/empty.png";
import FloatingLoader from "../../FloatingLoader";

const PendingOrders = ({ orders }) => {
  const { isLoading, data: res } = useCustomQuery(Paths.openOrdersUrl);

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
          {res?.data?.results?.map((ord, ind) => (
            <OrderItem key={ind} order={ord} />
          ))}
        </>
      )}

      {isLoading && <FloatingLoader message={"Fetching orders"} />}
    </div>
  );
};

export default PendingOrders;
