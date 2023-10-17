import React from "react";
import Image from "next/image";
import Logo from "../../public/about-rym-logo.png";
import NavItem from "./NavItem";
import ShopNowBtn from "./ShopNowBtn";
import ArrowDropDownSvg from "../../public/svg/ArrowDropDownSvg";

const Navbar = () => {
  return (
    <div className={"bg-white py-2 flex "}>
      <div
        className={
          "md:w-11/12 mx-auto h-full flex justify-between items-center font-inter"
        }
      >
        <div className={"flex-1"}>
          <Image
            src={Logo}
            alt="Royal Mabati Logo"
            height={54}
            width={80}
            className={"hidden md:block"}
            style={{ width: "auto" }}
          />
        </div>

        {/*    nav list */}
        <div className={"flex font-inter h-[54px] gap-x-2 "}>
          {/*    nav items  */}
          <NavItem title={"Shop"} />

          <NavItem title={"About Us"} isCurrent />

          <NavItem title={"Downloads"} icon={<ArrowDropDownSvg />} />

          <NavItem title={"Account"} />

          {/*    show now button */}
          <ShopNowBtn />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
