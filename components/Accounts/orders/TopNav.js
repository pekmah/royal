import React from "react";

const OrdersTopNav = ({ currentNav, setCurrent }) => {
  return (
    <div className={"px-5 pt-2 flex gap-x-6 border-b border-gray-300 "}>
      <NavItem
        isCurrent={currentNav === 0}
        title={`Pending Orders`}
        handlePress={() => setCurrent(0)}
      />
      <NavItem
        isCurrent={currentNav === 1}
        title={`Closed Orders`}
        handlePress={() => setCurrent(1)}
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
