import React from "react";
import { AboutCarousel, AboutTrustedBy } from "@/components/About";

const Page = () => {
  return (
    <div>
      {/*  Carousel image  */}
      <AboutCarousel />

      {/*    Trusted by section */}
      <AboutTrustedBy />
    </div>
  );
};
export default Page;
