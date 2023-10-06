"use client";

import { FormProps } from "@/components/Form/types/form.types";
import MultiStepForm from "@/components/MultiStepForm";
import { Barlow } from "next/font/google";
import Link from "next/link";
import { ReactNode, useContext } from "react";
import toast from "react-hot-toast";
import { GoPerson } from "react-icons/go";
import { useRouter } from "next/navigation";
import { CContext } from "@/context/CartContext2";
import AuthServices from "@/services/AuthServices";

const barlow = Barlow({
  style: "normal",
  weight: "600",
  subsets: ["latin"],
});

const passwordFormProps: FormProps = {
  fields: {
    password: {
      type: "text",
      htmlType: "password",
      label: "",
      placeholder: "Password",
    },
    confirm_password: {
      type: "text",
      htmlType: "password",
      label: "",
      placeholder: "Confirm Password",
    },
  },
  onSubmit: (data: any) => {
    if (!data.password || !data.confirm_password) {
      throw new Error("You must create a password");
    } else if (data.password !== data.confirm_password) {
      throw new Error("Passwords do not match");
    }
  },
  formTitle: "Create Password",
  Container: ({ children }: { children: ReactNode }) => (
    <section className="min-h-full flex w-full">
      <div
        className="w-full py-12 xl:px-8 md:px-4 lg:px-8 bg-white block px-8 md:flex justify-center"
        style={{
          boxShadow: "0px 4px 15px 1px rgba(0, 0, 0, 0.1)",
          borderRadius: "0 4px 4px 0",
        }}
      >
        {children}
      </div>
    </section>
  ),
  styling: {
    formWidth: "sm:w-[100%] md:w-[75%] xl:w-[50%]",
  },
};

const infoFormProps: FormProps = {
  fields: {
    first_name: {
      type: "text",
      htmlType: "text",
      label: "",
      placeholder: "First Name",
      LabelIcon: GoPerson,
    },
    last_name: {
      type: "text",
      htmlType: "text",
      label: "",
      placeholder: "Last Name",
      LabelIcon: GoPerson,
    },
    phone_number: {
      type: "text",
      htmlType: "tel",
      label: "",
      placeholder: "Phone Number",
    },
  },
  onSubmit: (data: any) => {
    if (!data.first_name || !data.last_name) {
      throw new Error("You must fill both names");
    } else if (!data.phone_number) {
      throw new Error("Phone number is required");
    }
  },
  formTitle: "Let's get to know you",
  Container: ({ children }: { children: ReactNode }) => (
    <section className="min-h-full flex w-full">
      <div
        className="w-full py-12 xl:px-8 md:px-4 lg:px-8 bg-white block px-8 md:flex justify-center"
        style={{
          boxShadow: "0px 4px 15px 1px rgba(0, 0, 0, 0.1)",
          borderRadius: "0 4px 4px 0",
        }}
      >
        {children}
      </div>
    </section>
  ),
  styling: {
    formWidth: "sm:w-[100%] md:w-[75%] xl:w-[50%]",
  },
};

const emailFormProps: FormProps = {
  fields: {
    email: {
      type: "text",
      htmlType: "email",
      label: "Enter your email",
      placeholder: "Email",
    },
  },
  onSubmit: (data) => {
    if (!data.email) {
      throw new Error("Email is required");
    }
  },
  formTitle: "Create a new account",
  SubmitInfo: (
    <div className={`${barlow.className} text-grey my-8`}>
      Signing up for a Royal Mabati account means that you agree to the{" "}
      <Link className="text-primary_red" href={""}>
        Privacy Policy
      </Link>{" "}
      and{" "}
      <Link className="text-primary_red" href={""}>
        Terms of Service
      </Link>
    </div>
  ),
  Container: ({ children }: { children: ReactNode }) => {
    return (
      <section className="min-h-full flex w-full">
        <div
          className="w-full py-12 px-8 bg-white flex justify-center"
          style={{
            boxShadow: "0px 4px 15px 1px rgba(0, 0, 0, 0.1)",
            borderRadius: "0 4px 4px 0",
          }}
        >
          {children}
        </div>
        <div
          className="w-full min-h-full flex-col justify-center items-center hidden md:hidden lg:flex xl:flex"
          style={{
            background:
              "linear-gradient(323.54deg, #DC2A25 10.19%, #FF3832 99.32%)",
            borderRadius: "0 4px 4px 0",
          }}
        >
          <div className="flex flex-col items-center gap-8">
            <div>
              <h2
                className={`text-xl font-[700] ${barlow.className} text-white`}
              >
                Already have an account?
              </h2>
            </div>
            <div>
              <Link
                className={`${barlow.className} button-secondary`}
                href={"/auth/login"}
              >
                Sign in instead
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  },
};

export default function Signup() {
  const { push } = useRouter();
  const { setAuthEmail }: any = useContext(CContext);

  return (
    <main
      className={`md:py-20 md:px-16 sm:py-0 sm:px-0 min-h-screen ${barlow.className}`}
    >
      <MultiStepForm
        forms={[emailFormProps, passwordFormProps, infoFormProps]}
        submitHandler={async ({ data }) => {
          // try {
          setAuthEmail(data?.email);
          try {
            await AuthServices.signUp(data);
          } catch (e: any) {
            if (e.response.status === 409) {
              setAuthEmail(data?.email);
              toast.success("Registration successful. Verify your account. ");
              return push("/auth/verify");
            }
            toast.error(
              "Request unsuccessful. " + e.response.data?.detail ?? e.message,
            );
          }
        }}
      />
    </main>
  );
}
