"use client";

import { Barlow } from "next/font/google";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import YoutubeSvg from "@/public/svg/YoutubeSvg";

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

export default function Footer() {
  const path = usePathname();
  return path.startsWith("/auth") ? (
    <footer className="w-full flex justify-center bottom-0 pb-8">
      <div className="text-center text-[10pt] text-fadegrey">
        <p>Copyright © 2023 Royal Mabati</p>
        <p>Factory LTD Reserved</p>
      </div>
    </footer>
  ) : (
    <footer
      className={`bottom-0 bg-blue ${barlow.className} w-full p-8  text-white`}
    >
      <div className={`md:flex md:justify-evenly`}>
        <div className="mb-3">
          <h3 className={`${barlowSemi.className}`}>CONTACT US</h3>

          <div className={`flex-col mt-6`}>
            <h5 className={`${barlowSemi.className}`}>Location</h5>
            <p className={`text-sm mt-3`}>
              Nairobi along Mombasa Rd, Mlolongo, Opp Sabaki Stage
            </p>
          </div>

          <button className={`flex-col mt-6`}>
            <h5 className={`${barlowSemi.className}`}>Telephone:</h5>
            <p className={`text-sm mt-3`}>+254 722 638 383</p>
          </button>

          <div className={`flex-col mt-6`}>
            <h5 className={`${barlowSemi.className}`}>Email:</h5>
            <p className={`text-sm mt-3`}>info@royalmabati.com</p>
          </div>

          <div className={`flex-col mt-6`}>
            <h5 className={`${barlowSemi.className}`}>Mail:</h5>
            <p className={`text-sm mt-3`}>P.O. Box 29721 - 00202</p>
          </div>
        </div>
        <div className="mb-3">
          <h3 className={`${barlowSemi.className}`}>ABOUT US</h3>

          <a href={"/about/terms"} className={`flex-col mt-6`}>
            <p className={`text-sm mt-3`}>Terms & Contitions</p>
          </a>

          <Link href={"/about/privacy"} className={`flex-col mt-6`}>
            <p className={`text-sm mt-3`}>Privacy Policy</p>
          </Link>

          <Link href={"/about/faq"} className={`flex-col mt-6`}>
            <p className={`text-sm mt-3`}>FAQs</p>
          </Link>
        </div>
        <div className="mb-3">
          <h3 className={`${barlowSemi.className}`}>
            DOWNLOAD THE ROYAL MABATI APP FOR FREE
          </h3>

          <a
            href={
              "https://play.google.com/store/apps/details?id=com.royalmabati.limited"
            }
            className={`flex-col mt-6`}
          >
            <Image
              src={"/playstore.png"}
              priority
              width={135}
              height={40}
              alt="Playstore icon link"
            />
          </a>

          <div className={`flex-col mt-6`}>
            <h5 className={`${barlowSemi.className}`}>CONNECT WITH US</h5>
            <div className={`mt-6`}>
              <a
                href={"https://www.facebook.com/royalmabati"}
                className="flex gap-4"
              >
                <Image
                  src={"/facebook.png"}
                  priority
                  width={20}
                  height={20}
                  alt="Playstore icon link"
                />
                <p className="text-sm">Facebook</p>
              </a>

              <a
                href={"https://www.instagram.com/royalmabati/"}
                className="flex gap-4 mt-3"
              >
                <Image
                  src={"/instagram.png"}
                  priority
                  width={20}
                  height={20}
                  alt="Playstore icon link"
                />
                <p className="text-sm">Instagram</p>
              </a>

              <a
                href={"https://www.youtube.com/@royalmabatifactorylimited3201"}
                className="flex gap-4 mt-3"
              >
                <YoutubeSvg />
                <p className="text-sm">Youtube</p>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center text-sm border-t mt-8 pt-8">
        <p>Copyright © 2023 Royal Mabati Factory LTD Reserved</p>
        <div className="text-sm">
          <span>Designed & Built by</span>
          <span className="underline text-primary_red"> Glitex Solutions</span>
        </div>
      </div>
    </footer>
  );
}
