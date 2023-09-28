"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Barlow } from "next/font/google";
import { MdOutlineFileUpload } from "react-icons/md";
import MultiRangeSlider from "../MultiRangeSlider";
import { Transition } from "@headlessui/react";
import CategoriesSidebar from "../ProductCategory/CategoriesSidebar";
import { ChangeEvent, useState } from "react";
import UploadFiles from "../Accounts/Plan/UploadFiles";

const barlow = Barlow({
  style: "normal",
  weight: "400",
  subsets: ["latin"],
});

const barlowSemi = Barlow({
  style: "normal",
  weight: "600",
  subsets: ["latin"],
});

interface SidebarProps {
  isOpen: boolean;
}

const transitionClasses = {
  enter: "ease-out duration-350",
  enterFrom: "opacity-0 scale-95",
  enterTo: "opacity-100 scale-100",
  leave: "ease-in duration-350",
  leaveFrom: "opacity-100 scale-100",
  leaveTo: "opacity-0 scale-95",
};

export default function Sidebar({ isOpen }: SidebarProps) {
  const path = usePathname();
  const { push } = useRouter();
  const router = useRouter();
  const params = useSearchParams();
  const categoryParam = params.get("category");
  const maxPriceParam = params.get("maxPrice");
  const minPriceParam = params.get("minPrice");
  const maxPrice = maxPriceParam ? parseInt(maxPriceParam) : undefined;
  const minPrice = minPriceParam ? parseInt(minPriceParam) : undefined;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [closeUploadFiles, setCloseUploadFile] = useState(false);
  const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files?.length > 0) {
      const file = files[0];

      setSelectedFile(file);
    }
    setCloseUploadFile(true);
  };

  return path.startsWith("/auth") || path.startsWith("/about") ? null : (
    <Transition
      show={isOpen}
      {...transitionClasses}
      className={`h-fit w-screen mt-32 md:mt-0 md:w-[20%]`}
    >
      <aside className="w-[100%] h-fit">
        <div className={`rounded-md shadow-lg ${barlow.className} bg-white `}>
          <div className="p-4">
            <h3 className={barlowSemi.className}>Categories</h3>
          </div>
          <hr className="text-grey w-full mb-4" />
          <CategoriesSidebar />
          <hr className="text-grey w-full mb-4" />
          <MultiRangeSlider
            name={"Price"}
            min={1}
            max={50000}
            initialValues={
              maxPrice && minPrice
                ? { max: maxPrice, min: minPrice }
                : undefined
            }
            onClear={() => {
              push(
                `/products?${categoryParam ? `category=${categoryParam}` : ""}`,
              );
            }}
            onApply={({ min, max }: { min: number; max: number }) => {
              push(
                `/products?${
                  categoryParam ? `category=${categoryParam}` : ""
                }&minPrice=${min}&maxPrice=${max}`,
              );
            }}
          />
        </div>
        <div
          className={`rounded-md shadow-lg ${barlow.className} text-sm pb-8 mt-4 bg-white `}
        >
          <h3 className={`p-4 text-base ${barlowSemi.className}`}>
            Upload Plan
          </h3>
          <hr className="text-grey w-full mb-4" />
          <p className="px-4">
            Get a personalized quote created just for your house simply by
            uploading the house’s plan
          </p>
          {selectedFile && closeUploadFiles && (
            <div className="w-[25%]">
              <UploadFiles
                selectedFile={selectedFile}
                closeUpload={setCloseUploadFile}
              />
            </div>
          )}
          <button
            className="px-4"
            onClick={() => {
              router.push("/account/plans");
            }}
          >
            <label
              className={`button-primary cursor-pointer w-full mt-4 rounded-lg text-sm flex items-center justify-center gap-4 ${barlowSemi.className}`}
            >
              <MdOutlineFileUpload size={16} className="text-white" />
              {/*<input className="hidden" type="file" onChange={uploadFile} />*/}
              <span>Upload Plan</span>
            </label>
          </button>
        </div>
      </aside>
    </Transition>
  );
}
