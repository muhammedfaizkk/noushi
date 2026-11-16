"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { RoomsSection } from "@/components/RoomsSection";
import { AboutSection } from "@/components/AboutSection";
import { WhyUsSection } from "@/components/WhyUsSection";
import { Footer } from "@/components/Footer";
import { RoomModal } from "@/components/RoomModal";
import { BookingModal } from "@/components/BookingModal";
import { Room } from "@/data/rooms";

export default function Home() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState<{
    destination: string;
    guests: string;
  } | null>(null);

  const handleSearch = (filters: { destination: string; guests: string }) => {
    setSearchFilter(filters);
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] flex flex-col font-sans">
      {/* Navigation Bar */}
      <Navbar onOpenBooking={() => setIsBookingModalOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onSearch={handleSearch} />

        {/* Our Rooms Section */}
        <RoomsSection
          onSelectRoom={(room) => setSelectedRoom(room)}
          searchFilter={searchFilter}
        />

        {/* About Us Section */}
        <AboutSection />

        {/* Why Book With Us Section & Stats */}
        <WhyUsSection />
      </main>

      {/* Footer */}
      <Footer onOpenBooking={() => setIsBookingModalOpen(true)} />

      {/* Interactive Detail Modal for Room */}
      <RoomModal
        room={selectedRoom}
        onClose={() => setSelectedRoom(null)}
      />

      {/* Interactive Booking Inquiry Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
}
