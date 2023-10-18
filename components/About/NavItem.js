import React from "react";

const NavItem = ({ title, isCurrent, icon, className, ...rest }) => {
  return (
    <a
      className={`h-full flex gap-x-2 items-center px-3 text-blue ${
        isCurrent ? "border-b-[4px] border-b-blue" : ""
      } ${className}`}
      {...rest}
    >
      <span className={`text-sm md:text-base ${isCurrent ? "font-[500]" : ""}`}>
        {title}
      </span>

      {icon}
    </a>
  );
};

export default NavItem;
