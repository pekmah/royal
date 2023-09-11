"use client";

import { ReactNode, useEffect } from "react";
import Header from "./Header.js";
import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";
import Footer from "./Footer";
import { useSearchContext } from "@/context/SearchContext";
import WhatsappBtn from "@/components/WhatsappBtn";
import MyLiveChat from "@/components/MyLiveChat";

export default function MainContainer({ children }: { children: ReactNode }) {
  const { isSidebarOpen, setIsSidebarOpen } = useSearchContext();
  const path = usePathname();
  const isMediumDevice = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    if (isMediumDevice) setIsSidebarOpen(false);
  }, [isMediumDevice]);

  return (
    <>
      <MyLiveChat />

      <Header
        setIsSidebarOpen={setIsSidebarOpen}
        isSidebarOpen={isSidebarOpen}
      />
      {path.startsWith("/about") ? (
        <main className={`w-screen bg-[#fbfbff]`}>{children}</main>
      ) : (
        <main className={`w-screen p-8 flex gap-8 bg-[#fbfbff]`}>
          {!path.startsWith("/checkout") && !path.startsWith("/account") && (
            <Sidebar isOpen={isSidebarOpen} />
          )}
          {!path.startsWith("/auth") &&
          !path.startsWith("/about") &&
          !path.startsWith("/account") ? (
            <section
              className={`${
                isSidebarOpen ? "md:w-[80%] hidden md:block" : "w-full"
              } transition-all mt-32 md:mt-[0] duration-300`}
            >
              {children}
            </section>
          ) : (
            <section className="w-full transition-all ease-in-out duration-300">
              {children}
            </section>
          )}
          <WhatsappBtn />
        </main>
      )}
      <Footer />
    </>
  );
}
