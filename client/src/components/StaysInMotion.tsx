"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, REELS, reelWatchUrl } from "@/data/reels";

const GAP = 14;

function cardsPerView(width: number) {
  if (width >= 1024) return 3.2;
  if (width >= 640) return 2.15;
  return 1.32;
}

function InstagramMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function StaysInMotion() {
  const clips = REELS;
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef(0);
  const dragging = useRef(false);
  const dragged = useRef(false);
  const [perView, setPerView] = useState(1.32);
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
  const edgePeek = perView < 2 ? 16 : 0;
  const slides = [...clips, ...clips.slice(0, Math.ceil(perView))];

  useEffect(() => {
    if (paused || clips.length <= perView || cardWidth === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      setAnimate(true);
      setIndex((current) => (current >= clips.length ? current : current + 1));
    }, 6000);

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
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="m-0 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              On Instagram
              <span className="h-px w-8 bg-accent" />
            </p>
            <h2
              className="mt-3 text-[32px] sm:text-4xl font-medium leading-[1.1] tracking-[-0.02em] text-ink"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              See the stays in motion
            </h2>
            <p className="mt-2 max-w-md text-[15px] leading-relaxed text-[#4E585C]">
              Short reels from our rooms and the places around them.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#D6CCBD] bg-white px-4 py-2.5 text-sm font-medium text-ink"
            >
              <InstagramMark className="h-[18px] w-[18px]" />
              Follow @{INSTAGRAM_HANDLE}
            </a>
          </div>
          <div className="hidden md:flex items-center gap-2 shrink-0">
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

        <div
          ref={viewportRef}
          className="mt-7 overflow-hidden cursor-grab active:cursor-grabbing"
          onPointerDown={(event) => {
            dragging.current = true;
            dragged.current = false;
            dragStart.current = event.clientX;
          }}
          onPointerMove={(event) => {
            if (!dragging.current) return;
            if (Math.abs(event.clientX - dragStart.current) > 8) dragged.current = true;
          }}
          onPointerUp={(event) => {
            if (!dragging.current) return;
            dragging.current = false;
            const delta = event.clientX - dragStart.current;
            if (delta > 48) prev();
            else if (delta < -48) next();
          }}
          onPointerCancel={() => {
            dragging.current = false;
          }}
          onClickCapture={(event) => {
            if (!dragged.current) return;
            event.preventDefault();
            event.stopPropagation();
            dragged.current = false;
          }}
        >
          <div
            className="flex"
            onTransitionEnd={handleTransitionEnd}
            style={{
              gap: GAP,
              transform: cardWidth ? `translate3d(${-index * step - edgePeek}px, 0, 0)` : undefined,
              transition: animate ? "transform 500ms ease" : "none",
            }}
          >
            {slides.map((reel, slideIndex) => (
              <a
                key={`${reel.id}-${slideIndex}`}
                href={reelWatchUrl(reel.shortcode)}
                target="_blank"
                rel="noreferrer"
                className="relative block shrink-0 overflow-hidden rounded-[22px] bg-stone-200 aspect-[3/4]"
                style={{ width: cardWidth || undefined, flexBasis: cardWidth || undefined }}
                aria-label={`${reel.title}, ${reel.location}`}
              >
                <Image
                  src={reel.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 78vw, 320px"
                  className="object-cover"
                />
                <span className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/5 to-black/75" />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-[12px] font-medium text-white backdrop-blur-sm">
                  <InstagramMark className="h-3.5 w-3.5" />
                  Reel
                </span>
                <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/92 text-ink shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
                  <svg viewBox="0 0 24 24" className="ml-0.5 h-6 w-6" aria-hidden="true">
                    <path d="M8 5.5v13l11-6.5-11-6.5z" fill="currentColor" />
                  </svg>
                </span>
                <span className="absolute inset-x-0 bottom-0 px-4 pb-4 pt-10 text-white">
                  <span className="block text-[15px] font-semibold leading-snug">{reel.title}</span>
                  <span className="mt-1 block text-[13px] text-white/85">{reel.location}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
