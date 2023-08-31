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
        {currentNav === 0 ? (
          <PendingOrders orders={sampleOrders} />
        ) : (
          <ClosedOrders />
        )}
      </div>
    </div>
  );
};

export default Page;

const sampleOrders = [
  {
    image:
      "https://media.istockphoto.com/id/1018835072/photo/modern-roof-covered-with-tile-effect-pvc-coated-brown-metal-roof-sheets.jpg?s=612x612&w=0&k=20&c=Etz-EuQ9DZn5Q-YXKN8vV4E0aHnQAZ7qClXKcuxGwC4=",
    title: "Zee Tiles Matte 28 & 2 Others",
    order_no: "ZTM02JULY",
    date: new Date() - 5,
  },
];
