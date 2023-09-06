import React from "react";
import Image from "next/image";

import Media1 from "../../public/media-1.jpg";
import Media2 from "../../public/media-2.png";
import Media3 from "../../public/media-3.png";

const OurMedia = () => {
  return (
    <div className={"bg-white pb-10 flex flex-col px-[5vw]"}>
      <div className={"flex"}>
        <div className={" flex flex-col"}>
          <h3 className="text-red-600 text-[22px] font-[600] tracking-wide about-h3">
            From Our Shop
          </h3>

          <div className={"h-[3px] bg-gray-200 rounded-sm mt-1 w-16 "} />
        </div>
      </div>

      <div className={"flex gap-x-10 py-8"}>
        <MediaItem
          title={"Zee Matte Tiles"}
          subtext={"Gauge 32"}
          date={"12 Aug 2023"}
          image={Media1}
        />

        <MediaItem
          title={"Zee Matte Tiles"}
          subtext={"Gauge 32"}
          date={"12 Aug 2023"}
          image={Media3}
        />

        <MediaItem
          title={"Zee Matte Tiles"}
          subtext={"Gauge 32"}
          date={"12 Aug 2023"}
          image={Media2}
        />
      </div>
    </div>
  );
};

export default OurMedia;
const MediaItem = ({ image, title, subtext, date }) => (
  <div className={"w-[30%]"}>
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

      <a href={"/"} className={"text-primary_red font-[600] text-sm"}>
        Shop Now
      </a>
    </div>
  </div>
);
