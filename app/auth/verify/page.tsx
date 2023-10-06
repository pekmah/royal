"use client";

import { FormProps } from "@/components/Form/types/form.types";
import MultiStepForm from "@/components/MultiStepForm";
import { Barlow } from "next/font/google";
import { useRouter } from "next/navigation";
import { ReactNode, useContext } from "react";
import { toast } from "react-hot-toast";
import { CContext } from "@/context/CartContext2";

const barlow = Barlow({
  style: "normal",
  weight: "600",
  subsets: ["latin"],
});

const codeFormProps: FormProps = {
  fields: {
    otp: {
      type: "pin",
      label: "",
      placeholder: "Code",
      helperText: "Enter the 6 digit code sent to your Email.",
    },
  },
  onSubmit: (data: any) => {
    if (!data.otp) {
      throw new Error("OTP is required");
    }
  },
  formTitle: "Verify your account.",
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
  SubmitInfo: <div className="pt-8">{/*Didn&apos;t get the code?{" "}*/}</div>,
};

export default function Verify() {
  const { push } = useRouter();
  const { authEmail, setAuthEmail }: any = useContext(CContext);

  return (
    <main
      className={`md:py-20 md:px-16 sm:py-0 sm:px-0 min-h-screen ${barlow.className}`}
    >
      <MultiStepForm
        forms={[codeFormProps]}
        submitHandler={async ({ data }) => {
          try {
            const res = await fetch("/api/auth/verify", {
              body: JSON.stringify({ ...data, email: authEmail }),
              method: "POST",
            });
            const resData = await res.json();

            if (resData.error) {
              throw new Error(resData.error);
            } else {
              toast.success(resData["message"]);
              setAuthEmail("");
              push("/auth/login");
            }
          } catch (e: any) {
            console.error("err", e.message);
            toast.error(e.message);
          }
        }}
      />
    </main>
  );
}
