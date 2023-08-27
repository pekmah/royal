import React, { useContext, useState } from "react";
import Group from "../../../public/svg/Group";
import MapMarkerSvg from "../../../public/svg/MapMarker";
import LandMarkSvg from "../../../public/svg/LandMark";
import KenyaFlagSvg from "../../../public/svg/KenyaFlag";
import useCustomQuery from "../../../hooks/useCustomQuery";
import { Paths } from "../../../services/AxiosUtility";
import validator from "../../../utils/Validators";
import useError from "../../../hooks/useError";
import { useMutation } from "react-query";
import checkoutServices from "../../../services/CheckoutServices";
import { CContext } from "../../../context/CartContext2";
import FloatingLoader from "../../FloatingLoader";
import { useCustomToast } from "../../../hooks/useToast";

const AddressForm = () => {
  const { setCheckout } = useContext(CContext);
  const { isLoading, data: res, refetch } = useCustomQuery(Paths.countiesUrl);
  const handleError = useError();
  const { showSuccessToast } = useCustomToast();
  const mutation = useMutation(
    (data) =>
      checkoutServices.saveCheckoutLocation({
        region: state?.county,
        instructions: state?.landmark,
        delivery_phone_number: state?.deliveryPhoneNumber,
      }),
    {
      onSuccess: async (res) => {
        showSuccessToast("Location Saved.");

        setCheckout((prev) => ({
          ...prev,
          location: {
            ...prev?.location,
            // loc: [...prev?.location?.loc, locRes?.data],
            chosenLocation: {
              region: state?.county,
              instructions: state?.landmark,
              delivery_phone_number: validator?.validatePhoneNumber(
                state?.deliveryPhoneNumber?.toString(),
              ),
              loc: res?.data,
            },
            phone: validator?.validatePhoneNumber(
              state?.deliveryPhoneNumber?.toString(),
            ),
            // chosenLocation: locRes?.data,
            // phone: locRes?.data?.delivery_phone_number,
          },
        }));
      },
      onError: (e) => handleError(e),
    },
  );

  const [state, setState] = useState({
    county: null,
    landmark: "",
    deliveryPhoneNumber: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const res = validator?.validatePhoneNumber(
      state?.deliveryPhoneNumber?.toString(),
    );

    if (!res?.valid) {
      return handleError(res?.error);
    }
    if (!state?.county) {
      handleError("County required!");
    }

    mutation.mutate();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white rounded shadow relative"
    >
      {/*  Header */}
      <div className="gap-4 flex flex-col items-center px-6 justify-center w-full border-b h-14 border-b-gray-200">
        <div className="h-[25px]  font-[600] flex justify-between items-end w-full ">
          <div className="[flex-grow:1] gap-[17px] flex justify-between items-center h-full text-black">
            <Group className=" h-[17px] my-auto" />
            <p className="[flex-grow:1] text-xl h-6 font-barlow">
              Confirm Your Address
            </p>
          </div>
        </div>
      </div>

      {/*  body*/}
      <div className={"p-8"}>
        <div className="w-full h-[214px] rounded border border-zinc-100 p-5 flex flex-wrap gap-y-4 justify-between">
          {/*County input*/}
          <div className="w-[48%] h-[69px] rounded border border-zinc-300 flex gap-x-3 items-center px-5 bg-white">
            <div className={"flex-shrink-0"}>
              <MapMarkerSvg />
            </div>

            <select
              required
              className={
                "flex-1 h-full focus:outline-none placeholder-gray-700 font-barlow font-[500]"
              }
              placeholder={"Select County"}
              value={state?.county || ""}
              onChange={(e) =>
                setState((prev) => ({ ...prev, county: e.target.value }))
              }
            >
              <option>Select County</option>
              {res?.data?.results?.map((item) => (
                <option key={item?.id} value={item?.id}>
                  {item?.region}
                </option>
              ))}
            </select>
          </div>

          {/*  Landmark input  */}
          <div className="w-[48%] h-[69px] rounded border border-zinc-300 flex gap-x-3 items-center px-5 bg-white">
            <div className={"flex-shrink-0"}>
              <LandMarkSvg />
            </div>

            <input
              required
              className={
                "flex-1 h-full focus:outline-none placeholder-gray-700 font-barlow font-[500]"
              }
              placeholder={"Enter Landmark"}
              value={state.landmark}
              onChange={(e) =>
                setState((prev) => ({ ...prev, landmark: e.target.value }))
              }
            />
          </div>

          {/*  Landmark input  */}
          <div className="w-full h-[69px] rounded border border-zinc-300 flex gap-x-3 items-center px-5 bg-white">
            <div className={"flex-shrink-0"}>
              <KenyaFlagSvg />
            </div>

            {/*Pretext*/}
            <span className={"text-black font-[600] font-barlow"}>+254</span>
            <input
              required
              className={
                "flex-1 h-full focus:outline-none placeholder-gray-700 font-barlow font-[500]"
              }
              placeholder={"712345678"}
              value={state.deliveryPhoneNumber}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  deliveryPhoneNumber: e.target.value,
                }))
              }
            />
          </div>
        </div>

        {(isLoading || mutation.isLoading) && (
          <FloatingLoader message={"Saving Address . . ."} />
        )}
      </div>

      {/*  Footer   */}
      <div className={"flex px-6 py-5 gap-x-6 border-t border-gray-200"}>
        <button className="w-32 h-11 p-2.5 rounded border border-red-600 justify-center items-center gap-2.5 inline-flex">
          <div className=" text-red-600 text-base font-bold">Cancel</div>
        </button>
        <button
          type={"submit"}
          className="w-32 h-11 p-2.5 bg-red-600 rounded justify-center items-center gap-2.5 inline-flex"
        >
          <div className=" text-white text-base font-bold">Save</div>
        </button>
      </div>
    </form>
  );
};

export default AddressForm;

const CInput = () => (
  <div className=" h-[69px] rounded border border-zinc-300 flex gap-x-3"></div>
);
