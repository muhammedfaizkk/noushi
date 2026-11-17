import type { Metadata } from "next";
import { Red_Hat_Display, Red_Hat_Mono, Red_Hat_Text } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Driftwood Stays — Admin",
  description: "Driftwood Stays admin.",
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
      className={`${redHatDisplay.variable} ${redHatText.variable} ${redHatMono.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#f5f4ef] text-stone-800 font-sans selection:bg-[#144e47] selection:text-white">
        {children}
      </body>
    </html>
  );
}
