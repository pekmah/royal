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
          className="w-full py-12 px-8 bg-white"
          style={{
            boxShadow: "0px 4px 15px 1px rgba(0, 0, 0, 0.1)",
            borderRadius: "0 4px 4px 0",
          }}
        >
          <h2
            className={`font-bold text-xl ${barlow.className} font-[700] text-blue`}
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
              <div
                className={`${barlow.className} text-gray`}
              >
                Signing up for a Royal Mabati account means you agree to the{" "}
                <Link className="text-red" href={""}>
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link className="text-red" href={""}>
                  Terms of Service
                </Link>
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
              <button
                className={`${barlow.className} button-secondary`}
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
