import { Barlow } from "next/font/google";
import Link from "next/link";
import { MdOutlineMailOutline } from "react-icons/md";

const barlow = Barlow({
  style: "normal",
  weight: "600",
  subsets: ["latin"],
});

export default function Signup() {
  return (
    <main className="py-20 px-16 min-h-screen">
      <section className="min-h-full flex w-full">
        <div
          className="w-full py-12 px-8"
          style={{
            boxShadow: "0px 4px 15px 1px rgba(0, 0, 0, 0.1)",
            borderRadius: "0 4px 4px 0",
            background: "#FFFFFF",
          }}
        >
          <h2
            className={`font-bold text-xl ${barlow.className} font-[700]`}
            style={{ color: "#2A3698" }}
          >
            Create a new account
          </h2>

          <form>
            <div
              className="pt-8"
              style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
            >
              <label
                htmlFor="email"
                className={`${barlow.className}`}
                style={{ color: "#2A3698" }}
              >
                Enter Your Email
              </label>
              <input
                className="border py-4 px-8"
                placeholder="Email"
                type="email"
                name="email"
              />
              <div
                className={`${barlow.className}`}
                style={{ color: "#888888" }}
              >
                Signing up for a Royal Mabati account means you agree to the{" "}
                <Link style={{ color: "#DC2A25" }} href={""}>
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link style={{ color: "#DC2A25" }} href={""}>
                  Terms of Service
                </Link>
              </div>
              <button
                className={`px-8 py-4 ${barlow.className} text-base`}
                style={{
                  background: "#DC2A25",
                  color: "#fff0f0",
                  borderRadius: "8px",
                }}
                type="submit"
              >
                Continue
              </button>
            </div>
          </form>
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
                className={`text-xl font-[700] ${barlow.className}`}
                style={{ color: "#ffffff" }}
              >
                Already have an account?
              </h2>
            </div>
            <div>
              <button
                className={`px-8 py-4 ${barlow.className} text-base w-full`}
                style={{
                  color: "#DC2A25",
                  background: "#ffffff",
                  borderRadius: "8px",
                }}
                type="submit"
              >
                Sign in instead
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
