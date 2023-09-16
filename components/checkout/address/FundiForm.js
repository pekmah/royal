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

const FundiForm = () => {
  const { setCheckout, checkout } = useContext(CContext);
  const { isLoading, data: res } = useCustomQuery(Paths.expertsUrl);
  console.log("Fundi", res);
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
            <p className="[flex-grow:1] text-xl h-6 font-barlow flex items-center gap-x-2">
              Construction Expert{"  "}
              <span className={"text-[13px] font-[500] text-primary_red"}>
                (optional)
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className={"bg-white flex-1"}>
        <div className={" p-6 grid grid-cols-2 gap-10 place-items-center"}>
          {res?.data?.map((item, l) => (
            <FundiItem
              key={l}
              title={item.name}
              phone={item?.contact}
              handleChoose={() => {
                setCheckout((prev) => ({
                  ...prev,
                  fundi: {
                    id: item?.id,
                    fName: item?.name?.split(" ")?.at(0),
                    lName: item?.name?.split(" ")?.at(1),
                    phone: item?.contact,
                  },
                }));
              }}
              isChecked={checkout?.fundi?.id === item?.id}
            />
          ))}
        </div>
      </div>

      <div className={"bg-white flex-1"}>
        {showCreateForm && (
          <div className={"p-8"}>
            <div className="w-full h-[214px] rounded border border-zinc-100 p-5 flex flex-wrap gap-y-4 justify-between">
              <CInput
                label={"First Name"}
                placeholder={"First Name"}
                value={checkout.fundi?.fName}
                handleChange={(e) =>
                  setCheckout((prev) => ({
                    ...prev,
                    fundi: {
                      ...prev?.fundi,
                      fName: e.target.value,
                    },
                  }))
                }
              />
              <CInput
                label={"Last Name"}
                placeholder={"Last Name"}
                value={checkout.fundi?.lName}
                handleChange={(e) =>
                  setCheckout((prev) => ({
                    ...prev,
                    fundi: {
                      ...prev?.fundi,
                      lName: e.target.value,
                    },
                  }))
                }
              />

              {/*  fundi phonenumber  */}
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
                  value={checkout.fundi?.phone}
                  onChange={(e) =>
                    setCheckout((prev) => ({
                      ...prev,
                      fundi: {
                        ...prev?.fundi,
                        phone: e.target.value,
                      },
                    }))
                  }
                />
              </div>
            </div>
            {(isLoading || mutation.isLoading) && (
              <FloatingLoader
                message={
                  mutation?.isLoading
                    ? "Saving Address . . ."
                    : "Fetching constructors"
                }
              />
            )}
          </div>
        )}
      </div>

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
            Create New
          </span>
        </button>
      </div>

      {/*  Footer   */}
      {state?.county && state?.landmark && state?.deliveryPhoneNumber && (
        <div className={"flex px-6 py-5 gap-x-6 border-t border-gray-200"}>
          <button className="w-32 h-11 p-2.5 rounded border border-red-600 justify-center items-center gap-2.5 inline-flex">
            <div className=" text-red-600 text-base font-bold">Cancel</div>
          </button>
          <button
            disabled={
              !state?.county ||
              !state?.landmark ||
              !state?.deliveryPhoneNumber ||
              !showCreateForm
            }
            type={"submit"}
            className={`w-32 h-11 p-2.5 bg-red-600 rounded justify-center items-center gap-2.5 inline-flex ${
              (!state?.county ||
                !state?.landmark ||
                !state?.deliveryPhoneNumber ||
                !showCreateForm) &&
              "opacity-70 cursor-no-drop"
            }`}
          >
            <div className=" text-white text-base font-bold">Save</div>
          </button>
        </div>
      )}
    </form>
  );
};

export default FundiForm;

const CInput = ({ label, placeholder, value, handleChange }) => (
  <div className={" w-[48%]"}>
    <label className={"font-barlow mb-1 font-[600]"}>{label}</label>
    <br />
    <div className="w-full h-[69px] rounded border border-zinc-300 flex gap-x-3 items-center px-5 bg-white">
      <input
        required
        className={
          "flex-1 h-full focus:outline-none placeholder-gray-500 font-barlow font-[500]"
        }
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  </div>
);

const FundiItem = ({ title, desc, phone, handleChoose, isChecked }) => (
  <div className="w-80 h-[100px] relative">
    <div className="w-80 h-full left-0 top-0 absolute bg-violet-50 rounded border border-indigo-800" />
    <div className={"absolute top-5 left-2"}>
      <CheckInput isChecked={isChecked} handleChoose={handleChoose} />
    </div>
    <div className="left-[36px] top-[15px] absolute text-indigo-800 text-base font-semibold">
      {title}
    </div>

    <div className=" left-[36px] top-[61px] absolute text-indigo-800 text-sm font-normal">
      {phone}
    </div>
    <div className=" h-[15px] left-[14px] top-[17px] absolute" />
  </div>
);
