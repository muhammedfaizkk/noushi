"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { ROOMS } from "@/data/rooms";

const GAP = 16;

function cardsPerView(width: number) {
  if (width >= 1024) return 4;
  if (width >= 640) return 2;
  return 1;
}

export function StaysInMotion() {
  const clips = ROOMS;
  const viewportRef = useRef<HTMLDivElement>(null);
  const [perView, setPerView] = useState(1);
  const [cardWidth, setCardWidth] = useState(0);
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const measure = () => {
      const width = viewport.clientWidth;
      const count = Math.min(cardsPerView(width), clips.length);
      const nextWidth = (width - (count - 1) * GAP) / count;
      setPerView(count);
      setCardWidth(nextWidth);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [clips.length]);

  useEffect(() => {
    setAnimate(false);
    setIndex(0);
  }, [perView]);

  const step = cardWidth + GAP;
  const slides = [...clips, ...clips.slice(0, perView)];

  useEffect(() => {
    if (paused || clips.length <= perView || cardWidth === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      setAnimate(true);
      setIndex((current) => (current >= clips.length ? current : current + 1));
    }, 4000);

    return () => window.clearInterval(id);
  }, [paused, perView, cardWidth, clips.length]);

  const next = () => {
    if (clips.length <= perView) return;
    setAnimate(true);
    setIndex((current) => (current >= clips.length ? current : current + 1));
  };

  const prev = () => {
    if (clips.length <= perView) return;
    if (index === 0) {
      setAnimate(false);
      setIndex(clips.length);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimate(true);
          setIndex(clips.length - 1);
        });
      });
      return;
    }
    setAnimate(true);
    setIndex((current) => current - 1);
  };

  const handleTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.propertyName !== "transform") return;
    if (index < clips.length) return;
    setAnimate(false);
    setIndex(0);
  };

  return (
    <section
      className="py-16 md:py-24 bg-[#faf7f2]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <span className="text-xs uppercase tracking-widest text-[#144e47] font-semibold block mb-2">
              Stays in motion
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1c2826] font-normal tracking-tight">
              See the stays in motion
            </h2>
            <p className="mt-2 text-sm text-stone-500 max-w-lg">
              A short look at the rooms, the light, and the places around them.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous stays"
              className="w-10 h-10 rounded-full border border-stone-300 bg-white text-stone-700 hover:border-stone-500 flex items-center justify-center"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next stays"
              className="w-10 h-10 rounded-full border border-stone-300 bg-white text-stone-700 hover:border-stone-500 flex items-center justify-center"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div ref={viewportRef} className="mt-8 overflow-hidden">
          <div
            className="flex"
            onTransitionEnd={handleTransitionEnd}
            style={{
              gap: GAP,
              transform: cardWidth ? `translate3d(${-index * step}px, 0, 0)` : undefined,
              transition: animate ? "transform 500ms ease" : "none",
            }}
          >
            {slides.map((room, slideIndex) => (
              <Link
                key={`${room.id}-${slideIndex}`}
                href={`/rooms/${room.id}`}
                className="group relative shrink-0 aspect-[3/4] rounded-2xl overflow-hidden bg-stone-200"
                style={{ width: cardWidth || undefined, flexBasis: cardWidth || undefined }}
              >
                <Image
                  src={room.image}
                  alt={room.title}
                  fill
                  sizes="(max-width: 640px) 90vw, 280px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/10" />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 text-[#1c2422] flex items-center justify-center shadow-md">
                  <Play size={18} className="ml-0.5 fill-current" />
                </span>
                <span className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <span className="block text-sm font-medium leading-snug">{room.title}</span>
                  <span className="block text-xs text-white/80 mt-0.5">{room.location}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
