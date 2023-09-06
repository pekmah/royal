"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Contact = () => {
  const router = useRouter();
  return (
    <div className={"about-contact py-10 px-[5vw] text-white flex"}>
      <div className={"flex-1"}>
        <div className={"w-2/3"}>
          <h2 className={"text-[32px] font-[600] font-barlow"}>
            Want to get quality products?
          </h2>

          <p className={"font-barlow leading-6 font-[400] mt-3"}>
            Visit our shop today to start shopping for your construction
            materials.
          </p>
        </div>
      </div>

      <div className={"flex-1 flex items-center justify-center flex-col"}>
        <h4 className={"font-barlow font-500] text-base"}>
          Start Shopping today!
        </h4>

        <button
          className={
            "border border-white font-barlow rounded-lg h-12 py-1 pl-2 pr-1 flex justify-center gap-x-2 text-[13px] items-center w-full lg:w-3/5 mt-4"
          }
          onClick={() => {
            router.push("/products");
          }}
        >
          Visit Shop
        </button>
      </div>
    </div>
  );
};

export default Contact;
