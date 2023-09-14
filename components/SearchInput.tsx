"use client";
import { useSearchContext } from "@/context/SearchContext";
import { BiSearch } from "react-icons/bi";

export default function SearchInput() {
  const { setSearchQuery, handleSearch } = useSearchContext();

  return (
    <div className="hidden md:flex w-full gap-2">
      <div className="w-full flex items-center h-14">
        <label
          htmlFor="email"
          className={`border-r-0 py-2 px-4 h-full flex rounded-md rounded-r-none bg-white border-grey`}
        >
          <BiSearch className={"my-auto"} size={"18px"} color="#000" />
        </label>

        <input
          id={"search"}
          type={"text"}
          placeholder={"Search"}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            handleSearch(e.target.value);
          }}
          className={`h-full py-2 px-2 w-full placeholder-gray-900 font-barlow font-[500] border-grey rounded rounded-l-none focus:outline-none`}
        />
      </div>
      <button className="bg-primary_red rounded text-white font-barlow  px-6 py-2 font-semibold">
        Search
      </button>
    </div>
  );
}
