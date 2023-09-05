import React from "react";
import Image from "next/image";
import bgImage from "../../public/about-img.jpg";

const Carousel = () => {
  return (
    <div className={"h-[600px] bg-slate-400 w-full flex relative"}>
      <Image
        className={"h-full flex-1 object-cover bg-no-repeat"}
        src={bgImage}
        alt={"bg-image"}
      />

      <div
        className={
          "absolute bg-[#00000040] top-0 left-0 right-0 bottom-0 flex items-center px-10"
        }
      >
        <h3
          className={
            "xl:w-3/5 w-3/4 text-white font-[600] text-[32px] leading-[60px]"
          }
        >
          We do more than just roofing. We provide the guarantee of safety
        </h3>
      </div>

      <div
        className={
          "flex bg-white absolute -bottom-[70px] px-10 right-[10vw] left-[10vw] py-10 z-20 rounded-xl shadow justify-around"
        }
      >
        <div
          className={"flex flex-col items-center justify-center text-center"}
        >
          <h3 className={"font-[700] text-[28px] font-inter text-primary_red"}>
            3.5k +
          </h3>
          <h6 className={"text-lg font-inter font-[500] text-black"}>
            Houses roofed
          </h6>
        </div>

        <div
          className={"flex flex-col items-center justify-center text-center"}
        >
          <h3 className={"font-[700] text-[28px] font-inter text-primary_red"}>
            864 +
          </h3>
          <h6 className={"text-lg font-inter font-[500] text-black"}>
            Quotes Processed
          </h6>
        </div>

        <div
          className={"flex flex-col items-center justify-center text-center"}
        >
          <h3 className={"font-[700] text-[28px] font-inter text-primary_red"}>
            2.5K +
          </h3>
          <h6 className={"text-lg font-inter font-[500] text-black"}>
            Deliveries made
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
