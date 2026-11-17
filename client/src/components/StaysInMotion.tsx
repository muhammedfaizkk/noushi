"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { REELS, reelEmbedUrl } from "@/data/reels";

const GAP = 16;

function cardsPerView(width: number) {
  if (width >= 1024) return 3;
  if (width >= 640) return 2;
  return 1;
}

export function StaysInMotion() {
  const clips = REELS;
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <span className="text-xs uppercase tracking-widest text-accent font-semibold block mb-2">
              Stays in motion
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1c2826] font-normal tracking-tight">
              See the stays in motion
            </h2>
            <p className="mt-2 text-sm text-stone-500 max-w-lg">
              Instagram reels from the road, playing right here.
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
            {slides.map((reel, slideIndex) => (
              <div
                key={`${reel.id}-${slideIndex}`}
                className="shrink-0 overflow-hidden rounded-2xl border border-stone-200 bg-white"
                style={{ width: cardWidth || undefined, flexBasis: cardWidth || undefined }}
              >
                <iframe
                  src={reelEmbedUrl(reel.shortcode)}
                  title={`${reel.title}, ${reel.location}`}
                  loading="lazy"
                  scrolling="no"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  className="block w-full h-[540px] border-0 bg-white"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
