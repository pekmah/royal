import React, { useContext } from "react";
import Group from "../../../public/svg/Group";
import { CContext } from "../../../context/CartContext2";

const SelectDelivery = () => {
  const { setCheckout, checkout } = useContext(CContext);

  return (
    <div className={`font-barlow w-full text-left flex flex-col items-center `}>
      {/*Header*/}
      <div className="[flex-grow:1] shadow w-full rounded  bg-white relative   ">
        <div className="gap-4 flex flex-col items-center px-6 justify-center w-full border-b h-14 border-b-gray-200">
          <div className="h-[25px]  font-[600] flex justify-between items-end w-full ">
            <div className="[flex-grow:1] gap-[17px] flex justify-between items-center h-full text-black">
              <Group className="w-[17px] h-[17px] my-auto" />
              <p className="[flex-grow:1] w-[198px] text-xl h-6">
                Select type of Delivery
              </p>
            </div>
          </div>
        </div>

        <div className={"p-1 py-4 md:p-6 flex flex-col gap-y-5"}>
          {/*Door delivery*/}
          <div className="w-full  p-6 rounded border border-zinc-100 flex-col justify-start items-start gap-2.5 inline-flex">
            <div className="flex gap-x-6">
              <CheckInput
                isChecked={checkout?.del_option === "FREE_DELIVERY"}
                handleChoose={() => {
                  setCheckout((prev) => ({
                    ...prev,
                    del_option: "FREE_DELIVERY",
                  }));
                }}
              />

              <div className="w-full h-[60px] left-[40px] top-0  flex-col justify-start items-start gap-4 inline-flex">
                <div className="self-stretch  flex-col justify-start items-start gap-4 flex">
                  <div className="self-stretch justify-start items-center gap-4 inline-flex">
                    <div className="text-black text-base font-semibold">
                      Free Delivery
                    </div>
                    <div className="p-1 bg-red-600 bg-opacity-20 rounded justify-start items-start gap-2.5 flex">
                      <div className="text-red-600 text-base font-medium">
                        Free
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch">
                    <span className="text-zinc-800 text-sm font-medium">
                      Free for regions without security fee.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*    fast express delivery  */}
          <div className="w-full p-6 rounded border border-zinc-100 flex-col justify-start items-start gap-2.5 inline-flex">
            <div className="flex gap-x-6">
              <CheckInput
                isChecked={checkout?.del_option === "EXPRESS_DELIVERY"}
                handleChoose={() => {
                  setCheckout((prev) => ({
                    ...prev,
                    del_option: "EXPRESS_DELIVERY",
                  }));
                }}
              />

              <div className=" h-full flex-col justify-start items-start gap-4 inline-flex">
                <div className="self-stretch h-full flex-col justify-start items-start gap-4 flex">
                  <div className="self-stretch justify-start items-center gap-4 inline-flex">
                    <div className="text-black text-base font-semibold">
                      Fast express delivery
                    </div>
                  </div>
                  <div className="flex-col justify-start items-start gap-2 flex">
                    <div className=" text-zinc-800 text-sm font-medium">
                      Receive your order as soon as possible
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*    Own Collection   */}
          <div className="w-full  p-6 rounded border border-zinc-100 flex-col justify-start items-start gap-2.5 inline-flex">
            <div className="  flex gap-x-6">
              <CheckInput
                isChecked={checkout?.del_option === "OWN_COLLECTION"}
                handleChoose={() => {
                  setCheckout((prev) => ({
                    ...prev,
                    del_option: "OWN_COLLECTION",
                  }));
                }}
              />

              <div className="  left-[40px]  flex-col justify-start items-start gap-4 inline-flex">
                <div className="self-stretch  flex-col justify-start items-start gap-4 flex">
                  <div className="self-stretch justify-start items-center gap-4 inline-flex">
                    <div className="text-black text-base font-semibold">
                      Own Collection (Pick from Factory)
                    </div>
                  </div>
                  <div className="flex-col justify-start items-start gap-2 flex">
                    <div className=" text-zinc-800 text-sm font-medium">
                      Collect your order at a depot
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectDelivery;

export const RadioButton = ({ isChecked, handleCheck, value }) => (
  <div class="flex items-center mb-4 cursor-pointer">
    <input
      id="default-radio-1"
      type="radio"
      name="default-radio"
      className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300  dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
      onChange={handleCheck}
    />
  </div>
);

export const CheckInput = ({ disabled, handleChoose, isChecked }) => (
  <button
    type={"button"}
    className={
      "h-4 w-4 border-2 border-blue flex rounded-full items-center justify-center"
    }
    disabled={disabled}
    onClick={handleChoose}
  >
    {isChecked && <div className={"h-2 w-2 rounded-full bg-blue"} />}
  </button>
);
