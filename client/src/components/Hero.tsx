"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "./ui/Button";

interface HeroProps {
  onSearch: (filters: { destination: string }) => void;
}

const WORDS = ["by the sea.", "in the hills.", "in a haveli.", "on an estate."];
const PLACES = ["Kerala", "Karnataka", "Manali", "Jaipur", "Coorg", "Goa", "Gokarna"];

const SLIDES = [
  {
    id: "varkala",
    city: "Varkala",
    region: "Kerala",
    image: "https://images.unsplash.com/photo-1535262412227-85541e910204?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "manali",
    city: "Manali",
    region: "Himachal",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "jaipur",
    city: "Jaipur",
    region: "Rajasthan",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "coorg",
    city: "Coorg",
    region: "Karnataka",
    image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "goa",
    city: "Goa",
    region: "Fontainhas",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "gokarna",
    city: "Gokarna",
    region: "Karnataka",
    image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "udaipur",
    city: "Udaipur",
    region: "Rajasthan",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "munnar",
    city: "Munnar",
    region: "Kerala",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "alleppey",
    city: "Alleppey",
    region: "Kerala",
    image: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "rishikesh",
    city: "Rishikesh",
    region: "Uttarakhand",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=900&q=80",
  },
];

function slideRole(index: number, active: number, total: number) {
  if (index === active) return "center";
  if (index === (active - 1 + total) % total) return "left";
  if (index === (active + 1) % total) return "right";
  return "hidden";
}

export function Hero({ onSearch }: HeroProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const dragStart = useRef(0);
  const dragging = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % WORDS.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % SLIDES.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, [paused]);

  const search = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch({ destination: query.trim() || "Anywhere" });
    document.getElementById("rooms")?.scrollIntoView({ behavior: "smooth" });
  };

  const go = (direction: -1 | 1) => {
    setActive((current) => (current + direction + SLIDES.length) % SLIDES.length);
  };

  return (
    <section aria-labelledby="ha-title" className="bg-[#FAF7F2] text-[#1F2A2E] overflow-x-clip">
      <div className="ha-wrap max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-8 pt-28 pb-16 md:pb-20 flex items-center gap-14 max-[900px]:flex-col max-[900px]:items-stretch max-[900px]:pt-24 max-[900px]:pb-10 max-[900px]:gap-5">
        <div className="ha-copy flex-1 min-w-0 max-w-[560px] flex flex-col gap-5 max-[900px]:max-w-none max-[900px]:gap-3.5">
          <h1
            id="ha-title"
            className="ha-in ha-d1 m-0 font-medium text-[2.625rem] leading-[1.05] tracking-[-0.02em] min-[901px]:text-[clamp(2.75rem,4.8vw,4.125rem)]"
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

          <p className="ha-sub ha-in ha-d3 m-0 text-[15px] sm:text-lg text-[#4E585C] max-w-[470px]">
            <span className="min-[901px]:hidden">Handpicked stays across India. Book direct, no fees.</span>
            <span className="hidden min-[901px]:inline">Handpicked rooms by the sea, in the hills and in old city quarters across India. Book direct, no platform fees.</span>
          </p>

          <form
            role="search"
            onSubmit={search}
            className="ha-search ha-in ha-d4 flex w-full items-center gap-1.5 py-1.5 pr-1.5 pl-[18px] rounded-2xl bg-[#FFFDF9] border border-[#D6CCBD] shadow-[0_12px_30px_rgba(31,42,46,0.08)]"
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
              placeholder="Search Kerala, Manali..."
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

          <div className="ha-in ha-d5 ha-chips flex w-full flex-wrap gap-2" role="group" aria-label="Popular destinations">
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

        <div
          className="ha-stage ha-in ha-d4 flex-1 relative h-[560px] min-w-0 max-[900px]:w-full max-[900px]:flex-none touch-pan-y"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onPointerDown={(event) => {
            dragging.current = true;
            dragStart.current = event.clientX;
          }}
          onPointerUp={(event) => {
            if (!dragging.current) return;
            dragging.current = false;
            const delta = event.clientX - dragStart.current;
            if (delta > 40) go(-1);
            else if (delta < -40) go(1);
          }}
          onPointerCancel={() => {
            dragging.current = false;
          }}
        >
          <div className="ha-slider absolute inset-0" aria-roledescription="carousel" aria-label="Featured stays">
            {SLIDES.map((slide, index) => {
              const role = slideRole(index, active, SLIDES.length);
              return (
                <figure
                  key={slide.id}
                  className={`ha-slide ha-slide-${role} m-0 px-2 pt-2 pb-3 bg-white rounded-[22px] shadow-[0_20px_40px_rgba(31,42,46,0.16)]`}
                  aria-hidden={role !== "center"}
                >
                  <div className="ha-slide-media relative overflow-hidden rounded-[14px]">
                    <Image
                      src={slide.image}
                      alt=""
                      fill
                      sizes="(max-width: 900px) 60vw, 320px"
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                  <figcaption className="px-1.5 pt-2.5 flex justify-between gap-2 text-[13px] text-[#1F2A2E]">
                    <strong className="font-semibold">{slide.city}</strong>
                    <span className="text-[#5B6468]">{slide.region}</span>
                  </figcaption>
                </figure>
              );
            })}
          </div>

          <div className="ha-badge ha-b1 absolute left-1/2 -translate-x-1/2 bottom-2 z-20 flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#FFFDF9] shadow-[0_12px_28px_rgba(31,42,46,0.14)] text-[13px] whitespace-nowrap">
            <span className="font-semibold">From ₹2,400</span>
            <span className="text-[#5B6468]">/ night</span>
          </div>

          <div className="ha-badge ha-b2 absolute right-[4%] bottom-[18%] z-20 flex items-center gap-2 px-3 py-2 rounded-xl bg-[#FFFDF9] shadow-[0_12px_28px_rgba(31,42,46,0.14)] text-[13px] whitespace-nowrap max-[900px]:hidden">
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
