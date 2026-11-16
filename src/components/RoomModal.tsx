"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Room } from "@/data/rooms";
import { X, Check, MessageCircle, MapPin, Sparkles, Calendar } from "lucide-react";

interface RoomModalProps {
  room: Room | null;
  onClose: () => void;
}

export function RoomModal({ room, onClose }: RoomModalProps) {
  const [nights, setNights] = useState(2);
  const [guestCount, setGuestCount] = useState(2);

  if (!room) return null;

  const totalCost = room.price * nights;
  const whatsappMessage = encodeURIComponent(
    `Hi ${room.host.name}, I would like to inquire about booking "${room.title}" (${room.location}) for ${nights} nights (${guestCount} guests).`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-stone-700 hover:text-stone-950 hover:bg-white shadow-md transition cursor-pointer"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Hero Image */}
        <div className="relative h-64 sm:h-72 w-full bg-stone-100">
          <Image
            src={room.image}
            alt={room.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Tag on image */}
          <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between text-white">
            <div>
              <span className="bg-[#144e47] text-white text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md mb-1.5 inline-block">
                {room.category}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight">
                {room.title}
              </h2>
              <p className="text-xs text-stone-200 flex items-center gap-1 mt-0.5">
                <MapPin size={13} /> {room.location}
              </p>
            </div>
            <span className="font-mono text-sm text-stone-200">
              — {room.number}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[calc(85vh-18rem)] overflow-y-auto">
          {/* Description */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-400 mb-2">
              The Space
            </h4>
            <p className="text-sm text-stone-600 leading-relaxed">
              {room.description}
            </p>
          </div>

          {/* Highlights & Amenities */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-400 mb-3 flex items-center gap-1.5">
              <Sparkles size={14} className="text-[#144e47]" /> Amenities &
              Inclusions
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {room.amenities.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-xs text-stone-700 bg-stone-50 px-3 py-2 rounded-lg border border-stone-100"
                >
                  <Check size={14} className="text-[#144e47] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Host info card */}
          <div className="bg-[#f7f4ed] rounded-xl p-4 border border-stone-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#144e47] text-white flex items-center justify-center font-serif text-sm font-bold">
                {room.host.name[0]}
              </div>
              <div>
                <p className="text-xs font-semibold text-stone-900">
                  Hosted by {room.host.name}
                </p>
                <p className="text-[11px] text-stone-500">
                  Replies {room.host.responseSpeed.toLowerCase()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Verified Host
            </div>
          </div>

          {/* Quick Stay Calculator */}
          <div className="pt-2 border-t border-stone-100">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-stone-400" />
                <span className="text-xs text-stone-600 font-medium">
                  Number of nights:
                </span>
                <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden ml-1">
                  <button
                    onClick={() => setNights(Math.max(1, nights - 1))}
                    className="px-2.5 py-1 text-xs text-stone-600 hover:bg-stone-100"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-semibold text-stone-800">
                    {nights}
                  </span>
                  <button
                    onClick={() => setNights(nights + 1)}
                    className="px-2.5 py-1 text-xs text-stone-600 hover:bg-stone-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-stone-400 block">Total Est.</span>
                <span className="text-lg font-bold text-stone-900">
                  ₹{totalCost.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Direct WhatsApp Booking Button */}
            <a
              href={`https://wa.me/${room.host.phone.replace(/[^0-9]/g, "")}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#144e47] hover:bg-[#0e3b35] text-white py-3.5 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition cursor-pointer"
            >
              <MessageCircle size={18} />
              <span>Talk to {room.host.name} on WhatsApp</span>
            </a>
            <p className="text-[11px] text-center text-stone-400 mt-2">
              Direct with host &bull; No booking platform fees
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
