import React, { useContext } from "react";
import FaFilePdfO from "../../../public/svg/FaFilePdfO";
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

            <div className="text-[#DC2A25] gap-2.5 flex justify-center items-center">
              <FaFilePdfO className="w-[18px] h-5" />
              <p className="w-[101px] text-base underline">Delivery Guide</p>
            </div>
          </div>
        </div>

        <div className={"p-6 flex flex-col gap-y-5"}>
          {/*Door delivery*/}
          <div className="w-full  p-6 rounded border border-zinc-100 flex-col justify-start items-start gap-2.5 inline-flex">
            <div className="flex gap-x-6">
              <RadioButton
                value={checkout?.del_option === "FREE_DELIVERY"}
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
                      Door delivery
                    </div>
                    <div className="p-1 bg-red-600 bg-opacity-20 rounded justify-start items-start gap-2.5 flex">
                      <div className="text-red-600 text-base font-medium">
                        Free
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch">
                    <span className="text-zinc-800 text-sm font-medium">
                      Free for regions without security fee. Delivery between{" "}
                    </span>
                    <span className="text-zinc-800 text-sm font-semibold">
                      Jun 30
                    </span>
                    <span className="text-zinc-800 text-sm font-medium">
                      {" "}
                      and{" "}
                    </span>
                    <span className="text-zinc-800 text-sm font-semibold">
                      Jun 24.{" "}
                    </span>
                    <span className="text-zinc-800 text-sm font-medium">
                      See
                    </span>
                    <span className="text-zinc-800 text-sm font-semibold">
                      {" "}
                    </span>
                    <span className="text-red-600 text-sm font-semibold underline">
                      Delivery Guide
                    </span>
                    <span className="text-zinc-800 text-sm font-semibold">
                      .
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*    fast express delivery  */}
          <div className="w-full p-6 rounded border border-zinc-100 flex-col justify-start items-start gap-2.5 inline-flex">
            <div className="flex gap-x-6">
              <RadioButton
                value={checkout?.del_option === "EXPRESS_DELIVERY"}
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
                    <div className="">
                      <span className="text-zinc-800 text-sm font-medium">
                        Affordable rate that depends on the destination county.
                        See{" "}
                      </span>
                      <span className="text-red-600 text-sm font-semibold underline">
                        Delivery Guide
                      </span>
                      <span className="text-zinc-800 text-sm font-medium">
                        {" "}
                        for approximate prices.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*    Own Collection   */}
          <div className="w-full  p-6 rounded border border-zinc-100 flex-col justify-start items-start gap-2.5 inline-flex">
            <div className="  flex gap-x-6">
              <RadioButton
                value={checkout?.del_option === "OWN_COLLECTION"}
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
                    <div className="">
                      <span className="text-zinc-800 text-sm font-medium">
                        Quote will be ready between{" "}
                      </span>
                      <span className="text-zinc-800 text-sm font-semibold">
                        Jun 17
                      </span>
                      <span className="text-zinc-800 text-sm font-medium">
                        {" "}
                        and{" "}
                      </span>
                      <span className="text-zinc-800 text-sm font-semibold">
                        Jun 24
                      </span>
                    </div>
                    <div className=" text-zinc-800 text-sm font-medium">
                      Location: Depot at Machakos, Mlolongo - Along Mombasa Rd
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*  Footer   */}
        {/*<div className={"flex px-6 py-5 gap-x-6 border-t border-gray-200"}>*/}
        {/*  <button className="w-32 h-11 p-2.5 rounded border border-red-600 justify-center items-center gap-2.5 inline-flex">*/}
        {/*    <div className=" text-red-600 text-base font-bold">Cancel</div>*/}
        {/*  </button>*/}
        {/*  <div className="w-32 h-11 p-2.5 bg-red-600 rounded justify-center items-center gap-2.5 inline-flex">*/}
        {/*    <div className=" text-white text-base font-bold">Save</div>*/}
        {/*  </div>*/}
        {/*</div>*/}
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
      value={value}
    />
  </div>
);
