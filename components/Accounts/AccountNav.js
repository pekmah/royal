"use client";

import Link from "next/link";
import React, { useContext } from "react";
import {
  BsBagCheck,
  BsCreditCard,
  BsFileEarmarkText,
  BsHeart,
  BsPerson,
} from "react-icons/bs";
import { IoLogOutOutline } from "react-icons/io5";
import { Barlow } from "next/font/google";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { CContext } from "@/context/CartContext2";
import CancelSvg from "@/public/svg/CancelSvg";

const barlowSemi = Barlow({
  style: "normal",
  weight: "600",
  subsets: ["latin"],
});

const barlowNormal = Barlow({
  style: "normal",
  weight: "400",
  subsets: ["latin"],
});

const iconSize = 20;
const accountLinks = [
  {
    path: "/account",
    icon: <BsPerson size={iconSize} />,
    name: "Profile Information",
  },
  {
    path: "/account/orders",
    icon: <BsBagCheck size={iconSize} />,
    name: "Orders",
  },
  {
    path: "/account/plans",
    icon: <BsFileEarmarkText size={iconSize} />,
    name: "My plans",
  },
  {
    path: "/account/favorite",
    icon: <BsHeart size={iconSize} />,
    name: "Favorite",
  },
  {
    path: "/account/installments",
    icon: <BsCreditCard size={iconSize} />,
    name: "Installments",
  },
];
const AccountNav = () => {
  const pathname = usePathname();
  const inactive =
    "flex items-center gap-4 px-4 py-3 mb-4 hover:bg-[#F8F8F8] text-gray-700 text-sm mx-1.5 flex-1";
  const active = `${inactive} bg-[#F8F8F8] font-[600] text-black`;
  const { innerWidth: width } = window;

  const { showAccountNav, setShowAccountNav } = useContext(CContext);

  const renderNavBody = () => (
    <div className={"flex-1 bg-white"}>
      <h2
        className={`${barlowSemi.className} px-4 py-3.5 text-sm md:text-base `}
      >
        My account
      </h2>

      <hr className="text-grey w-full mb-4" />
      {accountLinks.map(({ path, name, icon }) => (
        <Link
          key={path}
          href={path}
          className={`${pathname === path ? active : inactive} `}
          onClick={() => setShowAccountNav(false)}
        >
          <div className="text-blue">{icon}</div>
          <span className={`block`}>{name}</span>
        </Link>
      ))}

      <div className="md:absolute bottom-2 py-4 border-t border-zinc-300 w-full font-barlow">
        <button
          onClick={() => signOut()}
          className="flex items-center gap-4 px-4"
        >
          <IoLogOutOutline size={iconSize} className="text-blue" />
          <span className="block">Logout</span>
        </button>
      </div>
    </div>
  );

  if (width < 768 && showAccountNav) {
    return (
      <div
        className={
          "absolute bg-[#00000040] z-40 top-0 right-0 left-0 bottom-0 p-4 pt-28"
        }
      >
        <button
          className={
            "h-8 w-8 flex items-center justify-center rounded-full bg-gray-200 absolute top-28 right-5 z-50 "
          }
          onClick={() => setShowAccountNav(false)}
        >
          <CancelSvg />
        </button>
        {renderNavBody()}
      </div>
    );
  } else
    return (
      <aside className=" hidden md:flex relative h-[75vh] w-24  md:w-full bg-white shadow-md min-w-[10vw]  md:min-w-[20vw] max-w-[25vh]  rounded-md">
        {renderNavBody()}
      </aside>
    );
};

export default AccountNav;
