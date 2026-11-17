"use client";

import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

interface SearchWidgetProps {
  destination: string;
  onDestinationChange: (destination: string) => void;
  onSearch: (filters: { destination: string }) => void;
}

const DESTINATIONS = ["Anywhere", "Varkala", "Manali", "Jaipur", "Coorg", "Goa", "Gokarna", "Kerala"];

export function SearchWidget({ destination, onDestinationChange, onSearch }: SearchWidgetProps) {
  const [destOpen, setDestOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDestOpen(false);
    onSearch({ destination });
    document.getElementById("rooms")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <form
        onSubmit={handleSearchSubmit}
        className="bg-white rounded-2xl md:rounded-full shadow-[0_16px_40px_rgba(0,0,0,0.12)] flex flex-col md:flex-row md:items-center"
      >
        <div className="relative flex-1 min-w-0">
          <button
            type="button"
            onClick={() => setDestOpen((open) => !open)}
            className="w-full text-left px-5 py-3.5 md:py-4"
            aria-expanded={destOpen}
            aria-haspopup="listbox"
          >
            <span className="block text-[10px] font-medium uppercase tracking-[0.16em] text-stone-400">
              Where
            </span>
            <span className="mt-0.5 flex items-center justify-between gap-3 text-sm font-medium text-stone-800">
              <span className="truncate">{destination}</span>
              <ChevronDown size={14} className="text-stone-400 shrink-0" />
            </span>
          </button>
          {destOpen && (
            <div
              role="listbox"
              className="absolute left-3 right-3 md:w-56 top-full mt-2 bg-white rounded-xl shadow-xl border border-stone-200 py-1.5 z-30"
            >
              {DESTINATIONS.map((item) => (
                <button
                  key={item}
                  type="button"
                  role="option"
                  aria-selected={destination === item}
                  onClick={() => {
                    onDestinationChange(item);
                    setDestOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-stone-50 ${
                    destination === item ? "text-[#1c7a4a] font-medium" : "text-stone-700"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-2 shrink-0">
          <button
            type="submit"
            className="w-full md:w-auto bg-[#1c7a4a] hover:bg-[#17663e] text-white px-5 py-3.5 rounded-xl md:rounded-full text-sm font-medium inline-flex items-center justify-center gap-2"
          >
            <Search size={16} />
            Check availability
          </button>
        </div>
      </form>
    </div>
  );
}
