import React from "react";
import Image from "next/image";

import bgImage from "../../public/about-img.jpg";

const ContactForm = () => {
  return (
    <div
      className={
        " h-auto min-h-screen md:min-h-[80vh] bg-slate-400 w-full flex relative"
      }
    >
      <Image
        className={
          "hidden md:flex h-auto md:h-full flex-1 object-cover bg-no-repeat"
        }
        src={bgImage}
        alt={"bg-image"}
      />

      <div
        className={
          "md:absolute bg-[#00000040] mt-20 md:mt-0 top-20 md:top-0 left-0 right-0 bottom-0 flex md:px-5"
        }
      >
        <div className={"flex-1 hidden md:flex items-center justify-center "}>
          <h3
            className={
              " text-white font-[600] text-3xl md:text-5xl mx-auto leading-[50px] md:leading-[60px]"
            }
          >
            Contact Us
          </h3>
        </div>

        <form
          className={
            "flex-1 bg-white m-5 rounded-xl md:rounded-[40px] p-5 md:p-10 flex flex-col gap-2 md:gap-5 font-barlow"
          }
        >
          <h3
            className={
              "md:hidden text-primary font-[600] text-3xl md:text-4xl mx-auto leading-[50px] md:leading-[60px]"
            }
          >
            Contact Us
          </h3>

          <div className={"flex flex-col md:flex-row gap-3"}>
            <div className={"flex-1"}>
              <label>First Name</label>
              <input
                id={"fName"}
                type={"text"}
                placeholder={"Enter First Name"}
                required
                className={`border py-4 px-4 w-full border-gray-300 rounded-xl focus:outline-none  `}
              />
            </div>

            <div className={"flex-1"}>
              <label className={"font-barlow"}>Last Name</label>
              <input
                id={"lName"}
                type={"text"}
                placeholder={"Enter Last Name"}
                required
                className={`border py-4 px-4 w-full border-gray-300 rounded-xl focus:outline-none  `}
              />
            </div>
          </div>

          <div className={"flex gap-3 flex-col md:flex-row"}>
            <div className={"flex-1"}>
              <label className={"font-barlow"}>Phone Number</label>
              <input
                id={"phone"}
                type={"text"}
                placeholder={"Enter Phone Number"}
                required
                className={`border py-4 px-4 w-full border-gray-300 rounded-xl focus:outline-none  `}
              />
            </div>

            <div className={"flex-1"}>
              <label className={"font-barlow"}>Email</label>
              <input
                id={"email"}
                type={"text"}
                placeholder={"Enter Email"}
                required
                className={`border py-4 px-4 w-full border-gray-300 rounded-xl focus:outline-none  `}
              />
            </div>
          </div>

          <div>
            <label className={"font-barlow"}>Message</label>

            <textarea
              rows={6}
              required
              className={"border py-4 px-4 w-full border-gray-300 rounded-xl"}
              placeholder={"Enter Message . . . "}
            />
          </div>

          <button
            type="submit"
            className="button-primary w-full mt-4 font-semibold text-lg md:text-xl "
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
