import React from "react";
import Image from "next/image";
import { Button } from "./ui/Button";

export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 bg-[#f2ebe0] relative">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image with Floating WhatsApp Badge */}
          <div className="lg:col-span-6 relative pb-16 lg:pb-0">
            <div
              className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_16px_40px_rgba(0,0,0,0.08)] bg-stone-200"
              style={{ position: "relative" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=85"
                alt="Plantation cottage in dense tropical greenery"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Overlaid Floating Badge at bottom-left */}
            <div className="absolute -bottom-6 left-6 sm:left-8 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-[0_12px_32px_rgba(0,0,0,0.12)] border border-stone-100 max-w-xs transition-transform hover:-translate-y-1 duration-200">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-stone-900 text-sm tracking-tight">
                  Driftwood Stays
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Host replies on WhatsApp
              </p>
              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-stone-100">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-medium text-emerald-800">
                  Usually within 10 minutes
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy & CTA */}
          <div className="lg:col-span-6 lg:pl-6 pt-4 sm:pt-0">
            <span className="text-xs uppercase tracking-widest text-accent font-semibold block mb-3">
              ABOUT US &mdash;
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1c2826] font-medium leading-[1.15] tracking-tight">
              Your next holiday starts with the right room.
            </h2>

            <p className="mt-6 text-stone-600 text-sm sm:text-base leading-relaxed">
              We visit every place we list: cliff-top rooms in Kerala, timber
              lofts in the Himalayas, restored havelis and quiet plantation
              cottages. No booking platform in between, so you deal with the host
              directly and pay no extra fees.
            </p>

            <div className="mt-8">
              <Button href="#rooms">Explore rooms</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
