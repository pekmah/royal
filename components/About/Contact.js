import React from "react";
import EmailSvg from "../../public/svg/email";
import DoubleCheckSvg from "../../public/svg/DoubleCheck";

const Contact = () => {
  return (
    <div className={"about-contact py-10 px-[5vw] text-white flex"}>
      <div className={"flex-1"}>
        <div className={"w-2/3"}>
          <h2 className={"text-[32px] font-[600] font-barlow"}>
            We want to keep you updated
          </h2>

          <p className={"font-barlow leading-6 font-[400] mt-3"}>
            We regularly send out emails to our customers to inform them about
            our offers, products and events
          </p>
        </div>
      </div>

      <div className={"flex-1 flex items-center justify-center flex-col"}>
        <h4 className={"font-barlow font-500] text-base"}>
          Join our newsletter mailing list
        </h4>

        <div
          className={
            "border border-white rounded-lg h-12 py-1 pl-2 pr-1 flex gap-x-2 items-center w-full lg:w-3/5 mt-4"
          }
        >
          <EmailSvg />

          <input
            className={
              "h-full flex-1 bg-transparent text-sm font-barlow placeholder-white"
            }
            placeholder={"Enter your email"}
          />

          <button className={"h-full px-4 bg-[#ffffff40] rounded-lg"}>
            <DoubleCheckSvg />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
