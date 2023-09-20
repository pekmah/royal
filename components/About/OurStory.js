import React from "react";
import Image from "next/image";

import OurStoryImg from "../../public/our-story-1.jpg";

const OurStory = () => {
  return (
    <div className={"bg-white py-10 flex flex-col px-[5vw]"}>
      <div className={"flex"}>
        <div className={" flex flex-col"}>
          <h3 className="text-red-600 text-2xl font-[600] tracking-wide about-h3">
            Our Story
          </h3>

          <div className={"h-[3px] bg-gray-200 rounded-sm mt-2 w-16 "} />
        </div>
      </div>

      <div className={"flex flex-col md:flex-row gap-x-10 py-8"}>
        <div
          className={
            "flex-1 bg-gray-500 h-[250px] md:h-[380px] border-none rounded-tr-[60px] rounded-bl-[60px] overflow-hidden"
          }
        >
          <Image
            src={OurStoryImg}
            alt={"our-story"}
            className={"w-full object-cover h-[250px] md:h-[380px] border-none"}
          />
        </div>
        <div
          className={
            "flex-1 text-sm md:text-base font-inter text-gray-700 leading-8 md:leading-9"
          }
        >
          <p>
            For many years, Royal Mabati Factory Limited has supported many
            clients succeed through our roofing solutions and products. We are a
            multinational company that primarily deals with roofing materials,
            starting out with a factory in Nairobi since our inception in 2005.
            Today, we’re one of the leading manufacturers of roofing products
            with over distribution centers across Kenya and Eastern Africa.
            <br />
            <br className={"hidden md:block"} />
            The strict implementation of state of the art manufacturing
            facilities, product testing, organized back office, thorough
            training, field supervision, research & development allows us to
            ensure the integrity of our product and the satisfaction of our
            consumers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurStory;
