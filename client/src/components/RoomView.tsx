"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Coffee,
  LayoutGrid,
  MapPin,
  Share2,
  Users,
  Waves,
  X,
} from "lucide-react";
import { Navbar } from "./Navbar";
import { Button } from "./ui/Button";
import { Room } from "@/data/rooms";

function isoDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function nightsBetween(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return 0;
  const ms = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  const nights = Math.round(ms / 86400000);
  return nights > 0 ? nights : 0;
}

function formatInr(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

const CLIFF_ABOUT =
  "A light room on the north cliff with a private balcony over the Arabian Sea. Five minutes on foot to the beach steps and cafes. Wake up to the sound of waves, spend the afternoon on the beach and come back for sunset from your balcony.";

const CLIFF_OFFERS = [
  "Sea-view balcony",
  "Air conditioning",
  "Hot water",
  "Wi-Fi",
  "Breakfast included",
  "Daily housekeeping",
];

function highlightsFor(room: Room) {
  if (room.id === "varkala-cliff") {
    return [
      { title: "Sea view", text: "Private balcony over the Arabian Sea", icon: Waves },
      { title: "5 min to beach", text: "Easy steps down the north cliff", icon: MapPin },
      { title: "Breakfast", text: "Kerala breakfast every morning", icon: Coffee },
    ];
  }

  return room.tags.slice(0, 3).map((tag, i) => ({
    title: tag,
    text:
      room.amenities[i] && room.amenities[i] !== tag
        ? room.amenities[i]
        : room.category,
    icon: Check,
  }));
}

function offersFor(room: Room) {
  if (room.id === "varkala-cliff") return CLIFF_OFFERS;
  const fromAmenities = room.amenities.slice(0, 6);
  return fromAmenities.length > 0 ? fromAmenities : room.tags;
}

export function RoomView({ room }: { room: Room }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  useEffect(() => {
    const start = new Date();
    start.setDate(start.getDate() + 7);
    const end = new Date(start);
    end.setDate(end.getDate() + 3);
    setCheckIn(isoDate(start));
    setCheckOut(isoDate(end));
  }, []);
  const [guests, setGuests] = useState(Math.min(2, room.maxGuests));
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [photosOpen, setPhotosOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [bookInView, setBookInView] = useState(true);
  const bookRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = bookRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setBookInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const nights = nightsBetween(checkIn, checkOut);
  const total = room.price * nights;
  const highlights = highlightsFor(room);
  const offers = offersFor(room);
  const photos = [room.image, room.image];
  const rulesLabel = room.category === "Beach" ? "Beach rules" : "House rules";

  const guestOptions = useMemo(
    () => Array.from({ length: room.maxGuests }, (_, i) => i + 1),
    [room.maxGuests]
  );

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: room.title, url });
        return;
      } catch {
        // Fall through to copy.
      }
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const book = () => {
    const guestLine = guests === 1 ? "1 guest" : `${guests} guests`;
    const text = [
      `Hi ${room.host.name}, I would like to book ${room.title} in ${room.location}.`,
      checkIn && checkOut ? `Check-in ${checkIn}, check-out ${checkOut} (${nights} nights).` : "",
      guestLine,
      phone ? `My WhatsApp: +91 ${phone}` : "",
      message ? `Note: ${message}` : "",
    ]
      .filter(Boolean)
      .join(" ");
    const host = room.host.phone.replace(/[^0-9]/g, "");
    window.open(`https://wa.me/${host}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-[#f6f3ec] text-[#1c2826]">
      <Navbar variant="solid" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-28 lg:pb-16 pt-20">
        <div className="mb-4 flex items-center justify-between">
          <Link
            href="/#rooms"
            className="inline-flex items-center gap-1.5 text-sm text-stone-700 hover:text-stone-950"
          >
            <ArrowLeft size={16} />
            All rooms
          </Link>
          <div className="flex items-center gap-3">
            {copied && <span className="text-xs text-stone-500">Link copied</span>}
            <button
              type="button"
              onClick={share}
              className="w-9 h-9 rounded-full border border-stone-300 bg-white/70 text-stone-600 hover:text-stone-900 hover:bg-white flex items-center justify-center"
              aria-label="Share room"
            >
              <Share2 size={16} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] gap-3 sm:h-[320px]">
          <div className="relative aspect-[4/3] sm:aspect-auto sm:h-full rounded-2xl overflow-hidden bg-stone-200">
            <Image
              src={photos[0]}
              alt={room.title}
              fill
              priority
              loading="eager"
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => setPhotosOpen(true)}
              className="sm:hidden absolute bottom-3 right-3 bg-white text-stone-800 text-xs font-medium px-3 py-1.5 rounded-lg shadow-sm inline-flex items-center gap-1.5"
            >
              <LayoutGrid size={13} />
              All photos
            </button>
          </div>
          <div className="relative hidden sm:block sm:h-full rounded-2xl overflow-hidden bg-stone-200">
            <Image
              src={photos[1]}
              alt=""
              fill
              loading="eager"
              sizes="30vw"
              className="object-cover object-[70%_center]"
            />
            <button
              type="button"
              onClick={() => setPhotosOpen(true)}
              className="absolute bottom-3 right-3 bg-white text-stone-800 text-xs font-medium px-3 py-1.5 rounded-lg shadow-sm inline-flex items-center gap-1.5 hover:bg-stone-50"
            >
              <LayoutGrid size={13} />
              All photos
            </button>
          </div>
        </div>

        <div className="mt-6 lg:mt-8 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] lg:grid-rows-[auto_1fr] gap-6 lg:gap-x-10 lg:gap-y-0 items-start">
          <header className="min-w-0 lg:col-start-1 lg:row-start-1">
            <p className="text-[11px] tracking-[0.18em] uppercase text-stone-500 font-medium">
              {room.category} · {room.number}
            </p>
            <h1 className="font-serif text-[1.7rem] leading-tight sm:text-4xl text-[#1c2826] mt-2 font-normal tracking-tight">
              {room.title}
            </h1>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-stone-600">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={15} className="text-stone-500 shrink-0" />
                {room.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Users size={15} className="text-stone-500 shrink-0" />
                Sleeps {room.maxGuests}
              </span>
            </div>
          </header>

          <div className="min-w-0 order-1 lg:order-none lg:col-start-1 lg:row-start-2 lg:mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="min-w-0 bg-white border border-stone-200/80 rounded-xl px-4 py-3.5">
                    <p className="text-sm font-semibold text-stone-900 inline-flex items-center gap-1.5">
                      <Icon size={15} className="text-accent" />
                      {item.title}
                    </p>
                    <p className="text-xs text-stone-500 mt-1 leading-relaxed">{item.text}</p>
                  </div>
                );
              })}
            </div>

            <section className="mt-9">
              <h2 className="text-base font-semibold text-stone-900">About this room</h2>
              <p className="mt-2 text-sm text-stone-600 leading-relaxed max-w-2xl">
                {room.id === "varkala-cliff" ? CLIFF_ABOUT : room.description}
              </p>
            </section>

            <section className="mt-9">
              <h2 className="text-base font-semibold text-stone-900">What this room offers</h2>
              <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-8 max-w-xl">
                {offers.map((offer) => (
                  <li key={offer} className="flex items-center gap-2 text-sm text-stone-700">
                    <Check size={15} className="text-accent shrink-0" />
                    {offer}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-9">
              <h2 className="text-base font-semibold text-stone-900">Good to know</h2>
              <dl className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 max-w-xl text-sm">
                <div>
                  <dt className="text-stone-500">Check-in</dt>
                  <dd className="text-stone-800 mt-0.5">From 12:00 PM</dd>
                </div>
                <div>
                  <dt className="text-stone-500">Check-out</dt>
                  <dd className="text-stone-800 mt-0.5">By 11:00 AM</dd>
                </div>
                <div>
                  <dt className="text-stone-500">Cancellation</dt>
                  <dd className="text-stone-800 mt-0.5">Free cancellation (7 days)</dd>
                </div>
                <div>
                  <dt className="text-stone-500">{rulesLabel}</dt>
                  <dd className="text-stone-800 mt-0.5">No smoking indoors, quiet after 10</dd>
                </div>
              </dl>
            </section>

            <section className="mt-9">
              <h2 className="text-base font-semibold text-stone-900">Where you&apos;ll be</h2>
              <p className="mt-2 text-sm text-stone-600">
                {room.id === "varkala-cliff"
                  ? "North Cliff, Varkala. Cafes and the beach steps are a short walk away."
                  : `${room.location}. Cafes and the neighbourhood are a short walk away.`}
              </p>
              <div className="mt-3 h-36 sm:h-44 rounded-2xl border border-stone-200 bg-[#ebe6dc] flex items-center justify-center gap-2 text-sm text-stone-600">
                <MapPin size={16} className="text-accent" />
                {room.location}
              </div>
            </section>
          </div>

          <aside
            id="book"
            ref={bookRef}
            className="scroll-mt-24 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:sticky lg:top-24 bg-white border border-stone-200 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] p-4 sm:p-5 min-w-0"
          >
            <p className="text-stone-900">
              <span className="text-2xl font-semibold tracking-tight">{room.formattedPrice}</span>
              <span className="text-sm text-stone-500"> / night</span>
            </p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="block min-w-0">
                <span className="text-[11px] text-stone-500">Check in</span>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="mt-1 w-full min-w-0 max-w-full border border-stone-200 rounded-lg px-2.5 py-2.5 text-base sm:text-sm text-stone-800 bg-white"
                />
              </label>
              <label className="block min-w-0">
                <span className="text-[11px] text-stone-500">Check out</span>
                <input
                  type="date"
                  value={checkOut}
                  min={checkIn}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="mt-1 w-full min-w-0 max-w-full border border-stone-200 rounded-lg px-2.5 py-2.5 text-base sm:text-sm text-stone-800 bg-white"
                />
              </label>
            </div>

            <label className="block mt-3">
              <span className="text-[11px] text-stone-500">Guests</span>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="mt-1 w-full min-w-0 border border-stone-200 rounded-lg px-2.5 py-2.5 text-base sm:text-sm text-stone-800 bg-white"
              >
                {guestOptions.map((count) => (
                  <option key={count} value={count}>
                    {count === 1 ? "1 guest" : `${count} guests`}
                  </option>
                ))}
              </select>
            </label>

            <label className="block mt-3">
              <span className="text-[11px] text-stone-500">WhatsApp number</span>
              <div className="mt-1 flex border border-stone-200 rounded-lg overflow-hidden">
                <span className="px-2.5 py-2 text-sm text-stone-500 bg-stone-50 border-r border-stone-200">
                  +91
                </span>
                <input
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, "").slice(0, 10))}
                  placeholder="10-digit mobile"
                  className="flex-1 min-w-0 px-2.5 py-2.5 text-base sm:text-sm text-stone-800 outline-none"
                />
              </div>
            </label>

            <label className="block mt-3">
              <span className="text-[11px] text-stone-500">Message</span>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Arrival time, special requests..."
                className="mt-1 w-full min-w-0 border border-stone-200 rounded-lg px-2.5 py-2.5 text-base sm:text-sm text-stone-800 outline-none resize-none"
              />
            </label>

            <p className="mt-4 text-sm text-stone-700">
              {nights > 0 ? (
                <>
                  {room.formattedPrice} × {nights} {nights === 1 ? "night" : "nights"} ={" "}
                  <span className="font-semibold text-stone-900">{formatInr(total)}</span>
                </>
              ) : (
                "Select your dates"
              )}
            </p>

            <Button type="button" block className="mt-3" onClick={book} disabled={nights < 1}>
              <WhatsAppIcon />
              Book via WhatsApp
            </Button>
            <p className="mt-2 text-center text-[11px] text-stone-500">
              No payment now. The host confirms on WhatsApp.
            </p>
          </aside>
        </div>
      </main>

      {!bookInView && (
        <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 border-t border-stone-200 bg-[#fbfaf7]/95 backdrop-blur-md px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] flex items-center justify-between gap-3">
          <p className="text-[#1c2826] min-w-0">
            <span className="text-lg font-semibold">{room.formattedPrice}</span>
            <span className="text-xs text-stone-500"> / night</span>
          </p>
          <Button
            type="button"
            size="sm"
            className="shrink-0"
            onClick={() => bookRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
          >
            <WhatsAppIcon />
            Book
          </Button>
        </div>
      )}

      {photosOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 p-4 sm:p-8 flex items-center justify-center">
          <button
            type="button"
            onClick={() => setPhotosOpen(false)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white text-stone-800 flex items-center justify-center"
            aria-label="Close photos"
          >
            <X size={18} />
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-5xl w-full">
            {photos.map((src, index) => (
              <div key={index} className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-stone-800">
                <Image
                  src={src}
                  alt={`${room.title} photo ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
      <path d="M20.5 3.5A11 11 0 0 0 2.1 16.7L1 23l6.5-1.1A11 11 0 0 0 20.5 3.5Zm-8.5 17a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-3.9.7.7-3.8-.2-.3A9.1 9.1 0 1 1 12 20.5Zm5-6.8c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.2-.3a.5.5 0 0 0 0-.5c0-.1-.6-1.4-.8-1.9s-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 12 12 0 0 0 4.5 4 15 15 0 0 0 1.5.6 3.6 3.6 0 0 0 1.7.1 2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .2-1.2c-.1-.1-.3-.2-.6-.3Z" />
    </svg>
  );
}
