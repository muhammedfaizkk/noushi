"use client";

import React, { useState, useEffect } from "react";
import { Logo } from "./Logo";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenBooking: () => void;
}

export function Navbar({ onOpenBooking }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#111a18]/90 backdrop-blur-md py-3 shadow-md"
          : "bg-gradient-to-b from-black/60 via-black/20 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <Logo variant="light" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-white/90">
          <a
            href="#rooms"
            className="hover:text-white transition-colors tracking-wide"
          >
            Rooms
          </a>
          <a
            href="#about"
            className="hover:text-white transition-colors tracking-wide"
          >
            About
          </a>
          <a
            href="#why-us"
            className="hover:text-white transition-colors tracking-wide"
          >
            Why Us
          </a>
          <a
            href="#contact"
            className="hover:text-white transition-colors tracking-wide"
          >
            Contact
          </a>
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center">
          <button
            onClick={onOpenBooking}
            className="bg-[#144e47] hover:bg-[#0e3b35] text-white text-xs sm:text-sm font-medium px-5 py-2.5 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md cursor-pointer border border-[#1d6b62]"
          >
            Book now
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={onOpenBooking}
            className="bg-[#144e47] text-white text-xs font-medium px-3.5 py-1.5 rounded-lg"
          >
            Book now
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-1.5 rounded-md hover:bg-white/10"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#111a18] border-b border-stone-800 px-6 py-5 text-white/90 flex flex-col space-y-4 animate-in fade-in duration-200">
          <a
            href="#rooms"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-white py-1 text-sm font-medium border-b border-stone-800"
          >
            Rooms
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-white py-1 text-sm font-medium border-b border-stone-800"
          >
            About
          </a>
          <a
            href="#why-us"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-white py-1 text-sm font-medium border-b border-stone-800"
          >
            Why Us
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="hover:text-white py-1 text-sm font-medium"
          >
            Contact
          </a>
        </div>
      )}
    </header>
  );
}
