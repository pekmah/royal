"use client";
import Link from "next/link";
import React from "react";
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
  // console.log(pathname)
  const inactive = "flex items-center gap-4 p-4 hover:bg-grey";
  const active = `${inactive} bg-grey w-full `;

  return (
    <aside className="flex relative h-[75vh] w-24  md:w-full bg-white shadow-md min-w-[10vw]  md:min-w-[20vw] max-w-[25vh]  rounded-md">
      <div>
        <h2 className={`${barlowSemi.className} p-4 text-sm md:text-base `}>
          My account
        </h2>
        <hr className="text-grey w-full mb-4" />
        {accountLinks.map(({ path, name, icon }) => (
          <Link
            key={path}
            href={path}
            className={`${pathname === path ? active : inactive} `}
          >
            <div className="text-blue">{icon}</div>
            <span
              className={`${barlowNormal.className} text-lightgrey hidden md:block`}
            >
              {name}
            </span>
          </Link>
        ))}
        <hr className="text-grey w-full mt-8" />
        <div className="absolute bottom-4  ">
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 px-4"
          >
            <IoLogOutOutline size={iconSize} className="text-blue" />
            <span className="hidden md:block">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AccountNav
