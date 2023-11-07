"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Varieties = () => {
  const router = useRouter();
  return (
    <div className={"bg-white pb-10 flex flex-col "}>
      <div className={"mx-auto flex flex-col"}>
        <h3 className="text-red-600 text-2xl font-bold tracking-wide about-h3">
          Our Roofing Variety
        </h3>

        <div className={"h-[3px] bg-gray-200 rounded-sm mt-2 w-16 mx-auto"} />
      </div>

      <div
        className={
          "flex flex-col-reverse gap-4 md:gap-0 md:flex-row w-11/12 md:w-3/4 mx-auto justify-between mt-6 md:mt-12"
        }
      >
        <div className={"flex-1 font-inter"}>
          <h4 className={"font-[700] text-xl text-blue "}>Royal Roman Tile</h4>

          <p className={"leading-9 text-gray-600 font-[400] my-2 md:w-11/12"}>
            The strict implementation of state of the art manufacturing
            facilities, product testing, organized back office, thorough
            training, field supervision, research & development allows us to
            ensure the integrity of our product and the satisfaction of our
            consumers.
          </p>

          <button
            className={
              "bg-[#F3F3F3] px-4 py-2 rounded-md text-sm font-[600] text-blue mt-1"
            }
            onClick={() => router.push("/products?category=4")}
          >
            Find in Shop
          </button>
        </div>

        <div className={"flex-1 h-[280px] w-[350px] mt-8 mx-auto xl:ml-20"}>
          <div
            className={
              "h-[200px] md:h-[250px] w-[300px] md:w-[350px] relative bg-[#041ACC] shadow-lg"
            }
          >
            <Image
              src={require("../../public/varieties-1.jpg")}
              alt={"variety-1"}
              className={"h-full w-[350px] absolute -top-8 -right-8"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Varieties;
