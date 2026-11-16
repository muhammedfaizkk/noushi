"use client";

import React, { useState, useEffect } from "react";
import { AdminSidebar } from "../../components/AdminSidebar";
import { AdminHeader } from "../../components/AdminHeader";
import {
  checkBackendConnection,
  getRooms,
  getBookings,
  createBooking,
  updateBookingStatus,
  deleteBooking,
  Booking,
  Room,
} from "../../lib/api";
import { Search, Plus, MessageCircle, Trash2, X, Phone, Mail } from "lucide-react";

export default function StandaloneAdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [isBackendConnected, setIsBackendConnected] = useState<boolean | null>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [form, setForm] = useState({
    roomId: "",
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    checkIn: "",
    checkOut: "",
    nights: 2,
    guests: "2 guests",
    notes: "",
  });

  const loadData = async () => {
    setLoading(true);
    const connected = await checkBackendConnection();
    setIsBackendConnected(connected);

    const [bookingsData, roomsData] = await Promise.all([
      getBookings(),
      getRooms(),
    ]);

    setBookings(bookingsData);
    setRooms(roomsData);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (
    id: string,
    status: "pending" | "confirmed" | "cancelled"
  ) => {
    await updateBookingStatus(id, status);
    setBookings(bookings.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this booking?")) return;
    await deleteBooking(id);
    setBookings(bookings.filter((b) => b.id !== id));
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const matchedRoom = rooms.find((r) => r.id === form.roomId);
    const created = await createBooking({
      roomId: form.roomId,
      roomTitle: matchedRoom ? matchedRoom.title : "Custom Stay",
      guestName: form.guestName,
      guestEmail: form.guestEmail,
      guestPhone: form.guestPhone,
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      nights: Number(form.nights),
      guests: form.guests,
      notes: form.notes,
    });
    setBookings([created, ...bookings]);
    setIsAddOpen(false);
  };

  const pendingCount = bookings.filter((b) => b.status === "pending").length;

  const filtered = bookings.filter((b) => {
    if (statusFilter !== "all" && b.status !== statusFilter) return false;
    if (
      search &&
      !b.guestName.toLowerCase().includes(search.toLowerCase()) &&
      !b.guestPhone.includes(search) &&
      !b.roomTitle.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

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
          title="Guest Reservations & WhatsApp Inquiries"
          subtitle="Real-time guest booking requests and direct host communication"
          onRefresh={loadData}
          loading={loading}
          actionButton={
            <button
              onClick={() => setIsAddOpen(true)}
              className="bg-[#144e47] hover:bg-[#0e3b35] text-white text-xs font-medium px-4 py-2.5 rounded-lg flex items-center gap-1.5 shadow-sm transition cursor-pointer"
            >
              <Plus size={15} /> New Booking
            </button>
          }
        />

        <div className="p-6 sm:p-8 space-y-6">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
            <div className="relative flex-1 max-w-md">
              <Search
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by guest name, phone, or room..."
                className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#144e47]"
              />
            </div>

            <div className="flex items-center gap-2">
              {["all", "pending", "confirmed", "cancelled"].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium capitalize transition cursor-pointer ${
                    statusFilter === st
                      ? "bg-[#144e47] text-white shadow-xs"
                      : "bg-stone-50 text-stone-600 hover:bg-stone-100"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#f9f8f4] border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px] font-semibold">
                  <tr>
                    <th className="py-3 px-4">Guest Details</th>
                    <th className="py-3 px-4">Reserved Room</th>
                    <th className="py-3 px-4">Dates & Duration</th>
                    <th className="py-3 px-4">Estimated Total</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filtered.map((b) => (
                    <tr key={b.id} className="hover:bg-stone-50/70 transition">
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-stone-900 block text-xs">
                          {b.guestName}
                        </span>
                        <span className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
                          <Phone size={11} /> {b.guestPhone}
                        </span>
                        {b.guestEmail && (
                          <span className="text-[11px] text-stone-400 flex items-center gap-1">
                            <Mail size={11} /> {b.guestEmail}
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-serif font-medium text-stone-900 block text-xs">
                          {b.roomTitle}
                        </span>
                        <span className="text-[11px] text-stone-500">
                          {b.guests}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-medium text-stone-800 block text-xs">
                          {b.checkIn} &rarr; {b.checkOut}
                        </span>
                        <span className="text-[11px] text-stone-400">
                          {b.nights} nights
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-bold text-stone-900 text-sm">
                          ₹{b.totalAmount.toLocaleString("en-IN")}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <select
                          value={b.status}
                          onChange={(e) =>
                            handleStatusChange(b.id, e.target.value as any)
                          }
                          className={`text-[11px] font-semibold uppercase px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                            b.status === "confirmed"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                              : b.status === "pending"
                              ? "bg-amber-50 text-amber-800 border-amber-200"
                              : "bg-rose-50 text-rose-800 border-rose-200"
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`https://wa.me/${b.guestPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                              `Hi ${b.guestName}, regarding your stay inquiry for ${b.roomTitle} at Driftwood Stays:`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] px-2.5 py-1.5 rounded-lg flex items-center gap-1 font-medium transition cursor-pointer"
                          >
                            <MessageCircle size={13} /> WhatsApp
                          </a>
                          <button
                            onClick={() => handleDelete(b.id)}
                            className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                            title="Remove"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filtered.length === 0 && (
              <div className="py-12 text-center text-xs text-stone-400">
                No bookings found.
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Manual Booking Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsAddOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-900 transition cursor-pointer"
            >
              <X size={18} />
            </button>

            <h3 className="font-serif text-2xl font-medium text-stone-900">
              New Booking Reservation
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Record a direct phone or offline reservation
            </p>

            <form onSubmit={handleAdd} className="mt-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Assign Room
                </label>
                <select
                  required
                  value={form.roomId}
                  onChange={(e) => setForm({ ...form, roomId: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-800 focus:outline-none focus:border-[#144e47]"
                >
                  <option value="">Select a room...</option>
                  {rooms.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.title} ({r.location}) &mdash; {r.formattedPrice}/night
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Guest Name
                  </label>
                  <input
                    required
                    type="text"
                    value={form.guestName}
                    onChange={(e) =>
                      setForm({ ...form, guestName: e.target.value })
                    }
                    placeholder="Guest Full Name"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-800 focus:outline-none focus:border-[#144e47]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    WhatsApp Phone
                  </label>
                  <input
                    required
                    type="tel"
                    value={form.guestPhone}
                    onChange={(e) =>
                      setForm({ ...form, guestPhone: e.target.value })
                    }
                    placeholder="+91 98765 43210"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-800 focus:outline-none focus:border-[#144e47]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Check In
                  </label>
                  <input
                    required
                    type="date"
                    value={form.checkIn}
                    onChange={(e) =>
                      setForm({ ...form, checkIn: e.target.value })
                    }
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-800 focus:outline-none focus:border-[#144e47]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Check Out
                  </label>
                  <input
                    required
                    type="date"
                    value={form.checkOut}
                    onChange={(e) =>
                      setForm({ ...form, checkOut: e.target.value })
                    }
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-800 focus:outline-none focus:border-[#144e47]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Notes
                </label>
                <textarea
                  rows={2}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Special guest requests..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-800 focus:outline-none focus:border-[#144e47]"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#144e47] hover:bg-[#0e3b35] text-white font-medium px-5 py-2.5 rounded-xl shadow-sm transition cursor-pointer"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
