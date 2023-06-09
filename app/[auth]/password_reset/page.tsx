import MutliPartForm from "@/components/MultiPartForm";
import { Barlow } from "next/font/google";

const barlow = Barlow({
  style: "normal",
  weight: "600",
  subsets: ["latin"],
});

export default function PasswordReset() {
  return (
    <main className="py-20 px-16 min-h-screen">
      <MutliPartForm
        forms={[
          { children: <ResetForm /> },
          { children: <CodeForm /> },
          { children: <PasswordForm /> },
        ]}
      />
    </main>
  );
}

function ResetForm() {
  return (
    <section className="min-h-full flex w-full">
      <div
        className="w-full py-12 px-8 bg-white flex justify-center"
        style={{
          boxShadow: "0px 4px 15px 1px rgba(0, 0, 0, 0.1)",
          borderRadius: "0 4px 4px 0",
        }}
      >
        <div className="w-[50%]">
          <h2
            className={`font-bold text-xl ${barlow.className} font-[700] text-blue`}
          >
            Reset your password
          </h2>
          <p>
            Enter your email and we will send a confirmation email to reset your
            password
          </p>
          <form>
            <div
              className="pt-8"
              style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
            >
              <label
                htmlFor="email"
                className={`${barlow.className} text-blue`}
              >
                Enter Your Email
              </label>
              <input
                className="border py-4 px-8 border-gray"
                placeholder="Email"
                type="email"
                name="email"
              />
              <button
                className={`button-primary ${barlow.className}`}
                type="submit"
              >
                Send Code
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function CodeForm() {
  return (
    <section className="min-h-full flex w-full">
      <div
        className="w-full py-12 px-8 bg-white flex justify-center"
        style={{
          boxShadow: "0px 4px 15px 1px rgba(0, 0, 0, 0.1)",
          borderRadius: "0 4px 4px 0",
        }}
      >
        <div className="w-[50%]">
          <h2
            className={`font-bold text-xl ${barlow.className} font-[700] text-blue`}
          >
            Reset your password
          </h2>
          <p>
            Enter the 4-PIN code sent to +254 712345678 to verify that this is
            your number.
          </p>
          <form>
            <div
              className="pt-8"
              style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
            >
              <input
                className="border py-4 px-8 border-gray"
                placeholder="Email"
                type="email"
                name="email"
              />
              <div>
                Didn&apos;t get the code?{" "}
                <a className="text-red">Resend code in 60</a>
              </div>
              <button
                className={`button-primary ${barlow.className}`}
                type="submit"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function PasswordForm() {
  return (
    <section className="min-h-full flex w-full">
      <div
        className="w-full py-12 px-8 bg-white flex justify-center"
        style={{
          boxShadow: "0px 4px 15px 1px rgba(0, 0, 0, 0.1)",
          borderRadius: "0 4px 4px 0",
        }}
      >
        <div className="w-[50%]">
          <h2
            className={`font-bold text-xl ${barlow.className} font-[700] text-blue`}
          >
            Enter new password
          </h2>
          <form>
            <div
              className="pt-8"
              style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
            >
              <input
                className="border py-4 px-8 border-gray"
                placeholder="Password"
                type="password"
                name="password"
              />
              <input
                className="border py-4 px-8 border-gray"
                placeholder="Confirm Password"
                type="password"
                name="password"
              />
              <button
                className={`button-primary ${barlow.className}`}
                type="submit"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
