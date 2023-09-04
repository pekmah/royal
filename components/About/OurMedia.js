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
            From Our Media
          </h3>

          <div className={"h-[3px] bg-gray-200 rounded-sm mt-1 w-16 "} />
        </div>
      </div>

      <div className={"flex gap-x-10 py-8"}>
        <MediaItem
          title={
            "Things to Consider before Starting a Mjengo. Tips From an Architect."
          }
          subtext={"RML Blogs"}
          date={"12 Aug 2023"}
          image={Media1}
        />

        <MediaItem
          title={"New House Tour in “The Salem Palace” || Episode 6, Season 4"}
          subtext={"RML Youtube"}
          date={"12 Aug 2023"}
          image={Media3}
        />

        <MediaItem
          title={
            "How to Get your Interior Design Right | Materials and Color Balance"
          }
          subtext={"RML Youtube"}
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

    <h5 className={"font-barlow font-[500] text-base mb-1"}>{title}</h5>

    <div className={"flex gap-x-4 font-barlow items-center text-sm"}>
      <span className={"font-barlow font-[500] text-gray-500"}>{subtext}</span>

      <div className={"h-2 w-2 rounded-full bg-black"} />

      <span className={"text-gray-500 font-[500] text-sm"}>{date}</span>
    </div>
  </div>
);
