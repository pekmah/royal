import React from "react";

const ShopNowBtn = () => {
  return (
    <a
      href={"/"}
      className={
        "hidden md:flex px-5 py-1 items-center  my-1 rounded-lg text-white font-semibold gradient-bg ml-2"
      }
    >
      Shop Now
    </a>
  );
};

export default ShopNowBtn;
