"use client";

import React, { useState, useMemo } from "react";
import { ROOMS } from "@/data/rooms";
import { RoomCard } from "./RoomCard";
import { Button } from "./ui/Button";
import { ChevronDown } from "lucide-react";

interface RoomsSectionProps {
  searchFilter?: { destination: string } | null;
}

export function RoomsSection({ searchFilter }: RoomsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");
  const [sortOpen, setSortOpen] = useState(false);

  const categories = ["All", "Beach", "Mountains", "City", "Countryside"];

  // Filter & sort logic
  const filteredRooms = useMemo(() => {
    return ROOMS.filter((room) => {
      // Category filter
      if (selectedCategory !== "All") {
        if (selectedCategory === "Mountains" && room.category !== "Mountain") {
          return false;
        }
        if (selectedCategory !== "Mountains" && room.category !== selectedCategory) {
          return false;
        }
      }

      // Search destination filter
      if (searchFilter && searchFilter.destination !== "Anywhere") {
        const destLower = searchFilter.destination.toLowerCase();
        const matchesLocation =
          room.location.toLowerCase().includes(destLower.split(" ")[0]) ||
          room.state.toLowerCase().includes(destLower.split(" ")[0]);
        if (!matchesLocation) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return parseInt(a.number) - parseInt(b.number);
    });
  }, [selectedCategory, sortBy, searchFilter]);

  const sortLabel = {
    featured: "Featured",
    "price-asc": "Price: Low to High",
    "price-desc": "Price: High to Low",
  }[sortBy];

  return (
    <section id="rooms" className="pt-10 pb-16 md:py-20 bg-[#faf7f2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-200/60">
          <div>
            <span className="text-xs uppercase tracking-widest text-accent font-semibold block mb-2">
              OUR ROOMS &mdash;
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1c2826] font-normal tracking-tight">
              The most memorable rest starts here.
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1.5 font-normal">
              {filteredRooms.length} {filteredRooms.length === 1 ? "room" : "rooms"}
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="relative self-start md:self-auto">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setSortOpen(!sortOpen)}
            >
              <span className="text-stone-400">Sort by:</span>
              <span className="font-medium text-stone-800">{sortLabel}</span>
              <ChevronDown size={14} className="text-stone-400" />
            </Button>

            {sortOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-48 bg-white rounded-xl shadow-lg border border-stone-200 py-1.5 z-20 animate-in fade-in zoom-in-95 duration-100">
                <button
                  onClick={() => {
                    setSortBy("featured");
                    setSortOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs font-medium hover:bg-stone-50 transition ${
                    sortBy === "featured" ? "text-accent font-semibold" : "text-stone-700"
                  }`}
                >
                  Featured
                </button>
                <button
                  onClick={() => {
                    setSortBy("price-asc");
                    setSortOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs font-medium hover:bg-stone-50 transition ${
                    sortBy === "price-asc" ? "text-accent font-semibold" : "text-stone-700"
                  }`}
                >
                  Price: Low to High
                </button>
                <button
                  onClick={() => {
                    setSortBy("price-desc");
                    setSortOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs font-medium hover:bg-stone-50 transition ${
                    sortBy === "price-desc" ? "text-accent font-semibold" : "text-stone-700"
                  }`}
                >
                  Price: High to Low
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 py-6">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <Button
                key={cat}
                type="button"
                variant="chip"
                size="sm"
                active={isActive}
                aria-pressed={isActive}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            );
          })}
        </div>

        {/* Room Cards Grid (3 columns on desktop, 2 on tablet, 1 on mobile) */}
        {filteredRooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mt-4">
            {filteredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 mt-6 max-w-lg mx-auto">
            <h3 className="font-serif text-lg font-medium text-stone-800">
              No rooms found
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Try adjusting your category filter or search criteria.
            </p>
            <Button
              type="button"
              size="sm"
              className="mt-4"
              onClick={() => setSelectedCategory("All")}
            >
              Reset filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
