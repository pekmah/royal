import React from "react";
import FilterSvg from "../../../public/svg/FilterSvg";

const OrderFilters = () => {
  return (
    <div
      className={
        "px-4 py-3 w-full border border-gray-100 rounded-sm flex gap-x-5"
      }
    >
      <button>
        <FilterSvg />
      </button>

      <DateFilter label={"Start Date"} />
      <DateFilter label={"End Date"} />
    </div>
  );
};

export default OrderFilters;
const DateFilter = ({ label }) => (
  <div
    className={
      "flex gap-x-1 relative h-10 rounded-lg border border-gray-300  items-center px-3 cursor-pointer"
    }
  >
    {/*  input  */}
    <input
      className={"w-32 h-full focus:outline-none text-gray-500"}
      type={"date"}
    />
    {/*    icon  */}
    {/*<CalendarSvg />*/}

    <div
      className={
        "bg-white p-1 absolute z-20 -top-3 left-2 text-xs font-[500] px-2 text-gray-400"
      }
    >
      {" "}
      {label}
    </div>
  </div>
);
