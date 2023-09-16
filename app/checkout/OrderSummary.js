"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import CardSvg from "../../public/svg/Card";
import { CContext } from "../../context/CartContext2";
import { usePathname, useRouter } from "next/navigation";
import cartServices from "../../services/CartServices";
import { useMutation } from "react-query";
import { useCustomToast } from "../../hooks/useToast";
import useError from "../../hooks/useError";
import FloatingLoader from "../../components/FloatingLoader";
import Helpers from "../../utils/helpers";
import AsyncStorageService from "../../services/AsyncStorageService";

const OrderSummary = ({ className }) => {
  const { cart, setCart, checkout } = useContext(CContext);
  const path = usePathname();
  const handleError = useError();
  const { showSuccessToast } = useCustomToast();
  const [orderId, setOrderId] = useState({});
  const router = useRouter();

  const subTotal = useMemo(() => {
    return cart?.reduce((acc, val) => {
      const currentPricing = val?.product?.pricing
        ?.filter((prod) => prod?.id === val?.pricing)
        ?.at(0);

      // Extract the relevant numeric values from val
      const quantity = val?.quantity;
      const length = parseFloat(val?.measurements?.length) || 0;
      const price = parseFloat(currentPricing?.price) || 0;

      // Calculate single item amount based on pricing and properties
      const singleItemAmount = currentPricing?.gauge_size
        ? price * length * quantity
        : price * quantity;

      // Accumulate the single item amount in the accumulator
      return acc + singleItemAmount;
    }, 0);
  }, [cart]);

  const vat = (Math.ceil(parseInt(subTotal)) * 16) / 100;
  const total = subTotal + vat;

  const paymentMutation = useMutation(
    async (data) => {
      return await cartServices.makePayment(data?.body);
    },
    {
      onSuccess: (res, { order }) => {
        showSuccessToast("Payment Initiated.");

        router.push(`/checkout/payment?order_id=${order?.id}&index=${0}`);
      },
    },
  );

  const mutation = useMutation((data) => cartServices.createOrder(data), {
    onSuccess: async (order) => {
      showSuccessToast("Order Created.");
      setOrderId(order?.order);
      await AsyncStorageService.removeData("_cart");
      setCart([]);
      //
      const paymentObj =
        order?.order?.payment_plan === "FULL_PAYMENT"
          ? { order_id: order?.order?.id }
          : { payment_record: order?.order?.payment_records?.at(0)?.id };

      paymentMutation.mutate({
        body: {
          phone_number: Helpers?.getPhoneNumber(checkout?.payment?.phone),
          ...paymentObj,
        },
        order: order?.order,
      });
      // router.push("/checkout/address");
    },
  });

  //     useMutation((data) => cartServices.createOrder(data), {
  //   onSuccess: (res) => {
  //     showSuccessToast("Cart Saved.");
  //
  //     // router.push("/checkout/address");
  //   },
  //
  // });
  console.log("FUNDI", checkout?.fundi);
  const handleProceed = async () => {
    const delivery =
      checkout?.del_option === "OWN_COLLECTION"
        ? { pickup_center_id: checkout?.location?.pickupPoint?.id }
        : { delivery_location: checkout?.location?.chosenLocation.loc?.id };
    const constructor = checkout?.fundi?.id
      ? {
          fundi_id: checkout?.fundi?.id,
        }
      : {
          fundi_name: checkout?.fundi?.fName
            ? checkout?.fundi?.fName + checkout?.fundi?.lName || ""
            : "",
          fundi_contact: checkout?.fundi?.phone || "",
        };

    mutation.mutate({
      cart_id: checkout?.cartId,
      payment_plan: checkout?.payment?.type,
      order_type: checkout?.del_option,
      ...delivery,
      ...constructor,
    });

    // // call the initiate payment endpoint
    // if (order?.order?.id) {
    //   setMode("payment");
    //
    //   // initiate payment
    //
    //   const paymentObj =
    //     order?.order?.payment_plan === "FULL_PAYMENT"
    //       ? { order_id: order?.order?.id }
    //       : { payment_record: order?.order?.payment_records?.at(0)?.id };
    //
    //   await makePayment(
    //     {
    //       phone_number: Helper?.getPhoneNumber(checkout?.payment?.phone),
    //       ...paymentObj,
    //     },
    //     order?.order?.id,
    //   );
    //   setMode("");
    // } else {
    //   showToast("Order not created.", "error");
    // }
  };

  useEffect(() => {
    if (mutation?.isError) {
      handleError(mutation.error);
    } else if (paymentMutation.isError) {
      handleError(paymentMutation.error);
    }
  }, [
    mutation.error,
    mutation?.isError,
    paymentMutation.error,
    paymentMutation.isError,
  ]);
  if (!checkout?.isCheckingOut) {
    return;
  }

  return (
    <div className={"w-full md:w-30% "}>
      <div className={" top-5 relative"}>
        <div
          className={`font-barlow pb-6 drop-shadow-lg flex flex-col items-center box-shadow:0px_0px_0px_1px_rgba(243,_243,_243,_1)_inset] [box-shadow-width:1px] [flex-grow:1] bg-white ${className}`}
        >
          <div className="  pt-14 relative  flex justify-center text-left w-full ">
            <p className="left-[15px] font-[600] tracking-[-0.02em]  top-4 absolute text-xl leading-6 text-black h-6">
              Order Summary
            </p>
            <div className="text-[#333333] gap-2  flex flex-col items-center h-full w-full">
              <div className="w-full h-[0] outline outline-1 outline-[#F3F3F3]" />
              {cart?.map((c) => (
                <div
                  key={c?.pricing}
                  className="[flex-grow:1] w-full bg-white gap-4 flex flex-col items-start px-4 pr-8 py-2"
                >
                  <p className=" font-[500] tracking-[-0.02em] text-base leading-6">
                    {c?.product?.name}
                  </p>
                  <div className="justify-between font-[400] flex items-start w-full">
                    <p className="tracking-[-0.02em]  text-sm leading-6">
                      {c?.quantity} Units
                    </p>
                    <p className="tracking-[-0.02em]  text-sm leading-6">
                      Total Cost: Ksh {Math.ceil(c?.total_price)}
                    </p>
                  </div>
                </div>
              ))}

              <div className="w-full h-[0] outline outline-1 outline-gray-200" />
            </div>
          </div>
          <div className=" gap-6 flex flex-col items-center">
            <div className=" flex gap-6 flex-col justify-center items-start w-full ">
              <div className="gap-6 flex flex-col items-center w-full ">
                <div className="gap-4 flex flex-col items-start px-1 w-full">
                  <div className="w-full justify-between flex items-start">
                    <p className="font-[400] tracking-[-0.02em] text-[#00000099]  text-base leading-6 text-left">
                      Sub-total
                    </p>
                    <p className="font-[500] tracking-[-0.02em] text-[#333333]  text-base leading-6 text-right">
                      Ksh. {Math.ceil(subTotal)}
                    </p>
                  </div>
                  <div className=" flex items-start w-full justify-between">
                    <p className="font-[400] tracking-[-0.02em] text-[#00000099]  text-base leading-6 text-left">
                      VAT (%)
                    </p>
                    <p className="font-[500] tracking-[-0.02em] text-[#333333]  text-base leading-6 text-right">
                      Ksh. {Math.ceil(vat)}
                    </p>
                  </div>
                </div>
                <div className=" outline outline-1 outline-[#F3F3F3] origin-center h-px" />
              </div>
              <div className=" flex w-full justify-between items-start text-black px-5">
                <p className="font-[500] tracking-[-0.02em]  text-base leading-6 text-left">
                  Total
                </p>
                <p className="font-[700] tracking-[-0.02em]  text-base leading-6 text-right">
                  Ksh. {Math.ceil(total)}
                </p>
              </div>
            </div>
            <div className=" font-[400] text-left leading-none relative px-5">
              <p className="text-[#888888] text-sm inline">
                {"By proceeding to pay it means you have agreed to "}
                <br />
              </p>
              <p className="text-[#888888] text-sm inline">Royal Mabati’s</p>
              <p className="text-[#DC2A25] text-sm underline inline">
                Terms and Conditions
              </p>
              <p className="text-[#888888] text-sm inline">.</p>
            </div>
          </div>
        </div>
        {path?.endsWith("/confirm_order") && (
          <button
            onClick={handleProceed}
            className="w-full flex h-[59px] bg-[#DC2A25] font-[700] gap-2.5 justify-center items-center mt-14 rounded p-2.5 text-white text-left"
          >
            <CardSvg className="w-[25px] h-[25px]" />
            <p className=" h-5 text-base">Proceed to pay</p>
          </button>
        )}
        {(paymentMutation?.isLoading || mutation?.isLoading) && (
          <FloatingLoader
            message={
              mutation.isLoading
                ? "Creating order . . ."
                : "Initializing payment"
            }
          />
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
