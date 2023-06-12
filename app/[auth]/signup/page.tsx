"use client";

import { FormProps } from "@/components/Form/types/form.types";
import MultiStepForm from "@/components/MultiStepForm";
import { Barlow } from "next/font/google";
import Link from "next/link";
import { ReactNode } from "react";

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
    confirmPassword: {
      type: "text",
      htmlType: "password",
      label: "",
      placeholder: "Confirm Password",
    },
  },
  onSubmit: (data: any) => {
    console.log(data);
  },
  formTitle: "Create Password",
  Container: ({ children }: { children: ReactNode }) => (
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
    </section>
  ),
  styling: {
    formWidth: "w-[50%]",
  },
};

const infoFormProps: FormProps = {
  fields: {
    firstName: {
      type: "text",
      htmlType: "text",
      label: "",
      placeholder: "First Name",
    },
    lastName: {
      type: "text",
      htmlType: "text",
      label: "",
      placeholder: "Last Name",
    },
    phoneNumber: {
      type: "text",
      htmlType: "tel",
      label: "",
      placeholder: "Phone Number",
    },
  },
  onSubmit: (data: any) => {
    console.log(data);
  },
  formTitle: "Let's get to know you",
  Container: ({ children }: { children: ReactNode }) => (
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
    </section>
  ),
  styling: {
    formWidth: "w-[50%]",
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
    console.log(data);
  },
  formTitle: "Create a new account",
  SubmitInfo: (
    <div className={`${barlow.className} text-gray my-8`}>
      Signing up for a Royal Mabati account means that you agree to the{" "}
      <Link className="text-red" href={""}>
        Privacy Policy
      </Link>{" "}
      and{" "}
      <Link className="text-red" href={""}>
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
          className="w-full min-h-full flex flex-col justify-center items-center"
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
  return (
    <main className={`py-20 px-16 min-h-screen ${barlow.className}`}>
      <MultiStepForm
        forms={[emailFormProps, passwordFormProps, infoFormProps]}
      />
    </main>
  );
}
