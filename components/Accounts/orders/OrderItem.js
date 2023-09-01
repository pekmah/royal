import React from "react";
import moment from "moment";
import OrderNoWrapper from "./OrderNoWrapper";
import CopySvg from "../../../public/svg/Copy";
import { CopyToClipboard } from "react-copy-to-clipboard/src";
import { ENDPOINT } from "../../../services/AxiosUtility";
import { useRouter } from "next/navigation";
import { useCustomToast } from "../../../hooks/useToast";

const OrderItem = ({ order }) => {
  let currentProduct = order?.order_items?.at(0)?.items?.at(0)?.product;
  const router = useRouter();
  const { showSuccessToast } = useCustomToast();

  return (
    <div
      className={"border border-slate-200 py-2 px-3 flex gap-x-5 rounded-md"}
    >
      <img
        src={ENDPOINT + currentProduct?.thumbnails?.at(0)?.image}
        alt={order?.image}
        className={"h-40 w-56 rounded-md"}
      />

      <div className={"flex flex-col gap-y-3 flex-1"}>
        <h5 className={"font-semibold"}>{currentProduct?.name}</h5>

        <div className={"flex gap-x-3 font-[500] text-gray-800"}>
          <span>Order No: </span>
          <div className={"flex gap-x-2"}>
            <OrderNoWrapper orderNo={order?.order_code} />

            <CopyToClipboard
              text={order?.order_code}
              onCopy={() => showSuccessToast("Copied")}
            >
              <button>
                <CopySvg />
              </button>
            </CopyToClipboard>
          </div>
        </div>

        <h5 className={"font-medium text-gray-500"}>
          Ordered on:
          {moment(order?.created_at).format("ddd mm yyyy")}
        </h5>
      </div>

      <div className={"self-end flex justify-end"}>
        <button
          onClick={() => router.push("account/orders/" + order?.id)}
          className="w-[150px] h-11 p-2.5 rounded border border-red-600 justify-center items-center gap-2.5 inline-flex"
        >
          <div className="text-red-600 text-sm font-[600]">See Details</div>
        </button>
      </div>
    </div>
  );
};

export default OrderItem;
