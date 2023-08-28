import React, { useContext, useMemo } from "react";
import { CheckInput } from "./SelectDelivery";
import { CContext } from "../../../context/CartContext2";

const InstallmentPayment = () => {
  const { setCheckout, checkout, cart } = useContext(CContext);

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

  return (
    <div className="flex flex-col justify-center  w-full border-b font-barlow">
      <h6 className={"text-lg font-barlow font-medium mx-6 my-5"}>
        Choose installment plan
      </h6>

      <div className="w-full px-5 flex flex-col gap-y-4 pb-4">
        {/*    installments  */}
        {installments?.map(({ title, duration, type }) => (
          <div
            key={duration}
            className="p-6 w-full bg-neutral-50 rounded border border-zinc-100 justify-start items-start gap-2.5 flex gap-x-4"
          >
            <div className={"my-1"}>
              <CheckInput
                handleChoose={() => {
                  setCheckout((prev) => ({
                    ...prev,
                    payment: {
                      ...prev?.payment,
                      type: type,
                    },
                  }));
                }}
                isChecked={checkout?.payment?.type === type}
              />
            </div>

            <div className=" left-[40px] flex-col justify-start items-start gap-4 inline-flex">
              <div className="self-stretch  flex-col justify-start items-start gap-4 flex">
                <div className="w-full justify-start items-center gap-4 inline-flex">
                  <div className="text-black text-base font-medium">
                    {title}
                  </div>
                </div>
                <div className="self-stretch text-zinc-800 text-sm font-medium">
                  Pay Ksh. {Math.ceil(total / duration)} for {duration} months
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstallmentPayment;

const installments = [
  {
    duration: 3,
    title: "3 Month Plan",
    type: "3_MONTHS",
  },
  {
    duration: 6,
    title: "6 Month Plan",
    type: "6_MONTHS",
  },
  {
    duration: 9,
    title: "9 Month Plan",
    type: "9_MONTHS",
  },
  {
    duration: 12,
    title: "12 Month Plan",
    type: "12_MONTHS",
  },
];
