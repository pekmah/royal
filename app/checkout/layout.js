"use client";
import React, { useContext } from "react";
import OrderSummary from "./OrderSummary";
import { CContext } from "../../context/CartContext2";

const Layout = ({ children }) => {
  const { checkout } = useContext(CContext);
  return (
    <div className={"min-h-screen flex gap-x-6 w-screen pr-14"}>
      {/*main body*/}
      <section className={`${checkout?.isCheckingOut ? "w-[70%]" : "w-full"}`}>
        {children}
      </section>

      {/*Order Summary*/}
      <OrderSummary />
    </div>
  );
};

export default Layout;
