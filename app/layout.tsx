import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Royal Mabati",
  description: "Ecommerce Platform for Royal Mabati",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <footer className="w-full flex justify-center bottom-0 pb-8">
          <div className="text-center text-[10pt] text-fadegray">
            <p>Copyright © 2023 Royal Mabati</p>
            <p>Factory LTD Reserved</p>
          </div>
        </footer>
        <Toaster position="bottom-right" reverseOrder={false} />
      </body>
    </html>
  );
}
