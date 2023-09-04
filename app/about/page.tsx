import React from "react";
import { AboutCarousel, AboutTrustedBy } from "@/components/About";
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
    </div>
  );
};
export default Page;
