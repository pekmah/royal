import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <div>
        <Link className="text-blue" href="/auth/login">
          Login
        </Link>
      </div>
      <div>
        <Link className="text-blue" href="/auth/signup">
          Sign Up
        </Link>
      </div>
    </main>
  );
}
