import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Inter } from "next/font/google";
import AuthProvider from "@/components/Providers/AuthProvider";
import MainContainer from "@/components/PageSections/MainContainer";
import QueryProvider from "@/components/Providers/QueryProvider";
import CartContextProvider from "@/context/CartContext";
import CartContext2Provider from "@/context/CartContext2.js";
import SearchContextProvider from "@/context/SearchContext";
import Head from "next/head";

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
      <Head>
        <script
          type="text/javascript"
          src="https://mylivechat.com/chatbutton.aspx?hccid=34992597
&ButtonOnlineImage=1&ButtonOfflineImage=2&ButtonOnlineTooltip=Click to chat
&ButtonOfflineTooltip=Leave a message"
          async
        ></script>
      </Head>
      <AuthProvider>
        <body className={`${inter.className}`} style={{ overflowX: "hidden" }}>
          <QueryProvider>
            <CartContextProvider>
              <CartContext2Provider>
                <SearchContextProvider>
                  <MainContainer>{children}</MainContainer>
                  <Toaster position="bottom-right" reverseOrder={false} />
                </SearchContextProvider>
              </CartContext2Provider>
            </CartContextProvider>
          </QueryProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
