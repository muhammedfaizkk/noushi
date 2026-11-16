"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminSidebar } from "../components/AdminSidebar";
import { AdminHeader } from "../components/AdminHeader";
import {
  checkBackendConnection,
  getRooms,
  getBookings,
  getDashboardStats,
  Room,
  Booking,
  DashboardStats,
} from "../lib/api";
import {
  BedDouble,
  DollarSign,
  Clock,
  TrendingUp,
  MessageCircle,
  Plus,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [isBackendConnected, setIsBackendConnected] = useState<boolean | null>(null);

  const loadData = async () => {
    setLoading(true);
    const connected = await checkBackendConnection();
    setIsBackendConnected(connected);

    const [roomsData, bookingsData, statsData] = await Promise.all([
      getRooms(),
      getBookings(),
      getDashboardStats(),
    ]);

    setRooms(roomsData);
    setBookings(bookingsData);
    setStats(statsData);
    setLoading(false);
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      const connected = await checkBackendConnection();
      if (!mounted) return;
      setIsBackendConnected(connected);

      const [roomsData, bookingsData, statsData] = await Promise.all([
        getRooms(),
        getBookings(),
        getDashboardStats(),
      ]);

      if (!mounted) return;
      setRooms(roomsData);
      setBookings(bookingsData);
      setStats(statsData);
      setLoading(false);
    })();

    const interval = setInterval(async () => {
      const connected = await checkBackendConnection();
      if (mounted) setIsBackendConnected(connected);
    }, 10000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const pendingCount = stats?.pendingInquiries ?? bookings.filter((b) => b.status === "pending").length;

  return (
    <div className="min-h-screen bg-[#f5f4ef] text-stone-800 flex flex-col md:flex-row font-sans">
      <AdminSidebar
        isBackendConnected={isBackendConnected}
        onRefresh={loadData}
        pendingCount={pendingCount}
        roomsCount={rooms.length}
      />

      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto max-h-screen">
        <AdminHeader
          title="Executive Dashboard Overview"
          subtitle="Real-time occupancy, revenue performance, and incoming inquiries"
          onRefresh={loadData}
          loading={loading}
          actionButton={
            <Link
              href="/rooms"
              className="bg-[#144e47] hover:bg-[#0e3b35] text-white text-xs font-medium px-4 py-2.5 rounded-lg flex items-center gap-1.5 shadow-sm transition"
            >
              <Plus size={15} /> Add Room
            </Link>
          }
        />

        <div className="p-6 sm:p-8 space-y-8 flex-1">
          {/* 4 Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-stone-500">
                  Total Rooms
                </span>
                <div className="w-8 h-8 rounded-full bg-[#144e47]/10 text-[#144e47] flex items-center justify-center">
                  <BedDouble size={16} />
                </div>
              </div>
              <div className="mt-3 font-serif text-3xl font-bold text-stone-900">
                {stats?.totalRooms ?? rooms.length}
              </div>
              <span className="text-[11px] text-stone-500 mt-1 block">
                Across 5 Indian destinations
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-stone-500">
                  Pending Inquiries
                </span>
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Clock size={16} />
                </div>
              </div>
              <div className="mt-3 font-serif text-3xl font-bold text-amber-800">
                {pendingCount}
              </div>
              <span className="text-[11px] text-amber-600 mt-1 block font-medium">
                Requires WhatsApp follow-up
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-stone-500">
                  Confirmed Revenue
                </span>
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <DollarSign size={16} />
                </div>
              </div>
              <div className="mt-3 font-serif text-3xl font-bold text-emerald-800">
                {stats?.formattedRevenue ?? "₹0"}
              </div>
              <span className="text-[11px] text-stone-500 mt-1 block">
                {stats?.confirmedBookings ?? 0} confirmed reservations
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-stone-500">
                  Avg. Nightly Tariff
                </span>
                <div className="w-8 h-8 rounded-full bg-stone-100 text-stone-700 flex items-center justify-center">
                  <TrendingUp size={16} />
                </div>
              </div>
              <div className="mt-3 font-serif text-3xl font-bold text-stone-900">
                {stats?.formattedAveragePrice ?? "₹3,950"}
              </div>
              <span className="text-[11px] text-stone-500 mt-1 block">
                Direct booking rate
              </span>
            </div>
          </div>

          {/* Recent Inquiries & Regional Presence */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Recent Inquiries */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-serif text-lg font-medium text-stone-900">
                    Recent Guest Inquiries
                  </h3>
                  <p className="text-xs text-stone-500">
                    Direct inquiries from storefront
                  </p>
                </div>
                <Link
                  href="/bookings"
                  className="text-xs font-medium text-[#144e47] hover:underline"
                >
                  View all ({bookings.length}) &rarr;
                </Link>
              </div>

              <div className="divide-y divide-stone-100">
                {bookings.slice(0, 4).map((b) => (
                  <div
                    key={b.id}
                    className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-stone-900">
                          {b.guestName}
                        </span>
                        <span
                          className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                            b.status === "confirmed"
                              ? "bg-emerald-100 text-emerald-800"
                              : b.status === "pending"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-rose-100 text-rose-800"
                          }`}
                        >
                          {b.status}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">
                        {b.roomTitle} &bull; {b.nights} nights ({b.checkIn} to {b.checkOut})
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-stone-900">
                        ₹{b.totalAmount.toLocaleString("en-IN")}
                      </span>
                      <a
                        href={`https://wa.me/${b.guestPhone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1 border border-emerald-200/60"
                      >
                        <MessageCircle size={13} /> Chat
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Regional Presence */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-lg font-medium text-stone-900">
                  Regional Footprint
                </h3>
                <p className="text-xs text-stone-500 mb-5">
                  Rooms per Indian state
                </p>

                <div className="space-y-3">
                  {Object.entries(stats?.regionalBreakdown || {}).map(
                    ([region, count]) => (
                      <div key={region} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="font-medium text-stone-700">
                            {region}
                          </span>
                          <span className="text-stone-500 font-mono">
                            {count} room{count > 1 ? "s" : ""}
                          </span>
                        </div>
                        <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-[#144e47] h-full rounded-full"
                            style={{
                              width: `${(count / (rooms.length || 1)) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-stone-100">
                <Link
                  href="/rooms"
                  className="w-full bg-[#144e47] hover:bg-[#0e3b35] text-white text-xs font-medium py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-sm transition"
                >
                  <Plus size={14} /> Add Room to New Region
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
