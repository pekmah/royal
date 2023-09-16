import { Barlow } from "next/font/google";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import Link from "next/link";
import TwitterSvg from "@/public/svg/Twitter";

const barlow = Barlow({
  style: "normal",
  weight: "500",
  subsets: ["latin"],
});

const navItems = [
  { path: "/", name: "Shop" },
  { path: "/about", name: "About Us" },
];

const navSocials = [
  {
    path: "https://www.facebook.com/royalmabati",
    icon: <BsFacebook size={15} />,
  },
  {
    path: "https://www.instagram.com/royalmabati/",
    icon: <BsInstagram size={15} />,
  },
  { path: "https://twitter.com/RoyalMabati", icon: <TwitterSvg /> },
];

export default function NavMenu() {
  return (
    <nav
      className={`w-full bg-primary_red py-2 px-8 flex text-sm justify-between text-white ${barlow.className}`}
    >
      <div className="flex gap-4">
        {navItems.map(({ name, path }) => (
          <Link href={path} key={path} className={``}>
            {name}
          </Link>
        ))}
      </div>
      <div className="flex divide-x-2 items-center gap-2">
        <p>Contact Us: +254 722 638 383</p>

        <div className="hidden md:flex gap-4 px-4 items-center">
          {navSocials.map(({ path, icon }) => (
            <a href={path} key={path} target="_blank" rel="noopener noreferrer">
              {icon}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
