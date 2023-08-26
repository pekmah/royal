import React from "react";
import Group from "../../../public/svg/Group";
import MapMarkerSvg from "../../../public/svg/MapMarker";
import LandMarkSvg from "../../../public/svg/LandMark";
import KenyaFlagSvg from "../../../public/svg/KenyaFlag";

const AddressForm = () => {
  return (
    <div className="w-full bg-white rounded shadow">
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
              className={
                "flex-1 h-full focus:outline-none placeholder-gray-700 font-barlow font-[500]"
              }
              placeholder={"Select County"}
            >
              <option>Select County</option>
            </select>
          </div>

          {/*  Landmark input  */}
          <div className="w-[48%] h-[69px] rounded border border-zinc-300 flex gap-x-3 items-center px-5 bg-white">
            <div className={"flex-shrink-0"}>
              <LandMarkSvg />
            </div>

            <input
              className={
                "flex-1 h-full focus:outline-none placeholder-gray-700 font-barlow font-[500]"
              }
              placeholder={"Enter Landmark"}
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
              className={
                "flex-1 h-full focus:outline-none placeholder-gray-700 font-barlow font-[500]"
              }
              placeholder={"Enter Landmark"}
            />
          </div>
        </div>
      </div>

      {/*  Footer   */}
      <div className={"flex px-6 py-5 gap-x-6 border-t border-gray-200"}>
        <button className="w-32 h-11 p-2.5 rounded border border-red-600 justify-center items-center gap-2.5 inline-flex">
          <div className=" text-red-600 text-base font-bold">Cancel</div>
        </button>
        <button className="w-32 h-11 p-2.5 bg-red-600 rounded justify-center items-center gap-2.5 inline-flex">
          <div className=" text-white text-base font-bold">Save</div>
        </button>
      </div>
    </div>
  );
};

export default AddressForm;

const CInput = () => (
  <div className=" h-[69px] rounded border border-zinc-300 flex gap-x-3"></div>
);
