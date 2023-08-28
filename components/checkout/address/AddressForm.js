import React, { useContext, useState } from "react";
import Group from "../../../public/svg/Group";
import useCustomQuery from "../../../hooks/useCustomQuery";
import { Paths } from "../../../services/AxiosUtility";
import validator from "../../../utils/Validators";
import useError from "../../../hooks/useError";
import { useMutation } from "react-query";
import checkoutServices from "../../../services/CheckoutServices";
import { CContext } from "../../../context/CartContext2";
import { useCustomToast } from "../../../hooks/useToast";
import { CheckInput } from "./SelectDelivery";
import FloatingLoader from "../../FloatingLoader";
import KenyaFlagSvg from "../../../public/svg/KenyaFlag";
import LandMarkSvg from "../../../public/svg/LandMark";
import MapMarkerSvg from "../../../public/svg/MapMarker";

const AddressForm = () => {
  const { setCheckout, checkout } = useContext(CContext);
  const { isLoading, data: res } = useCustomQuery(Paths.countiesUrl);
  const { isLoading: fetchingLocations, data: locRes } = useCustomQuery(
    Paths.userLocationsUrl,
  );
  const { isLoading: fetchingCenters, data: pickupCenters } = useCustomQuery(
    Paths.pickupCentersUrl,
  );
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
      onSuccess: (res) => {
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
              )?.phone,
              loc: res,
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
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [chosenIndex, setChosenIndex] = useState(null);

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

      {checkout?.del_option === "OWN_COLLECTION" ? (
        <div className={"p-5"}>
          <div className="w-[48%] h-[69px] rounded border border-zinc-300 flex gap-x-3 items-center px-5 bg-white">
            <div className={"flex-shrink-0"}>
              <MapMarkerSvg />
            </div>

            <select
              required
              className={
                "flex-1 h-full focus:outline-none placeholder-gray-700 font-barlow font-[500] bg-white"
              }
              placeholder={"Pickup Centre"}
              onChange={(e) => {
                setCheckout((prev) => ({
                  ...prev,
                  location: {
                    ...prev?.location,
                    pickupPoint: pickupCenters?.data?.results?.find(
                      (item) =>
                        parseInt(item?.id) === parseInt(e?.target?.value),
                    ),
                  },
                }));
              }}
            >
              <option>Select Pickup center</option>
              {(pickupCenters?.data?.results || [])?.map((item) => (
                <option key={item?.id} value={item?.id}>
                  {item?.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : (
        <div className={"bg-white flex-1"}>
          <div className={" p-6 grid grid-cols-2 gap-10 place-items-center"}>
            {locRes?.data?.results?.map((item, l) => (
              <LocationItem
                key={l}
                title={item.region?.region}
                desc={item?.instructions}
                phone={"+254" + item?.delivery_phone_number}
                handleChoose={() => {
                  setCheckout((prev) => ({
                    ...prev,
                    location: {
                      ...prev?.location,
                      // loc: [...prev?.location?.loc, locRes?.data],
                      chosenLocation: {
                        region: item?.region,
                        instructions: item?.instructions,
                        delivery_phone_number: item?.delivery_phone_number,
                        loc: item,
                      },
                      phone: item?.delivery_phone_number,
                      // chosenLocation: locRes?.data,
                      // phone: locRes?.data?.delivery_phone_number,
                    },
                  }));
                }}
                isChecked={
                  checkout?.location?.chosenLocation?.loc?.id === item?.id
                }
              />
            ))}
          </div>

          {showCreateForm && (
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
                      "flex-1 h-full focus:outline-none placeholder-gray-700 font-barlow font-[500] bg-white"
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
                <div className=" h-[69px] rounded border border-zinc-300 flex gap-x-3 items-center px-5 bg-white">
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
                      setState((prev) => ({
                        ...prev,
                        landmark: e.target.value,
                      }))
                    }
                  />
                </div>

                {/*  Landmark input  */}
                <div className="w-full h-[69px] rounded border border-zinc-300 flex gap-x-3 items-center px-5 bg-white">
                  <div className={"flex-shrink-0"}>
                    <KenyaFlagSvg />
                  </div>

                  {/*Pretext*/}
                  <span className={"text-black font-[600] font-barlow"}>
                    +254
                  </span>
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
              {(isLoading ||
                fetchingLocations ||
                fetchingCenters ||
                mutation.isLoading) && (
                <FloatingLoader
                  message={
                    mutation?.isLoading
                      ? "Saving Address . . ."
                      : "Fetching locations"
                  }
                />
              )}
            </div>
          )}

          <div
            className={
              "flex-row justify-end pb-3 pt-2 w-full bg-white items-center pr-5 mb-10"
            }
          >
            <button
              className={
                "flex-row items-center font-barlow text-primary_red float-right"
              }
              type={"button"}
              onClick={() => {
                setShowCreateForm(!showCreateForm);
                setCheckout((prev) => ({
                  ...prev,
                  location: {
                    ...prev?.location,
                    chosenLocation: {},
                    phone: "",
                  },
                }));
              }}
            >
              <span className={"text-2xl text-primary-red mr-1 font-semibold"}>
                +
              </span>
              <span
                className={
                  "text-primary-red font-barlow-semibold text-lg font-semibold"
                }
              >
                Create New Location
              </span>
            </button>
          </div>
        </div>
      )}

      {/*  Footer   */}
      <div className={"flex px-6 py-5 gap-x-6 border-t border-gray-200"}>
        <button className="w-32 h-11 p-2.5 rounded border border-red-600 justify-center items-center gap-2.5 inline-flex">
          <div className=" text-red-600 text-base font-bold">Cancel</div>
        </button>
        <button
          disabled={
            !checkout?.location?.chosenLocation?.region?.id || !showCreateForm
          }
          type={"submit"}
          className={`w-32 h-11 p-2.5 bg-red-600 rounded justify-center items-center gap-2.5 inline-flex ${
            (!checkout?.location?.chosenLocation?.region?.id ||
              !showCreateForm) &&
            "opacity-70 cursor-no-drop"
          }`}
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

const LocationItem = ({ title, desc, phone, handleChoose, isChecked }) => (
  <div className="w-80 h-[100px] relative">
    <div className="w-80 h-full left-0 top-0 absolute bg-violet-50 rounded border border-indigo-800" />
    <div className={"absolute top-5 left-2"}>
      <CheckInput isChecked={isChecked} handleChoose={handleChoose} />
    </div>
    <div className="left-[36px] top-[15px] absolute text-indigo-800 text-base font-semibold">
      {title}
    </div>
    <div className=" left-[36px] top-[39px] absolute text-indigo-800 text-sm font-normal">
      {desc}
    </div>
    <div className=" left-[36px] top-[61px] absolute text-indigo-800 text-sm font-normal">
      {phone}
    </div>
    <div className=" h-[15px] left-[14px] top-[17px] absolute" />
  </div>
);

{
  /*  body*/
}
