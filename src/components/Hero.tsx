import React from "react";
import Image from "next/image";
import { SearchWidget } from "./SearchWidget";

interface HeroProps {
  onSearch: (filters: { destination: string; guests: string }) => void;
}

export function Hero({ onSearch }: HeroProps) {
  return (
    <section className="relative min-h-[620px] md:min-h-[700px] flex flex-col justify-between pt-28 pb-16 overflow-hidden">
      {/* Background Image with Dark Atmospheric Gradient */}
      <div className="absolute inset-0 z-0" style={{ position: "absolute" }}>
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=85"
          alt="Coastal cliffs and serene ocean"
          fill
          priority
          className="object-cover object-center scale-105"
        />
        {/* Gradients to match the screenshot's rich twilight tones */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/75" />
        <div className="absolute inset-0 bg-[#0f2824]/25 mix-blend-multiply" />
      </div>

      {/* Hero Central Text */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center mt-12 md:mt-20">
        {/* Category Pill Tagline */}
        <p className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-stone-200/90 mb-4 inline-block drop-shadow-sm">
          SIMPLE &bull; LOCAL &bull; UNHURRIED
        </p>

        {/* Headline */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white tracking-tight leading-[1.12]">
          Wake up somewhere{" "}
          <span className="italic font-serif text-[#8ec5b6] font-light">
            new.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 max-w-2xl mx-auto text-stone-200/90 text-sm sm:text-base md:text-lg font-light leading-relaxed drop-shadow-sm">
          Handpicked rooms by the sea, in the hills and in old city quarters across
          India. Book direct and talk to your host on WhatsApp.
        </p>
      </div>

      {/* Floating Booking Search Widget positioned at bottom */}
      <div className="relative z-20 mt-12 md:mt-16">
        <SearchWidget onSearch={onSearch} />
      </div>
    </section>
  );
}
