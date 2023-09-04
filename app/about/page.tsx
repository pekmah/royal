import React from "react";
import {
  AboutCarousel,
  AboutTrustedBy,
  AboutVarieties,
} from "@/components/About";
import OurStory from "@/components/About/OurStory";

const Page = () => {
  return (
    <div>
      {/*  Carousel image  */}
      <AboutCarousel />

      {/*    Trusted by section */}
      <AboutTrustedBy />

      {/*  Our Story  */}
      <OurStory />

      {/*    Our Varieties  */}
      <AboutVarieties />
    </div>
  );
};
export default Page;
