"use client";

import React, { useState } from "react";
import Image from "next/image";
import Logo from "../../public/about-rym-logo.png";
import NavItem from "./NavItem";
import ShopNowBtn from "./ShopNowBtn";
import ArrowDropDownSvg from "../../public/svg/ArrowDropDownSvg";
import DownloadCard from "./DownloadCard";

const Navbar = () => {
  const [showDownloadCard, setShowDownloadCard] = useState(false);

  return (
    <div className={"bg-white py-2 flex "}>
      <div
        className={
          "md:w-11/12 mx-auto h-full flex justify-between items-center font-inter"
        }
      >
        <a href={"/"} className={"flex-1"}>
          <Image
            src={Logo}
            alt="Royal Mabati Logo"
            height={54}
            width={80}
            className={"hidden md:block"}
            style={{ width: "auto" }}
          />
        </a>

        {/*    nav list */}
        <div className={"flex font-inter h-[54px] gap-x-2 "}>
          {/*    nav items  */}
          <NavItem href={"/"} title={"Shop"} />

          <NavItem href={"/about"} title={"About Us"} isCurrent />

          <div
            className={"md:relative"}
            onMouseOver={() => setShowDownloadCard(true)}
            onMouseLeave={() => setShowDownloadCard(false)}
          >
            <NavItem title={"Downloads"} icon={<ArrowDropDownSvg />} />

            <DownloadCard showCard={showDownloadCard} />
          </div>

          <NavItem
            className={"hidden md:flex"}
            href={"/account"}
            title={"Account"}
          />

          {/*    show now button */}
          <ShopNowBtn />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
