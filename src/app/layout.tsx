import type { Metadata } from "next";
import { Sora, Playfair_Display } from "next/font/google";
import type { ReactNode } from "react";
import { GlobalCursor } from "@/components/GlobalCursor";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["400", "600"]
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["600", "700"]
});

export const metadata: Metadata = {
  title: "Aariwork | Threads of Heritage",
  description:
    "An experimental, award-worthy Aari embroidery experience. Custom couture blouses handcrafted by master artisans."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${playfair.variable} antialiased`}>
        <GlobalCursor />
        {children}
      </body>
    </html>
  );
}
