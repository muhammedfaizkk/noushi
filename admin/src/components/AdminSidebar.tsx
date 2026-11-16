"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BedDouble,
  CalendarCheck2,
  ExternalLink,
  RefreshCw,
} from "lucide-react";

interface AdminSidebarProps {
  isBackendConnected: boolean | null;
  onRefresh?: () => void;
  pendingCount?: number;
  roomsCount?: number;
}

export function AdminSidebar({
  isBackendConnected,
  onRefresh,
  pendingCount = 0,
  roomsCount = 0,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const links = [
    {
      href: "/",
      label: "Overview",
      icon: LayoutDashboard,
      active: pathname === "/",
    },
    {
      href: "/rooms",
      label: "Rooms Management",
      icon: BedDouble,
      active: pathname === "/rooms",
      badge: roomsCount > 0 ? roomsCount : undefined,
    },
    {
      href: "/bookings",
      label: "Bookings & WhatsApp",
      icon: CalendarCheck2,
      active: pathname === "/bookings",
      badge: pendingCount > 0 ? `${pendingCount} new` : undefined,
      badgeColor: "bg-amber-600",
    },
  ];

  return (
    <aside className="w-full md:w-64 bg-[#111a18] text-stone-300 flex flex-col justify-between p-5 border-r border-stone-800 shrink-0">
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-3 pb-6 border-b border-stone-800">
          <div className="w-8 h-8 rounded-full border border-stone-400 text-stone-200 flex items-center justify-center font-serif text-sm">
            DS
          </div>
          <div>
            <h1 className="font-sans font-medium text-white text-sm tracking-tight">
              Driftwood Stays
            </h1>
            <span className="text-[10px] text-stone-400 tracking-wider uppercase font-semibold block">
              Admin App (Standalone)
            </span>
          </div>
        </div>

        {/* Links */}
        <nav className="mt-6 space-y-1.5 text-xs font-medium">
          {links.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition cursor-pointer ${
                  item.active
                    ? "bg-[#144e47] text-white shadow-sm font-semibold"
                    : "text-stone-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={16} />
                <div className="flex-1 flex items-center justify-between">
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full text-white font-medium ${
                        item.badgeColor || "bg-stone-800"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Bar */}
      <div className="pt-6 border-t border-stone-800 space-y-3">
        <div className="bg-stone-900/80 rounded-xl p-3 border border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                isBackendConnected
                  ? "bg-emerald-400 animate-pulse"
                  : "bg-amber-400"
              }`}
            />
            <span className="text-[11px] font-medium text-stone-300">
              {isBackendConnected ? "Next.js API :3001" : "Local Mode"}
            </span>
          </div>
          {onRefresh && (
            <button
              onClick={onRefresh}
              title="Refresh connection"
              className="text-stone-400 hover:text-white transition cursor-pointer"
            >
              <RefreshCw size={12} />
            </button>
          )}
        </div>

        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between text-xs font-medium text-stone-400 hover:text-white py-1 px-2 rounded-lg hover:bg-white/5 transition"
        >
          <span className="flex items-center gap-2">
            <ExternalLink size={14} /> View Storefront
          </span>
          <span className="text-[10px] text-stone-500">:3000</span>
        </a>
      </div>
    </aside>
  );
}
