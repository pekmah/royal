"use client";
import getCarouselImages from "@/services/Carousel/getCarouselImages";
import { Barlow } from "next/font/google";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";

const barlowSemi = Barlow({
  style: "normal",
  weight: "600",
  subsets: ["latin"],
});

const barlow = Barlow({
  style: "normal",
  weight: "400",
  subsets: ["latin"],
});

export default function LandingPageBanner() {
  const [page, _setPage] = useState<number>(1);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { data, isLoading, error } = useQuery(["carouselImages"], () =>
    getCarouselImages(page),
  );
  const router = useRouter();
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
    <div className={"w-full relative h-max block md:flex shadow-lg rounded-md"}>
      <div className="justify-center rounded-md  min-w-full min-h-[220px] h-[30vh] bg-grey">
        {data &&
          data.results &&
          data.results?.length > 0 &&
          data.results.map(({ id, image_code }, index) => (
            <div
              key={id}
              className={`relative h-[229px] min-w-[340px] ${
                index === currentSlide ? "" : "hidden"
              }`}
            >
              <Image
                alt={"Landing page Banner"}
                src={
                  image_code
                    ? `${process.env.BASE_URL}/api/v1/core/carousel/${image_code}`
                    : "/landing-banner-2.png"
                }
                fill
                priority
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
          ))}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-2">
          {data && data.results && data.results?.length > 0
            ? data.results.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === currentSlide ? "bg-blue" : "bg-white"
                  }`}
                />
              ))
            : null}
        </div>

        <div className="absolute text-white top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center bg-[#00000060]  z-10 opacity-100">
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
    </div>
  );
}
