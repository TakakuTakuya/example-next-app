import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Orbit — Portal Mega Menu Demo",
  description:
    "Server Components と Client island を分けた Next.js メガメニューの実装例",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className="scroll-smooth motion-reduce:scroll-auto"
      data-scroll-behavior="smooth"
    >
      <body className="min-w-[720px] bg-paper font-sans text-ink antialiased">
        <Navbar isLoggedIn hasCartItems />
        {children}
      </body>
    </html>
  );
}
