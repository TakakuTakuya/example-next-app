import type { Metadata } from "next";
import { Navbar, type CartItem } from "@/components/Navbar";
import "./globals.css";

const demoCartItems = [
  {
    id: "orbit-analytics",
    imageSrc: "/window.svg",
    name: "Orbit Analytics",
    price: 12800,
  },
  {
    id: "orbit-automations",
    imageSrc: "/file.svg",
    name: "Orbit Automations",
    price: 8800,
  },
  {
    id: "orbit-connect",
    imageSrc: "/globe.svg",
    name: "Orbit Connect",
    price: 5500,
  },
] as const satisfies readonly CartItem[];

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
        <Navbar
          auth={{
            status: "authenticated",
            account: {
              userName: "山田 太郎",
              pointBalance: 9999,
              availableCouponCount: 3,
            },
          }}
          cartItems={demoCartItems}
        />
        {children}
      </body>
    </html>
  );
}
