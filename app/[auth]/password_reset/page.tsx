"use client";

import { FormProps } from "@/components/Form/types/form.types";
import MultiStepForm from "@/components/MultiStepForm";
import { Barlow } from "next/font/google";
import { ReactNode } from "react";

const barlow = Barlow({
  style: "normal",
  weight: "600",
  subsets: ["latin"],
});

const resetFormProps: FormProps = {
  fields: {
    password: {
      type: "text",
      htmlType: "email",
      label: "Enter your email",
      placeholder: "Email",
      helperText:
        "Enter your email address and we will send a confirmation email to reset you password",
    },
  },
  onSubmit: (data: any) => {
    console.log(data);
  },
  formTitle: "Reset your password",
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
  submitText: "Send Code",
};

const codeFormProps: FormProps = {
  fields: {
    password: {
      type: "number",
      label: "",
      placeholder: "Code",
      helperText:
        "Enter the 4 digit PIN sent to +254 12345678 to verify that this is you phone number.",
    },
  },
  onSubmit: (data: any) => {
    console.log(data);
  },
  formTitle: "Reset your password",
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
  SubmitInfo: (
    <div className="pt-8">
      Didn&apos;t get the code? <a className="text-red">Resend code in 60</a>
    </div>
  ),
};

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
  formTitle: "Enter new Password",
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

export default function PasswordReset() {
  return (
    <main className={`${barlow.className} py-20 px-16 min-h-screen`}>
      <MultiStepForm
        forms={[resetFormProps, codeFormProps, passwordFormProps]}
      />
    </main>
  );
}
