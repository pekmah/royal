"use client";
import React, { useState } from "react";
import OrdersTopNav from "../../../../components/Accounts/orders/TopNav";
import OrderFilters from "../../../../components/Accounts/orders/OrderFilters";
import PendingOrders from "../../../../components/Accounts/orders/PendingOrders";
import ClosedOrders from "../../../../components/Accounts/orders/ClosedOrders";

const Page = () => {
  const [currentNav, setCurrent] = useState(0);

  return (
    <div className={"font-barlow"}>
      {/*  header*/}
      <OrdersTopNav currentNav={currentNav} setCurrent={setCurrent} />

      {/*    body*/}
      <div className={"p-3"}>
        {/*    filters      */}
        <OrderFilters />

        {/*    Order List     */}
        {currentNav === 0 ? <PendingOrders /> : <ClosedOrders />}
      </div>
    </div>
  );
};

export default Page;
