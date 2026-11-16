import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="scroll-smooth antialiased">
      <body className="min-h-screen bg-[#faf7f2] text-[#1c2826] font-sans selection:bg-[#144e47] selection:text-white">
        {children}
      </body>
    </html>
  );
}
