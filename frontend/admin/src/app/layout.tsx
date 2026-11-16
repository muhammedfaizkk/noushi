import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Driftwood Stays — Admin Console",
  description: "Management portal for boutique rooms, inventory, tariffs, and WhatsApp guest bookings.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#f5f4ef] text-stone-800 font-sans selection:bg-[#144e47] selection:text-white">
        {children}
      </body>
    </html>
  );
}
