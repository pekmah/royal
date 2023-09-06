import Image from "next/image";
import pdf from "@/public/pdf.png";
import React, { useState } from "react";
import { RequestProps } from "./RecievedQuotes";
import { Barlow } from "next/font/google";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { getSession } from "next-auth/react";

interface sharedProps {
  requests: RequestProps[];
}

const barlowMedium = Barlow({
  style: "normal",
  weight: "500",
  subsets: ["latin"],
});
const barlowSmall = Barlow({
  style: "normal",

  weight: "400",

  subsets: ["latin"],
});

const Recieved: React.FC<sharedProps> = ({ requests }) => {
  const [isOpen, setIsOpen] = useState(false);
  // console.log(requests)
  return (
    <div className="grid relative grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {requests.map(
        ({
          id,
          quote_file_code,
          quote_file_name,
          roof_plan_file_name,
          created_at,
        }) => {
          const handleDownload = async () => {
            const session = await getSession();

            try {
              const response = await fetch(
                `${process.env.BASE_URL}/api/v1/core/quote/file/${quote_file_code}`,
                {
                  headers: {
                    Authorization: "Bearer " + session?.user,
                  },
                },
              );
              const blob = await response.blob();
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = roof_plan_file_name;
              document.body.appendChild(a);
              a.click();
              window.URL.revokeObjectURL(url); // Clean up
            } catch (error) {
              console.error("Error downloading the file:", error);
            }
          };
          const dateObject = new Date(created_at!);
          const formattedDate = `${dateObject.getDate()}/${
            dateObject.getMonth() + 1
          }/${dateObject.getFullYear()}`;
          return (
            <div key={id} className="flex relative flex-col ">
              <div
                onClick={() => setIsOpen(true)}
                className="relative rounded-2xl cursor-pointer overflow-hidden w-[15.625rem] h-[10rem]"
              >
                <Image src={pdf} alt="/" fill priority />
              </div>

              <h4 className={`${barlowMedium.className}`}>
                {roof_plan_file_name}
              </h4>

              <p className={`${barlowSmall.className} text-fadegrey`}>
                {formattedDate}
              </p>

              <button
                onClick={handleDownload}
                style={{ whiteSpace: "nowrap" }}
                className="button-primary border border-primary_red w-3/4 my-4 bg-white text-primary_red rounded-md py-2.5 flex gap-2 items-center justify-center"
              >
                <span>Download Quote</span>
                <IoCloudDownloadOutline size={20} />
              </button>
            </div>
          );
        },
      )}
    </div>
  );
};

export default Recieved;
