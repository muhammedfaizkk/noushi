"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "./ui/Button";

interface HeroProps {
  onSearch: (filters: { destination: string }) => void;
}

const WORDS = ["by the sea.", "in the hills.", "in a haveli.", "on an estate."];
const PLACES = ["Kerala", "Karnataka", "Manali", "Jaipur", "Coorg"];

const LINE = "#D6CCBD";

export function Hero({ onSearch }: HeroProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % WORDS.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, []);

  const search = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch({ destination: query.trim() || "Anywhere" });
    document.getElementById("rooms")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section aria-labelledby="ha-title" className="bg-[#FAF7F2] text-[#1F2A2E] overflow-x-clip">
      <div className="ha-wrap max-w-[1240px] mx-auto px-6 pt-28 pb-20 flex items-center gap-14 max-[900px]:flex-col max-[900px]:items-stretch max-[900px]:px-5 max-[900px]:pt-[72px] max-[900px]:pb-8 max-[900px]:gap-6">
        <div className="ha-copy flex-1 min-w-0 max-w-[560px] flex flex-col gap-5 max-[900px]:max-w-none max-[900px]:gap-3.5">
          <p className="ha-in ha-d1 m-0 inline-flex self-start items-center gap-2 px-3 py-1.5 rounded-full bg-[#E3EFEE] text-accent text-[13px] font-semibold">
            <span className="ha-live w-2 h-2 rounded-full bg-[#1E7A4C]" />
            Hosts reply on WhatsApp
          </p>

          <h1
            id="ha-title"
            className="ha-in ha-d2 m-0 font-medium text-[42px] sm:text-[clamp(38px,5.4vw,66px)] leading-[1.05] tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Wake up
            <span className="relative block h-[1.15em]">
              {WORDS.map((text, index) => {
                const distance = (index - wordIndex + WORDS.length) % WORDS.length;
                const visible = distance === 0;
                const y = visible ? "0%" : distance === WORDS.length - 1 ? "-100%" : "100%";
                return (
                  <em
                    key={text}
                    className="ha-word absolute left-0 top-0 whitespace-nowrap italic text-accent"
                    aria-hidden={visible ? undefined : true}
                    style={{ opacity: visible ? 1 : 0, transform: `translateY(${y})` }}
                  >
                    {text}
                  </em>
                );
              })}
            </span>
          </h1>

          <p className="ha-in ha-d3 m-0 text-[15px] sm:text-lg text-[#4E585C] max-w-[470px]">
            Handpicked rooms by the sea, in the hills and in old city quarters across India. Book direct, no platform fees.
          </p>

          <form
            role="search"
            onSubmit={search}
            className="ha-in ha-d4 flex items-center gap-1.5 py-1.5 pr-1.5 pl-[18px] rounded-2xl bg-[#FFFDF9] border border-[#D6CCBD] shadow-[0_12px_30px_rgba(31,42,46,0.08)]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
              <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
              <circle cx="12" cy="9.5" r="2.5" />
            </svg>
            <label htmlFor="ha-loc" className="sr-only">Where do you want to go?</label>
            <input
              id="ha-loc"
              type="search"
              autoComplete="off"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Where to? Kerala, Manali, Jaipur…"
              className="flex-1 min-w-0 min-h-12 border-0 bg-transparent text-[#1F2A2E] text-base outline-none placeholder:text-[#8A9296]"
            />
            <Button type="submit" size="lg" className="ha-cta ha-searchbtn shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
              <span className="ha-btntext">Find rooms</span>
            </Button>
          </form>

          <div className="ha-in ha-d5 ha-chips flex flex-wrap gap-2" role="group" aria-label="Popular destinations">
            {PLACES.map((place) => {
              const selected = query.trim().toLowerCase() === place.toLowerCase();
              return (
                <Button
                  key={place}
                  type="button"
                  variant="chip"
                  active={selected}
                  aria-pressed={selected}
                  onClick={() => setQuery(place)}
                >
                  {place}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="ha-stage flex-1 relative h-[560px] min-w-0 max-[900px]:w-full max-[900px]:flex-none" aria-hidden="true">
          <svg viewBox="0 0 560 560" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible">
            <path className="ha-route" d="M120 150 C 260 60, 420 120, 440 230 S 330 430, 220 450" fill="none" stroke={LINE} strokeWidth="2" />
            <path className="ha-routeDash" d="M120 150 C 260 60, 420 120, 440 230 S 330 430, 220 450" fill="none" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" />
          </svg>

          <figure className="ha-cardA absolute left-0 top-[30px] w-[46%] m-0 px-2 pt-2 pb-3 bg-white rounded-2xl shadow-[0_24px_48px_rgba(31,42,46,0.18)]">
            <div className="aspect-[4/5] rounded-[10px] overflow-hidden relative">
              <Image src="https://images.unsplash.com/photo-1535262412227-85541e910204?auto=format&fit=crop&w=900&q=80" alt="" fill sizes="280px" className="ha-kb object-cover" priority />
            </div>
            <figcaption className="px-1 pt-2.5 flex justify-between gap-2 text-[13px] text-[#1F2A2E]">
              <strong>Varkala</strong>
              <span className="text-[#5B6468]">Kerala</span>
            </figcaption>
          </figure>

          <figure className="ha-cardB absolute right-0 top-[120px] w-[40%] m-0 px-2 pt-2 pb-3 bg-white rounded-2xl shadow-[0_24px_48px_rgba(31,42,46,0.18)]">
            <div className="aspect-square rounded-[10px] overflow-hidden relative">
              <Image src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=80" alt="" fill sizes="240px" className="ha-kb object-cover [animation-delay:-4s]" />
            </div>
            <figcaption className="px-1 pt-2.5 flex justify-between gap-2 text-[13px] text-[#1F2A2E]">
              <strong>Manali</strong>
              <span className="text-[#5B6468]">Himachal</span>
            </figcaption>
          </figure>

          <figure className="ha-cardC absolute left-[24%] bottom-0 w-[42%] m-0 px-2 pt-2 pb-3 bg-white rounded-2xl shadow-[0_24px_48px_rgba(31,42,46,0.18)]">
            <div className="aspect-[16/10] rounded-[10px] overflow-hidden relative">
              <Image src="https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=80" alt="" fill sizes="260px" className="ha-kb object-cover [animation-delay:-8s]" />
            </div>
            <figcaption className="px-1 pt-2.5 flex justify-between gap-2 text-[13px] text-[#1F2A2E]">
              <strong>Jaipur</strong>
              <span className="text-[#5B6468]">Rajasthan</span>
            </figcaption>
          </figure>

          <span className="ha-pin ha-pin1 absolute left-[19%] top-[24%] w-[18px] h-[18px] rounded-full bg-accent border-[3px] border-white shadow-[0_4px_10px_rgba(0,0,0,0.2)]" />
          <span className="ha-pin ha-pin2 absolute left-[77%] top-[39%] w-[18px] h-[18px] rounded-full bg-accent border-[3px] border-white shadow-[0_4px_10px_rgba(0,0,0,0.2)]" />
          <span className="ha-pin ha-pin3 absolute left-[38%] top-[79%] w-[18px] h-[18px] rounded-full bg-accent border-[3px] border-white shadow-[0_4px_10px_rgba(0,0,0,0.2)]" />

          <div className="ha-badge ha-b1 absolute left-[34%] top-[4%] flex items-center gap-2 px-3 py-2 rounded-xl bg-[#FFFDF9] shadow-[0_12px_28px_rgba(31,42,46,0.14)] text-[13px] whitespace-nowrap">
            <span className="font-semibold">From ₹2,400</span>
            <span className="text-[#5B6468]">/ night</span>
          </div>
          <div className="ha-badge ha-b2 absolute right-[2%] bottom-[14%] flex items-center gap-2 px-3 py-2 rounded-xl bg-[#FFFDF9] shadow-[0_12px_28px_rgba(31,42,46,0.14)] text-[13px] whitespace-nowrap">
            <span className="w-[26px] h-[26px] rounded-lg bg-[#E5F2EA] text-[#1E7A4C] inline-flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12l5 5L19 7" />
              </svg>
            </span>
            <span>No booking fees</span>
          </div>
        </div>
      </div>
    </section>
  );
}
