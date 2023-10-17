"use client";

import { Barlow } from "next/font/google";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import TwitterSvg from "@/public/svg/Twitter";

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

          <div className={`flex-col mt-6`}>
            <h5 className={`${barlowSemi.className}`}>Telephone:</h5>
            <p className={`text-sm mt-3`}>0722 638 383</p>
          </div>

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

          <div className={`flex-col mt-6`}>
            <p className={`text-sm mt-3`}>Shipping</p>
          </div>

          <Link href={"/about/faq"} className={`flex-col mt-6`}>
            <p className={`text-sm mt-3`}>FAQs</p>
          </Link>

          <div className={`flex-col mt-6`}>
            <p className={`text-sm mt-3`}>Careers</p>
          </div>
        </div>
        <div className="mb-3">
          <h3 className={`${barlowSemi.className}`}>
            DOWNLOAD THE ROYAL MABATI APP FOR FREE
          </h3>

          <div className={`flex-col mt-6`}>
            <Image
              src={"/playstore.png"}
              priority
              width={135}
              height={40}
              alt="Playstore icon link"
            />
          </div>

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
                href={"https://twitter.com/RoyalMabati"}
                className="flex gap-4 mt-3"
              >
                <TwitterSvg h={"26"} stroke={"2"} />
                <p className="text-sm">Twitter</p>
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
