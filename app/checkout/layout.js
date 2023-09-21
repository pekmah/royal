"use client";
import React, { useContext } from "react";
import { CContext } from "../../context/CartContext2";
import OrderSummary from "./OrderSummary";

const Layout = ({ children }) => {
  const { checkout } = useContext(CContext);
  return (
    <div
      className={"min-h-screen flex flex-col md:flex-row md:gap-x-6 md:pr-6"}
    >
      {/*main body*/}
      <section
        className={`${
          checkout?.isCheckingOut ? "w-full md:w-[70%]" : "w-full pt-5 md:pt-0"
        }`}
      >
        {children}
      </section>

      {/*Order Summary*/}
      <OrderSummary />
    </div>
  );
};

export default Layout;
