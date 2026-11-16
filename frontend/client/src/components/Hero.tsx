"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { SearchWidget } from "./SearchWidget";
import { Play, Pause } from "lucide-react";

interface HeroProps {
  onSearch: (filters: { destination: string; guests: string }) => void;
}

export function Hero({ onSearch }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const mountainPoster =
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=85";

  return (
    <section className="relative min-h-[620px] md:min-h-[720px] flex flex-col justify-between pt-28 pb-16 overflow-hidden">
      {/* Background Video & Fallback Poster Container */}
      <div className="absolute inset-0 z-0 overflow-hidden" style={{ position: "absolute" }}>
        {/* High-Res Mountain Fallback Image */}
        <Image
          src={mountainPoster}
          alt="Majestic mountain peaks and serene alpine valley"
          fill
          priority
          className="object-cover object-center scale-105"
        />

        {/* High-Quality Compressed & Upscaled Mountain Background Video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={mountainPoster}
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
          <source
            src="https://res.cloudinary.com/demo/video/upload/q_auto:good,w_1920,c_scale/docs/mountain-aerial-view.mp4"
            type="video/mp4"
          />
        </video>

        {/* Cinematic Atmospheric Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-[#0d2a25]/25 mix-blend-multiply" />
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

      {/* Subtle Video Play/Pause Control */}
      <div className="absolute bottom-5 right-5 z-20 hidden sm:block">
        <button
          type="button"
          onClick={togglePlay}
          className="bg-black/35 hover:bg-black/55 backdrop-blur-md text-white/80 hover:text-white p-2.5 rounded-full border border-white/15 transition-all duration-200 shadow-sm cursor-pointer"
          aria-label={isPlaying ? "Pause background video" : "Play background video"}
          title={isPlaying ? "Pause background video" : "Play background video"}
        >
          {isPlaying ? <Pause size={13} /> : <Play size={13} />}
        </button>
      </div>
    </section>
  );
}
