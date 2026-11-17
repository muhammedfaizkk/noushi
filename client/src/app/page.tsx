"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { RoomsSection } from "@/components/RoomsSection";
import { AboutSection } from "@/components/AboutSection";
import { WhyUsSection } from "@/components/WhyUsSection";
import { StaysInMotion } from "@/components/StaysInMotion";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [searchFilter, setSearchFilter] = useState<{ destination: string } | null>(null);

  const handleSearch = (filters: { destination: string }) => {
    setSearchFilter(filters);
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col font-sans">
      {/* Navigation Bar */}
      <Navbar variant="light" />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onSearch={handleSearch} />

        {/* Our Rooms Section */}
        <RoomsSection searchFilter={searchFilter} />

        {/* About Us Section */}
        <AboutSection />

        {/* Why Book With Us Section & Stats */}
        <WhyUsSection />

        <StaysInMotion />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
