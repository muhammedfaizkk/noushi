"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Room } from "@/data/rooms";

interface RoomCardProps {
  room: Room;
  onSelectRoom: (room: Room) => void;
}

export function RoomCard({ room, onSelectRoom }: RoomCardProps) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col">
      {/* Image Container with Badges */}
      <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-stone-100">
        <Image
          src={room.image}
          alt={room.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top-Left Category Badge */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <span className="bg-white/95 backdrop-blur-sm text-stone-800 text-[11px] font-semibold tracking-wide px-3 py-1 rounded-full shadow-sm">
            {room.category}
          </span>
        </div>

        {/* Top-Right Favorite / Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setLiked(!liked);
          }}
          className="absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center text-stone-600 hover:text-rose-500 shadow-sm transition-all duration-200 active:scale-90"
          aria-label="Save to wishlist"
        >
          <Heart
            size={15}
            className={liked ? "fill-rose-500 text-rose-500" : ""}
          />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title & Number */}
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-serif text-[17px] font-medium text-[#1c2826] tracking-tight group-hover:text-[#144e47] transition-colors line-clamp-1">
              {room.title}
            </h3>
            <span className="text-xs font-mono text-stone-400 whitespace-nowrap">
              — {room.number}
            </span>
          </div>

          {/* Location */}
          <p className="text-xs text-stone-500 mt-1 font-normal">
            {room.location}
          </p>

          {/* Feature Tags */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {room.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-[#f0ece2] text-stone-600 text-[11px] font-normal px-2.5 py-1 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer: Price & CTA */}
        <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-stone-500">From </span>
            <span className="text-base font-bold text-stone-900 tracking-tight">
              {room.formattedPrice}
            </span>
            <span className="text-xs text-stone-500 font-normal"> / night</span>
          </div>

          <button
            onClick={() => onSelectRoom(room)}
            className="bg-[#144e47] hover:bg-[#0e3b35] text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors duration-150 cursor-pointer shadow-sm"
          >
            View room
          </button>
        </div>
      </div>
    </div>
  );
}
