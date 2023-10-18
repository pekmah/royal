import React from "react";

const OrdersTopNav = ({ currentNav, setCurrent, reset }) => {
  return (
    <div className={"px-5 pt-2 flex gap-x-6 border-b border-gray-300 "}>
      <NavItem
        isCurrent={currentNav === 0}
        title={`Unpaid Orders`}
        handlePress={() => {
          setCurrent(0);
          reset();
        }}
      />
      <NavItem
        isCurrent={currentNav === 1}
        title={`Installments`}
        handlePress={() => {
          setCurrent(1);
          reset();
        }}
      />

      <NavItem
        isCurrent={currentNav === 2}
        title={`Paid Orders`}
        handlePress={() => {
          setCurrent(2);
          reset();
        }}
      />
    </div>
  );
};

export default OrdersTopNav;

const NavItem = ({ isCurrent, title, handlePress }) => (
  <button
    className={`px-4 py-3 ${
      isCurrent
        ? "border-b-[2px] border-primary_red text-blue font-[600]"
        : "border-b-0 text-gray-400"
    }`}
    onClick={handlePress}
  >
    <span className={""}>{title}</span>
  </button>
);
