"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { RxPerson } from "react-icons/rx";
import { CgMenuLeft } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";
import NavMenu from "./NavMenu";
import DropdownMenu from "../Dropdown";
import SearchInput from "../SearchInput";
import { useContext } from "react";
import { CContext } from "@/context/CartContext2.js";
import CartSvg from "@/public/svg/CartSvg";
import Image from "next/image"; // interface HeaderProps {
import Logo from "@/public/Logo_1.png";

export default function Header({ setIsSidebarOpen, isSidebarOpen }) {
  const { status, data } = useSession();
  const path = usePathname();
  const { cart, setShowAccountNav, showAccountNav } = useContext(CContext);
  const router = useRouter();
  const { innerWidth: width } = window;

  const handleAccountNavigation = () => {
    if (innerWidth < 768) {
      console.log(path, showAccountNav);
      if (path.startsWith("/account")) {
        setShowAccountNav(!showAccountNav);
      } else {
        router.push("/account");
        setShowAccountNav(true);
      }
    } else {
      router.push("/account");
    }
  };

  return path.startsWith("/auth") ? null : (
    <header
      className={`${
        path === "/about" ? "hidden" : ""
      } fixed w-screen md:relative z-30`}
    >
      {/* <div className='w-full h-[70px] relative'>
				<Image
					alt={'Offers Banner'}
					src={'/banner.png'}
					fill
					priority
					style={{ objectFit: 'cover', objectPosition: 'center' }}
				/>
			</div> */}
      <NavMenu />
      <div
        className={`flex w-full py-2 px-3 md:px-8 justify-between gap-3 md:gap-0 items-center bg-blue shadow-sm`}
      >
        <div className={`flex md:gap-8 items-center flex-1`}>
          <button
            onClick={() => {
              setIsSidebarOpen((prev) => !prev);
            }}
          >
            {isSidebarOpen ? (
              <IoMdClose color="#fff" size={"24"} />
            ) : (
              <CgMenuLeft color="#fff" size={"24"} />
            )}
          </button>
          <Image
            src={Logo}
            alt="Royal Mabati Logo"
            height={8}
            width={80}
            className={"hidden md:block"}
            style={{ width: "auto" }}
          />
        </div>
        <div className=" w-full md:w-[50%] flex">
          <SearchInput />
        </div>
        <div
          className={`flex gap-4 items-center md:flex-1 justify-end pr-1 md:justify-center`}
        >
          {status === "unauthenticated" ? (
            <div>
              <Link
                href={"/auth/login"}
                className="px-4 py-2 flex justify-center rounded-md bg-white text-black border-grey"
              >
                Login
              </Link>
            </div>
          ) : null}
          {status === "loading" ? (
            <div
              className={"bg-grey h-[38px] w-[74px] animate-pulse rounded-md"}
            />
          ) : status === "authenticated" ? (
            <div className="flex relative items-center gap-5 md:gap-7 h-full">
              <Link
                href={"/cart"}
                className="flex items-center gap-3 font-medium"
                onClick={() => setShowAccountNav(false)}
              >
                <div className="">
                  <CartSvg />
                  <div className="absolute -top-3 text-sm left-3 opacity-100 bg-primary_red w-6 flex items-center justify-center text-center h-6 text-white rounded-full px-1">
                    {cart?.length}
                  </div>
                </div>
                <p className="text-sm text-white hidden md:block">Cart</p>
              </Link>

              <DropdownMenu
                buttonText={
                  <button
                    onClick={handleAccountNavigation}
                    className="flex items-center gap-3 font-medium"
                  >
                    <RxPerson size={"24"} color={"#fff"} />
                    <p className="text-sm text-white hidden md:block">
                      Account
                    </p>
                  </button>
                }
              />
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
