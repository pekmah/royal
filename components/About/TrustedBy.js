import React from "react";
import Abt1 from "../../public/svg/about_trusted/abt-1";
import Abt2 from "../../public/svg/about_trusted/abt-2";
import Abt4 from "../../public/svg/about_trusted/abt-4";
import Abt5 from "../../public/svg/about_trusted/abt-5";
import Image from "next/image";
import Abt3 from "../../public/svg/about_trusted/abt-3.png";

const TrustedBy = () => {
  return (
    <div className={"bg-white py-16 flex flex-col "}>
      <div className={"mx-auto flex flex-col"}>
        <h3 className="text-red-600 text-2xl font-bold tracking-wide about-h3">
          Trusted By
        </h3>

        <div className={"h-[3px] bg-gray-200 rounded-sm  w-16 mx-auto"} />
      </div>

      <div className={"flex w-3/4 mx-auto justify-between mt-12"}>
        <Abt1 />

        <Abt2 />

        {/*<Abt3 />*/}
        <Image src={Abt3} alt={"trustee 3"} />

        <Abt4 />

        <Abt5 />
      </div>
    </div>
  );
};

export default TrustedBy;
