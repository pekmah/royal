import React from "react";
import {
  AboutCarousel,
  AboutContact,
  AboutFooter,
  AboutMedia,
  AboutNavbar,
  AboutTrustedBy,
  AboutVarieties,
} from "@/components/About";
import OurStory from "@/components/About/OurStory";

const Page = () => {
  return (
    <div className={"w-screen overflow-hidden"}>
      {/*  Nav bar  */}
      <AboutNavbar />

      {/*  Carousel image  */}
      <AboutCarousel />

      {/*    Trusted by section */}
      <AboutTrustedBy />

      <div className={"w-full h-12 md:hidden"} />

      {/*  Our Story  */}
      <OurStory />

      {/*    Our Varieties  */}
      <AboutVarieties />

      {/*    media  */}
      <AboutMedia />

      {/*    contact    */}
      <AboutContact />

      {/*    end section*/}
      <AboutFooter />
    </div>
  );
};
export default Page;
