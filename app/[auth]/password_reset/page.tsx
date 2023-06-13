"use client";

import { FormProps } from "@/components/Form/types/form.types";
import MultiStepForm from "@/components/MultiStepForm";
import parseServerErrors from "@/utils/parseServerErrors";
import { postRequest } from "@/utils/request";
import { Barlow } from "next/font/google";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import toast from "react-hot-toast";

const barlow = Barlow({
  style: "normal",
  weight: "600",
  subsets: ["latin"],
});

const emailFormProps: FormProps = {
  fields: {
    email: {
      type: "text",
      htmlType: "email",
      label: "Enter your email",
      placeholder: "Email",
    },
  },
  onSubmit: (data: any) => {
    if (!data.email) {
      throw new Error("Email is required");
    }
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
};

const resetFormProps: FormProps = {
  fields: {
    phone_number: {
      type: "text",
      htmlType: "tel",
      label: "",
      placeholder: "Phone Number",
      helperText:
        "Enter your phone number and we will send an OTP to reset you password",
    },
  },
  onSubmit: (data: any) => {
    if (!data.phone_number) {
      throw new Error("Phone number is required");
    } else {
      try {
        postRequest("/api/v1/auth/user/password/request/", {
          // phone_number: data.phone_number,
          phone_number: "0701850133",
        }).then((res) => {
          toast.success((res.data as any).message);
        });
      } catch (e: any) {
        toast.error(e.message);
      }
    }
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
    otp: {
      type: "pin",
      label: "",
      placeholder: "Code",
      helperText: "Enter the 6 digit code sent to your number.",
    },
  },
  onSubmit: (data: any) => {
    if (!data.otp) {
      throw new Error("OTP is required");
    }
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
    new_password: {
      type: "text",
      htmlType: "password",
      label: "",
      placeholder: "New Password",
    },
    confirm_password: {
      type: "text",
      htmlType: "password",
      label: "",
      placeholder: "Confirm Password",
    },
  },
  onSubmit: (data: any) => {
    if (!data.new_password || !data.confirm_password) {
      throw new Error("You must create a password");
    } else if (data.new_password !== data.confirm_password) {
      throw new Error("Passwords do not match");
    }
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
  const { push } = useRouter();
  return (
    <main className={`${barlow.className} py-20 px-16 min-h-screen`}>
      <MultiStepForm
        forms={[
          emailFormProps,
          resetFormProps,
          codeFormProps,
          passwordFormProps,
        ]}
        submitHandler={async ({ data }) => {
          console.log(data);
          try {
            const res = await postRequest(
              "/api/v1/auth/user/password/reset/",
              data
            );
            toast.success(res.data.message);
            push("/auth/login");
          } catch (e: any) {
            const { data } = e.response;
            toast.error(parseServerErrors(data));
          }
        }}
      />
    </main>
  );
}
