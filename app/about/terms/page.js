import React from "react";
import Terms from "../../../components/About/footer/Terms";

const Page = () => {
  return (
    <div>
      <h3 className={"mt-5 text-center font-barlow text-[26px] font-[600]"}>
        Terms and Condition
      </h3>

      <div className={"flex justify-center"}>
        <Terms />
      </div>
    </div>
  );
};

export default Page;
