import React from "react";
import Image from "next/image";
import bgImage from "../../public/about-img.jpg";

const Carousel = () => {
  return (
    <div className={"h-[400px] md:h-[550px] bg-slate-400 w-full flex relative"}>
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
            "w-full md:w-3/4 xl:w-3/5  text-white font-[600] text-[32px] leading-[50px] md:leading-[60px]"
          }
        >
          We do more than just roofing. We provide the guarantee of safety
        </h3>
        <div className={"h-10"} w={"full"} />
      </div>

      <div
        className={
          "flex bg-white absolute -bottom-[70px] px-3 md:px-10 right-1 md:right-[10vw] left-1 md:left-[10vw] py-5 md:py-10 z-20 rounded-xl shadow justify-around"
        }
      >
        <div
          className={"flex flex-col items-center justify-center text-center"}
        >
          <h3
            className={
              "font-[700] text-xl md:text-[28px] font-inter text-primary_red"
            }
          >
            3.5k +
          </h3>
          <h6 className={"text-base font-inter font-[500] text-black"}>
            Houses roofed
          </h6>
        </div>

        <div
          className={"flex flex-col items-center justify-center text-center"}
        >
          <h3
            className={
              "font-[700] text-xl md:text-[28px] font-inter text-primary_red"
            }
          >
            864 +
          </h3>
          <h6 className={"text-base font-inter font-[500] text-black"}>
            Quotes Processed
          </h6>
        </div>

        <div
          className={"flex flex-col items-center justify-center text-center"}
        >
          <h3
            className={
              "font-[700] text-xl md:text-[28px] font-inter text-primary_red"
            }
          >
            2.5K +
          </h3>
          <h6 className={"text-base font-inter font-[500] text-black"}>
            Deliveries made
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
