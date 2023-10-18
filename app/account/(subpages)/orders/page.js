"use client";
import React, { useState } from "react";
import OrdersTopNav from "../../../../components/Accounts/orders/TopNav";
import OrderFilters from "../../../../components/Accounts/orders/OrderFilters";
import PendingOrders from "../../../../components/Accounts/orders/PendingOrders";
import ClosedOrders from "../../../../components/Accounts/orders/ClosedOrders";
import Installments from "../../../../components/Accounts/orders/Installments";

const Page = () => {
  const [currentNav, setCurrent] = useState(0);
  const [date, setDate] = useState({
    start: "",
    end: "",
  });

  return (
    <div className={"font-barlow"}>
      {/*  header*/}
      <OrdersTopNav
        currentNav={currentNav}
        setCurrent={setCurrent}
        reset={() => {
          setDate({
            start: "",
            end: "",
          });
        }}
      />

      {/*    body*/}
      <div className={"p-3"}>
        {/*    filters      */}
        {currentNav !== 1 && (
          <OrderFilters
            setDate={setDate}
            date={date}
            reset={() => {
              setDate({
                start: "",
                end: "",
              });
            }}
          />
        )}

        {/*    Order List     */}
        {currentNav === 0 ? (
          <PendingOrders dates={date} current={currentNav} />
        ) : currentNav === 1 ? (
          <Installments />
        ) : (
          <ClosedOrders dates={date} current={currentNav} />
        )}
      </div>
    </div>
  );
};

export default Page;
