import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Driftwood Stays — Admin Console",
  description:
    "Management portal for boutique rooms, inventory, tariffs, and WhatsApp guest bookings.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth antialiased">
      <body className="min-h-screen bg-[#f5f4ef] text-stone-800 font-sans selection:bg-[#144e47] selection:text-white">
        {children}
      </body>
    </html>
  );
}
