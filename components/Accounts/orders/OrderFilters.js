import React from "react";
import FilterSvg from "../../../public/svg/FilterSvg";

const OrderFilters = ({ setDate, date, reset }) => {
  return (
    <div
      className={
        "px-4 py-3 w-full border border-gray-100 rounded-sm flex gap-x-5"
      }
    >
      <button onClick={reset}>
        <FilterSvg />
      </button>

      <DateFilter
        label={"Start Date"}
        value={date?.start}
        onChange={(e) =>
          setDate((prev) => ({ ...prev, start: e.target.value }))
        }
      />
      <DateFilter
        label={"End Date"}
        value={date?.end}
        onChange={(e) => setDate((prev) => ({ ...prev, end: e.target.value }))}
      />
    </div>
  );
};

export default OrderFilters;
const DateFilter = ({ label, ...rest }) => (
  <div
    className={
      "flex gap-x-1 relative h-10 rounded-lg border border-gray-300  items-center px-3 cursor-pointer"
    }
  >
    {/*  input  */}
    <input
      className={"w-32 h-full focus:outline-none text-gray-500"}
      type={"date"}
      {...rest}
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
