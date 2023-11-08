"use client";
import React from "react";
import Image from "next/image";

import Media1 from "../../public/zee_tile.jpg";
import Media2 from "../../public/euro_tile.jpg";
import Media3 from "../../public/roman_long_tile.jpg";
import { useRouter } from "next/navigation";

const OurMedia = () => {
  const router = useRouter();
  return (
    <div className={"bg-white pb-10 flex  flex-col px-[5vw]"}>
      <div className={"flex"}>
        <div className={" flex flex-col"}>
          <h3 className="text-red-600 text-[22px] font-[600] tracking-wide about-h3">
            From Our Shop
          </h3>

          <div className={"h-[3px] bg-gray-200 rounded-sm mt-1 w-16 "} />
        </div>
      </div>

      <div className={"flex gap-5 md:gap-10 py-8 flex-col md:flex-row"}>
        <MediaItem
          title={"Zee Matte Tiles"}
          subtext={"Gauge 32"}
          date={"12 Aug 2023"}
          image={Media1}
          handleClick={() => router.push("products?category=7")}
        />

        <MediaItem
          title={"Roman Long Tile"}
          subtext={"Gauge 32"}
          date={"12 Aug 2023"}
          image={Media3}
          handleClick={() => router.push("products?category=4")}
        />

        <MediaItem
          title={"Euro Tile"}
          subtext={"Gauge 32"}
          date={"12 Aug 2023"}
          image={Media2}
          handleClick={() => router.push("products?category=6")}
        />
      </div>
    </div>
  );
};

export default OurMedia;
const MediaItem = ({ image, title, subtext, handleClick }) => (
  <div className={"w-full md:w-[30%] "}>
    {/*    image  */}
    <div
      className={
        "rounded-tr-[40px] rounded-bl-[40px] w-full mb-3 overflow-hidden"
      }
    >
      <Image
        src={image}
        alt={"image"}
        className={"w-full h-[200px] xl:h-[250px]"}
      />
    </div>

    <h5 className={"font-barlow font-[600] text-lg mb-1"}>{title}</h5>

    <div
      className={
        "flex gap-x-4 font-barlow items-center justify-between text-sm"
      }
    >
      <span className={"font-barlow font-[500] text-gray-500"}>{subtext}</span>

      <button
        onClick={handleClick}
        className={"text-primary_red font-[600] text-sm"}
      >
        Shop Now
      </button>
    </div>
  </div>
);
