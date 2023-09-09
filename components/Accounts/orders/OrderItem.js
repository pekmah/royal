import React from "react";
import moment from "moment";
import OrderNoWrapper from "./OrderNoWrapper";
import CopySvg from "../../../public/svg/Copy";
import { CopyToClipboard } from "react-copy-to-clipboard/src";
import { useRouter } from "next/navigation";
import { useCustomToast } from "../../../hooks/useToast";

const OrderItem = ({ order, type }) => {
  let currentProduct = order?.order_items?.at(0)?.items?.at(0)?.product;
  const router = useRouter();
  const { showSuccessToast } = useCustomToast();

  return (
    <div
      className={"border border-slate-200 py-2 px-3 flex gap-x-5 rounded-lg"}
    >
      <div
        alt={order?.image}
        className={
          "h-40 w-56 rounded-md bg-[#2C36990A] flex items-center justify-center"
        }
      >
        <svg
          width="50"
          height="50"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.2725 2.62497L23.1 8.45247M9.24004 13.3991H18.76M9.24004 20.4575H18.76M9.24004 16.9283H18.76M6.03754 2.62497C5.7332 2.63258 5.4439 2.75885 5.23137 2.97683C5.01885 3.1948 4.89994 3.48721 4.90004 3.79164V24.2666C4.89994 24.5711 5.01885 24.8635 5.23137 25.0815C5.4439 25.2994 5.7332 25.4257 6.03754 25.4333H21.9625C22.272 25.4333 22.5687 25.3104 22.7875 25.0916C23.0063 24.8728 23.1292 24.5761 23.1292 24.2666V8.45247H18.4625C18.1582 8.44486 17.8689 8.3186 17.6564 8.10062C17.4438 7.88265 17.3249 7.59024 17.325 7.28581V2.61914L6.03754 2.62497Z"
            stroke="#2C3699"
            strokeWidth="1.27273"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

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
          {moment(order?.created_at).format("DD MMM YYYY")}
        </h5>
      </div>

      <div className={"self-end flex justify-end"}>
        <button
          onClick={() =>
            router.push("account/orders/" + order?.id + "?type=" + type)
          }
          className="w-[150px] h-11 p-2.5 rounded border border-red-600 justify-center items-center gap-2.5 inline-flex"
        >
          <div className="text-red-600 text-sm font-[600]">See Details</div>
        </button>
      </div>
    </div>
  );
};

export default OrderItem;
