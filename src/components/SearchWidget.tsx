"use client";

import React, { useState } from "react";
import { MapPin, Calendar, Users, Search, ChevronDown } from "lucide-react";

interface SearchWidgetProps {
  onSearch: (filters: { destination: string; guests: string }) => void;
}

export function SearchWidget({ onSearch }: SearchWidgetProps) {
  const [destination, setDestination] = useState("Anywhere");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2 guests");
  const [destDropdownOpen, setDestDropdownOpen] = useState(false);
  const [guestDropdownOpen, setGuestDropdownOpen] = useState(false);

  const destinations = [
    "Anywhere",
    "Kerala (Varkala)",
    "Himachal (Manali)",
    "Rajasthan (Jaipur)",
    "Karnataka (Coorg)",
    "Karnataka (Gokarna)",
    "Goa (Fontainhas)",
  ];

  const guestOptions = [
    "1 guest",
    "2 guests",
    "3 guests",
    "4+ guests",
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ destination, guests });
    // Smooth scroll down to rooms section
    const roomsEl = document.getElementById("rooms");
    if (roomsEl) {
      roomsEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 relative z-20">
      <form
        onSubmit={handleSearchSubmit}
        className="bg-white rounded-2xl md:rounded-full p-2.5 sm:p-3 shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-stone-200/90 flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-stone-200"
      >
        {/* Destination / Where */}
        <div className="relative flex-1 px-4 py-2 hover:bg-stone-50/80 rounded-xl transition cursor-pointer">
          <div
            onClick={() => {
              setDestDropdownOpen(!destDropdownOpen);
              setGuestDropdownOpen(false);
            }}
            className="flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-full bg-[#144e47]/10 flex items-center justify-center text-[#144e47] shrink-0">
              <MapPin size={18} />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <span className="block text-[11px] font-medium uppercase tracking-wider text-stone-400">
                Where
              </span>
              <div className="flex items-center justify-between text-stone-800 text-sm font-semibold truncate">
                <span>{destination}</span>
                <ChevronDown size={14} className="text-stone-400 ml-1 shrink-0" />
              </div>
            </div>
          </div>

          {destDropdownOpen && (
            <div className="absolute left-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-stone-200 py-1.5 z-30 animate-in fade-in zoom-in-95 duration-150">
              {destDestinations(destinations, (dest) => {
                setDestination(dest);
                setDestDropdownOpen(false);
              })}
            </div>
          )}
        </div>

        {/* Check In */}
        <div className="flex-1 px-4 py-2 hover:bg-stone-50/80 rounded-xl transition">
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-[#144e47]/10 flex items-center justify-center text-[#144e47] shrink-0">
              <Calendar size={18} />
            </div>
            <div className="flex-1 text-left min-w-0">
              <span className="block text-[11px] font-medium uppercase tracking-wider text-stone-400">
                Check in
              </span>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                placeholder="dd-mm-yyyy"
                className="w-full text-sm font-semibold text-stone-800 bg-transparent focus:outline-none cursor-pointer"
              />
            </div>
          </label>
        </div>

        {/* Check Out */}
        <div className="flex-1 px-4 py-2 hover:bg-stone-50/80 rounded-xl transition">
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-[#144e47]/10 flex items-center justify-center text-[#144e47] shrink-0">
              <Calendar size={18} />
            </div>
            <div className="flex-1 text-left min-w-0">
              <span className="block text-[11px] font-medium uppercase tracking-wider text-stone-400">
                Check out
              </span>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                placeholder="dd-mm-yyyy"
                className="w-full text-sm font-semibold text-stone-800 bg-transparent focus:outline-none cursor-pointer"
              />
            </div>
          </label>
        </div>

        {/* Guests */}
        <div className="relative flex-1 px-4 py-2 hover:bg-stone-50/80 rounded-xl transition cursor-pointer">
          <div
            onClick={() => {
              setGuestDropdownOpen(!guestDropdownOpen);
              setDestDropdownOpen(false);
            }}
            className="flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-full bg-[#144e47]/10 flex items-center justify-center text-[#144e47] shrink-0">
              <Users size={18} />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <span className="block text-[11px] font-medium uppercase tracking-wider text-stone-400">
                Guests
              </span>
              <div className="flex items-center justify-between text-stone-800 text-sm font-semibold truncate">
                <span>{guests}</span>
                <ChevronDown size={14} className="text-stone-400 ml-1 shrink-0" />
              </div>
            </div>
          </div>

          {guestDropdownOpen && (
            <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-stone-200 py-1.5 z-30 animate-in fade-in zoom-in-95 duration-150">
              {guestOptions.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => {
                    setGuests(g);
                    setGuestDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs md:text-sm font-medium hover:bg-stone-100 transition ${
                    guests === g ? "text-[#144e47] font-semibold bg-stone-50" : "text-stone-700"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Action Submit Button */}
        <div className="p-1 md:pl-3">
          <button
            type="submit"
            className="w-full md:w-auto bg-[#144e47] hover:bg-[#0e3b35] text-white px-6 py-3.5 rounded-xl md:rounded-full font-medium text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            <Search size={16} />
            <span>Check availability</span>
          </button>
        </div>
      </form>
    </div>
  );
}

function destDestinations(
  items: string[],
  onSelect: (dest: string) => void
) {
  return items.map((item) => (
    <button
      key={item}
      type="button"
      onClick={() => onSelect(item)}
      className="w-full text-left px-4 py-2 text-xs md:text-sm text-stone-700 hover:bg-stone-100 transition font-medium"
    >
      {item}
    </button>
  ));
}
