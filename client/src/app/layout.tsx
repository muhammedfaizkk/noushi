import type { Metadata } from "next";
import { Fraunces, Red_Hat_Display, Red_Hat_Mono, Red_Hat_Text } from "next/font/google";
import "./globals.css";

const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-red-hat-display",
});

const redHatText = Red_Hat_Text({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-red-hat-text",
});

const redHatMono = Red_Hat_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-red-hat-mono",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["500", "600"],
  display: "swap",
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  title: "Driftwood Stays — Handpicked Boutique Rooms Across India",
  description:
    "Handpicked rooms by the sea, in the hills and in old city quarters across India. Book direct and talk to your host on WhatsApp.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${redHatDisplay.variable} ${redHatText.variable} ${redHatMono.variable} ${fraunces.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#faf7f2] text-[#1c2826] font-sans selection:bg-[#144e47] selection:text-white">
        {children}
      </body>
    </html>
  );
}
