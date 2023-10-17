import React from "react";

const NavItem = ({ title, isCurrent, icon }) => {
  return (
    <button
      className={`h-full flex gap-x-2 items-center px-3 text-blue ${
        isCurrent ? "border-b-[4px] border-b-blue" : ""
      }`}
    >
      <span className={`${isCurrent ? "font-[500]" : ""}`}>{title}</span>

      {icon}
    </button>
  );
};

export default NavItem;
