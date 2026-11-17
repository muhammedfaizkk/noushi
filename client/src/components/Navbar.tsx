"use client";

import React, { useState, useEffect } from "react";
import { Logo } from "./Logo";
import { Button } from "./ui/Button";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  variant?: "overlay" | "solid" | "light";
}

export function Navbar({ variant = "overlay" }: NavbarProps) {
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

  const light = variant === "light";
  const onPhoto = variant === "overlay" && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        light
          ? scrolled
            ? "bg-[#faf7f2]/95 backdrop-blur-md py-2.5 md:py-3 border-b border-[#e7dfd2]"
            : "bg-transparent py-2.5 md:py-5"
          : onPhoto
            ? "bg-transparent py-5"
            : "bg-[#111a18]/95 backdrop-blur-md py-3 shadow-md"
      }`}
    >
      <div className={`mx-auto grid grid-cols-[minmax(0,1fr)_auto] md:grid-cols-[1fr_auto_1fr] items-center gap-3 ${
        light ? "max-w-[1240px] px-4 md:px-6" : "max-w-7xl px-4 sm:px-6 lg:px-8"
      }`}>
        {/* Logo */}
        <a href="/" className="flex items-center justify-self-start min-w-0">
          <Logo variant={light ? "dark" : "light"} />
        </a>

        {/* Desktop Navigation */}
        <nav className={`hidden md:flex items-center justify-center space-x-8 text-sm font-medium ${
          light ? "text-[#1F2A2E]" : "text-white/90"
        }`}>
          <a
            href="/#rooms"
            className={light ? "hover:text-accent transition-colors" : "hover:text-white transition-colors tracking-wide"}
          >
            Rooms
          </a>
          <a
            href="/#about"
            className={light ? "hover:text-accent transition-colors" : "hover:text-white transition-colors tracking-wide"}
          >
            About
          </a>
          <a
            href="/#why-us"
            className={light ? "hover:text-accent transition-colors" : "hover:text-white transition-colors tracking-wide"}
          >
            Why Us
          </a>
          <a
            href="/contact"
            className={light ? "hover:text-accent transition-colors" : "hover:text-white transition-colors tracking-wide"}
          >
            Contact
          </a>
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center justify-self-end">
          <Button href="/#rooms">Book now</Button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center justify-self-end gap-3">
          <Button href="/#rooms" size="sm">
            Book now
          </Button>
          {!light && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2 rounded-md hover:bg-white/10"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`md:hidden px-6 py-3 flex flex-col ${
          light
            ? "bg-[#faf7f2] border-b border-[#e7dfd2] text-[#1F2A2E]"
            : "bg-[#111a18] border-b border-stone-800 text-white/90"
        }`}>
          <a
            href="/#rooms"
            onClick={() => setMobileMenuOpen(false)}
            className={`py-3.5 text-sm font-medium border-b ${light ? "border-[#e7dfd2]" : "border-stone-800 hover:text-white"}`}
          >
            Rooms
          </a>
          <a
            href="/#about"
            onClick={() => setMobileMenuOpen(false)}
            className={`py-3.5 text-sm font-medium border-b ${light ? "border-[#e7dfd2]" : "border-stone-800 hover:text-white"}`}
          >
            About
          </a>
          <a
            href="/#why-us"
            onClick={() => setMobileMenuOpen(false)}
            className={`py-3.5 text-sm font-medium border-b ${light ? "border-[#e7dfd2]" : "border-stone-800 hover:text-white"}`}
          >
            Why Us
          </a>
          <a
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className={`py-3.5 text-sm font-medium ${light ? "" : "hover:text-white"}`}
          >
            Contact
          </a>
        </div>
      )}
    </header>
  );
}
