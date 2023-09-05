"use client";
import getCarouselImages from "@/services/Carousel/getCarouselImages";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import Image from "next/image";
import BannerImage from "../public/about-img.jpg";
import { useRouter } from "next/navigation";

export default function LandingPageBanner() {
  const router = useRouter();
  const [page, _setPage] = useState<number>(1);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { data, isLoading, error } = useQuery(["carouselImages"], () =>
    getCarouselImages(page),
  );
  const nextSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide + 1) % (data?.results?.length ?? 0),
    );
  };
  useEffect(() => {
    if (data) {
      // Start the automatic sliding after 3 seconds
      timerRef.current = setInterval(nextSlide, 3000);

      return () => {
        // Clear the interval when the component unmounts
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [data]);
  // console.log(currentSlide)
  return (
    <div
      className={
        "w-full relative block md:flex shadow-lg rounded-md min-h-[220px] h-[30vh] overflow-hidden"
      }
    >
      <Image
        className={"w-full h-full object-cover "}
        src={BannerImage}
        alt={"banner"}
      />

      <div
        className={
          "absolute top-0 right-0 bottom-0 left-0 bg-[#00000060] flex flex-col items-center justify-center text-white"
        }
      >
        <h3
          className={
            "text-center w-3/4 leading-[50px] text-3xl font-[600] tracking-wide"
          }
        >
          We do more than just roofing.
          <br />
          We provide the guarantee of safety.
        </h3>

        <button
          className={
            "font-barlow text-sm font-[500] text-white mt-5 bg-primary_red rounded-full w-40 py-2 text-center tracking-wide"
          }
          onClick={() => router.push("/about")}
        >
          Learn More
        </button>
      </div>
    </div>
  );
}
