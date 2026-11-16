"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  checkBackendConnection,
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  getBookings,
  createBooking,
  updateBookingStatus,
  deleteBooking,
  getDashboardStats,
  Booking,
  DashboardStats,
} from "@/lib/api";
import { Room } from "@/data/rooms";
import {
  LayoutDashboard,
  BedDouble,
  CalendarCheck2,
  MapPin,
  Plus,
  Search,
  ExternalLink,
  MessageCircle,
  Trash2,
  Edit,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  RefreshCw,
  X,
  Phone,
  Mail,
  Users,
} from "lucide-react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "rooms" | "bookings" | "destinations">("overview");
  const [isBackendConnected, setIsBackendConnected] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  // Data states
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Search & filter states
  const [roomSearch, setRoomSearch] = useState("");
  const [roomCategoryFilter, setRoomCategoryFilter] = useState("All");
  const [bookingStatusFilter, setBookingStatusFilter] = useState("all");
  const [bookingSearch, setBookingSearch] = useState("");

  // Modals
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [isAddBookingOpen, setIsAddBookingOpen] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState<Room | null>(null);

  // Form states for Add/Edit Room
  const [roomForm, setRoomForm] = useState({
    title: "",
    location: "",
    state: "Kerala",
    category: "Beach" as "Beach" | "Mountain" | "City" | "Countryside",
    price: 3500,
    image: "",
    tags: "Wi-Fi, Verified, Breakfast included",
    description: "",
    hostName: "Anand",
    hostPhone: "+919876543210",
  });

  // Form states for Add Booking
  const [bookingForm, setBookingForm] = useState({
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    roomId: "",
    checkIn: "",
    checkOut: "",
    nights: 2,
    guests: "2 guests",
    notes: "",
  });

  // Load Data
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
    loadData();
    const interval = setInterval(async () => {
      const connected = await checkBackendConnection();
      setIsBackendConnected(connected);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Handle Room Creation
  const handleSaveRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRoom) {
      // Update
      const updated = await updateRoom(editingRoom.id, {
        title: roomForm.title,
        location: roomForm.location,
        state: roomForm.state,
        category: roomForm.category,
        price: Number(roomForm.price),
        image: roomForm.image || editingRoom.image,
        tags: roomForm.tags.split(",").map((t) => t.trim()),
        description: roomForm.description,
        host: {
          name: roomForm.hostName,
          phone: roomForm.hostPhone,
          responseSpeed: "Within 10 minutes",
        },
      });
      setRooms(rooms.map((r) => (r.id === updated.id ? updated : r)));
      setEditingRoom(null);
    } else {
      // Create
      const created = await createRoom({
        title: roomForm.title,
        location: roomForm.location,
        state: roomForm.state,
        category: roomForm.category,
        price: Number(roomForm.price),
        image:
          roomForm.image ||
          "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80",
        tags: roomForm.tags.split(",").map((t) => t.trim()),
        description: roomForm.description,
        host: {
          name: roomForm.hostName,
          phone: roomForm.hostPhone,
          responseSpeed: "Within 10 minutes",
        },
      });
      setRooms([...rooms, created]);
      setIsAddRoomOpen(false);
    }
    // Refresh stats
    const updatedStats = await getDashboardStats();
    setStats(updatedStats);
  };

  // Open Edit Modal
  const openEditModal = (room: Room) => {
    setEditingRoom(room);
    setRoomForm({
      title: room.title,
      location: room.location,
      state: room.state,
      category: room.category,
      price: room.price,
      image: room.image,
      tags: room.tags.join(", "),
      description: room.description,
      hostName: room.host.name,
      hostPhone: room.host.phone,
    });
  };

  // Delete Room
  const confirmDeleteRoom = async () => {
    if (!roomToDelete) return;
    await deleteRoom(roomToDelete.id);
    setRooms(rooms.filter((r) => r.id !== roomToDelete.id));
    setRoomToDelete(null);
    const updatedStats = await getDashboardStats();
    setStats(updatedStats);
  };

  // Booking Status Change
  const handleBookingStatusChange = async (
    id: string,
    newStatus: "pending" | "confirmed" | "cancelled"
  ) => {
    await updateBookingStatus(id, newStatus);
    setBookings(
      bookings.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
    const updatedStats = await getDashboardStats();
    setStats(updatedStats);
  };

  // Delete Booking
  const handleDeleteBooking = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking inquiry?")) return;
    await deleteBooking(id);
    setBookings(bookings.filter((b) => b.id !== id));
    const updatedStats = await getDashboardStats();
    setStats(updatedStats);
  };

  // Add Manual Booking
  const handleAddBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    const selectedRoom = rooms.find((r) => r.id === bookingForm.roomId);
    const created = await createBooking({
      roomId: bookingForm.roomId,
      roomTitle: selectedRoom ? selectedRoom.title : "Custom Room",
      guestName: bookingForm.guestName,
      guestEmail: bookingForm.guestEmail,
      guestPhone: bookingForm.guestPhone,
      checkIn: bookingForm.checkIn,
      checkOut: bookingForm.checkOut,
      nights: Number(bookingForm.nights),
      guests: bookingForm.guests,
      notes: bookingForm.notes,
    });
    setBookings([created, ...bookings]);
    setIsAddBookingOpen(false);
    const updatedStats = await getDashboardStats();
    setStats(updatedStats);
  };

  // Filtered rooms
  const filteredRooms = rooms.filter((r) => {
    if (roomCategoryFilter !== "All" && r.category !== roomCategoryFilter) {
      return false;
    }
    if (
      roomSearch &&
      !r.title.toLowerCase().includes(roomSearch.toLowerCase()) &&
      !r.location.toLowerCase().includes(roomSearch.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  // Filtered bookings
  const filteredBookings = bookings.filter((b) => {
    if (bookingStatusFilter !== "all" && b.status !== bookingStatusFilter) {
      return false;
    }
    if (
      bookingSearch &&
      !b.guestName.toLowerCase().includes(bookingSearch.toLowerCase()) &&
      !b.guestPhone.includes(bookingSearch) &&
      !b.roomTitle.toLowerCase().includes(bookingSearch.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f5f4ef] text-stone-800 flex flex-col md:flex-row font-sans">
      {/* ========================================================= */}
      {/* SIDEBAR NAVIGATION                                       */}
      {/* ========================================================= */}
      <aside className="w-full md:w-64 bg-[#111a18] text-stone-300 flex flex-col justify-between p-5 border-r border-stone-800 shrink-0">
        <div>
          {/* Brand Logo */}
          <div className="flex items-center gap-3 pb-6 border-b border-stone-800">
            <div className="w-8 h-8 rounded-full border border-stone-400 text-stone-200 flex items-center justify-center font-serif text-sm">
              DS
            </div>
            <div>
              <h1 className="font-sans font-medium text-white text-sm tracking-tight">
                Driftwood Stays
              </h1>
              <span className="text-[10px] text-stone-400 tracking-wider uppercase font-semibold block">
                Admin Console
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 space-y-1.5 text-xs font-medium">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition ${
                activeTab === "overview"
                  ? "bg-[#144e47] text-white shadow-sm font-semibold"
                  : "text-stone-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <LayoutDashboard size={16} />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab("rooms")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition ${
                activeTab === "rooms"
                  ? "bg-[#144e47] text-white shadow-sm font-semibold"
                  : "text-stone-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <BedDouble size={16} />
              <div className="flex-1 flex items-center justify-between">
                <span>Rooms Management</span>
                <span className="bg-stone-800 text-[10px] px-2 py-0.5 rounded-full text-stone-300">
                  {rooms.length}
                </span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab("bookings")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition ${
                activeTab === "bookings"
                  ? "bg-[#144e47] text-white shadow-sm font-semibold"
                  : "text-stone-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <CalendarCheck2 size={16} />
              <div className="flex-1 flex items-center justify-between">
                <span>Bookings & Inquiries</span>
                {stats?.pendingInquiries ? (
                  <span className="bg-amber-600 text-[10px] font-bold px-2 py-0.5 rounded-full text-white">
                    {stats.pendingInquiries}
                  </span>
                ) : (
                  <span className="bg-stone-800 text-[10px] px-2 py-0.5 rounded-full text-stone-300">
                    {bookings.length}
                  </span>
                )}
              </div>
            </button>

            <button
              onClick={() => setActiveTab("destinations")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition ${
                activeTab === "destinations"
                  ? "bg-[#144e47] text-white shadow-sm font-semibold"
                  : "text-stone-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <MapPin size={16} />
              <span>Destinations</span>
            </button>
          </nav>
        </div>

        {/* Bottom Sidebar Info */}
        <div className="pt-6 border-t border-stone-800 space-y-3">
          {/* Backend Connection Status Badge */}
          <div className="bg-stone-900/80 rounded-xl p-3 border border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  isBackendConnected ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
                }`}
              />
              <span className="text-[11px] font-medium text-stone-300">
                {isBackendConnected ? "Express API :5000" : "In-Memory Mode"}
              </span>
            </div>
            <button
              onClick={loadData}
              title="Refresh connection"
              className="text-stone-400 hover:text-white transition"
            >
              <RefreshCw size={12} />
            </button>
          </div>

          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between text-xs font-medium text-stone-400 hover:text-white py-1 px-2 rounded-lg hover:bg-white/5 transition"
          >
            <span className="flex items-center gap-2">
              <ExternalLink size={14} /> View Storefront
            </span>
            <span className="text-[10px] text-stone-500">Live</span>
          </Link>
        </div>
      </aside>

      {/* ========================================================= */}
      {/* MAIN CONTENT AREA                                         */}
      {/* ========================================================= */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto max-h-screen">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-stone-200/90 px-6 py-4 flex items-center justify-between shrink-0">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-stone-900">
              {activeTab === "overview" && "Dashboard Overview"}
              {activeTab === "rooms" && "Rooms & Suites Inventory"}
              {activeTab === "bookings" && "Guest Bookings & WhatsApp Inquiries"}
              {activeTab === "destinations" && "Regional Destination Analytics"}
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Manage your boutique room listings and guest communication
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              className="p-2 text-stone-500 hover:text-stone-900 bg-stone-50 hover:bg-stone-100 rounded-lg border border-stone-200 transition"
              title="Reload data"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            </button>

            {activeTab === "rooms" && (
              <button
                onClick={() => {
                  setRoomForm({
                    title: "",
                    location: "",
                    state: "Kerala",
                    category: "Beach",
                    price: 3500,
                    image: "",
                    tags: "Wi-Fi, Verified, Breakfast included",
                    description: "",
                    hostName: "Anand",
                    hostPhone: "+919876543210",
                  });
                  setIsAddRoomOpen(true);
                }}
                className="bg-[#144e47] hover:bg-[#0e3b35] text-white text-xs font-medium px-4 py-2.5 rounded-lg flex items-center gap-1.5 shadow-sm transition"
              >
                <Plus size={15} /> Add New Room
              </button>
            )}

            {activeTab === "bookings" && (
              <button
                onClick={() => setIsAddBookingOpen(true)}
                className="bg-[#144e47] hover:bg-[#0e3b35] text-white text-xs font-medium px-4 py-2.5 rounded-lg flex items-center gap-1.5 shadow-sm transition"
              >
                <Plus size={15} /> New Booking
              </button>
            )}
          </div>
        </header>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8 flex-1">
          {/* ===================================================== */}
          {/* TAB 1: OVERVIEW                                       */}
          {/* ===================================================== */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-in fade-in duration-150">
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
                    Across 5 Indian states
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
                    {stats?.pendingInquiries ?? 0}
                  </div>
                  <span className="text-[11px] text-amber-600 mt-1 block font-medium">
                    Requires host follow-up
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
                    {stats?.confirmedBookings ?? 0} confirmed stays
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium uppercase tracking-wider text-stone-500">
                      Avg. Nightly Rate
                    </span>
                    <div className="w-8 h-8 rounded-full bg-stone-100 text-stone-700 flex items-center justify-center">
                      <TrendingUp size={16} />
                    </div>
                  </div>
                  <div className="mt-3 font-serif text-3xl font-bold text-stone-900">
                    {stats?.formattedAveragePrice ?? "₹3,950"}
                  </div>
                  <span className="text-[11px] text-stone-500 mt-1 block">
                    Direct booking value
                  </span>
                </div>
              </div>

              {/* Quick Actions & Recent Bookings */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Recent Inquiries List */}
                <div className="lg:col-span-8 bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="font-serif text-lg font-medium text-stone-900">
                        Recent Booking Requests
                      </h3>
                      <p className="text-xs text-stone-500">
                        Guest inquiries submitted via storefront
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab("bookings")}
                      className="text-xs font-medium text-[#144e47] hover:underline"
                    >
                      View all ({bookings.length})
                    </button>
                  </div>

                  <div className="divide-y divide-stone-100">
                    {bookings.slice(0, 4).map((b) => (
                      <div
                        key={b.id}
                        className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-xs text-stone-900">
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

                {/* Regional Breakdown Summary */}
                <div className="lg:col-span-4 bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-medium text-stone-900">
                      Destination Presence
                    </h3>
                    <p className="text-xs text-stone-500 mb-5">
                      Rooms active across regions
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
                                  width: `${(count / rooms.length) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-stone-100">
                    <button
                      onClick={() => {
                        setRoomForm({
                          title: "",
                          location: "",
                          state: "Kerala",
                          category: "Beach",
                          price: 3500,
                          image: "",
                          tags: "Wi-Fi, Verified, Breakfast included",
                          description: "",
                          hostName: "Anand",
                          hostPhone: "+919876543210",
                        });
                        setIsAddRoomOpen(true);
                      }}
                      className="w-full bg-[#144e47] hover:bg-[#0e3b35] text-white text-xs font-medium py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-sm transition"
                    >
                      <Plus size={14} /> Add Room to New Region
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================== */}
          {/* TAB 2: ROOMS MANAGEMENT                                */}
          {/* ===================================================== */}
          {activeTab === "rooms" && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Search & Category Filter Toolbar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200">
                <div className="relative flex-1 max-w-md">
                  <Search
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
                  />
                  <input
                    type="text"
                    value={roomSearch}
                    onChange={(e) => setRoomSearch(e.target.value)}
                    placeholder="Search by room title, location, or state..."
                    className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#144e47]"
                  />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto">
                  {["All", "Beach", "Mountain", "City", "Countryside"].map(
                    (cat) => (
                      <button
                        key={cat}
                        onClick={() => setRoomCategoryFilter(cat)}
                        className={`text-xs px-3 py-1.5 rounded-lg font-medium transition ${
                          roomCategoryFilter === cat
                            ? "bg-[#144e47] text-white shadow-xs"
                            : "bg-stone-50 text-stone-600 hover:bg-stone-100"
                        }`}
                      >
                        {cat}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Rooms Data Table */}
              <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#f9f8f4] border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px] font-semibold">
                      <tr>
                        <th className="py-3 px-4">Room & Visual</th>
                        <th className="py-3 px-4">Location</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Nightly Price</th>
                        <th className="py-3 px-4">Host Details</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {filteredRooms.map((room) => (
                        <tr
                          key={room.id}
                          className="hover:bg-stone-50/70 transition"
                        >
                          {/* Image & Title */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div
                                className="relative w-12 h-12 rounded-lg overflow-hidden bg-stone-100 shrink-0"
                                style={{ position: "relative" }}
                              >
                                <Image
                                  src={room.image}
                                  alt={room.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <span className="font-serif text-sm font-medium text-stone-900 block">
                                  {room.title}
                                </span>
                                <span className="font-mono text-[10px] text-stone-400">
                                  Room {room.number}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Location */}
                          <td className="py-3.5 px-4">
                            <span className="font-medium text-stone-800">
                              {room.location}
                            </span>
                            <span className="block text-[11px] text-stone-400">
                              {room.state}
                            </span>
                          </td>

                          {/* Category */}
                          <td className="py-3.5 px-4">
                            <span className="bg-[#f0ece2] text-stone-700 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                              {room.category}
                            </span>
                          </td>

                          {/* Price */}
                          <td className="py-3.5 px-4">
                            <span className="font-bold text-stone-900 text-sm">
                              {room.formattedPrice}
                            </span>
                            <span className="text-[10px] text-stone-400">
                              {" "}
                              / night
                            </span>
                          </td>

                          {/* Host */}
                          <td className="py-3.5 px-4">
                            <span className="font-medium text-stone-800 block">
                              {room.host.name}
                            </span>
                            <span className="text-[11px] text-stone-400">
                              {room.host.phone}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => openEditModal(room)}
                                className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition"
                                title="Edit room"
                              >
                                <Edit size={14} />
                              </button>
                              <button
                                onClick={() => setRoomToDelete(room)}
                                className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition"
                                title="Delete room"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredRooms.length === 0 && (
                  <div className="py-12 text-center text-xs text-stone-400">
                    No rooms match your filter.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ===================================================== */}
          {/* TAB 3: BOOKINGS & INQUIRIES                           */}
          {/* ===================================================== */}
          {activeTab === "bookings" && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Filter Toolbar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200">
                <div className="relative flex-1 max-w-md">
                  <Search
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
                  />
                  <input
                    type="text"
                    value={bookingSearch}
                    onChange={(e) => setBookingSearch(e.target.value)}
                    placeholder="Search by guest name, phone, or room..."
                    className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#144e47]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  {["all", "pending", "confirmed", "cancelled"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setBookingStatusFilter(status)}
                      className={`text-xs px-3 py-1.5 rounded-lg font-medium capitalize transition ${
                        bookingStatusFilter === status
                          ? "bg-[#144e47] text-white shadow-xs"
                          : "bg-stone-50 text-stone-600 hover:bg-stone-100"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bookings Table */}
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
                      {filteredBookings.map((b) => (
                        <tr
                          key={b.id}
                          className="hover:bg-stone-50/70 transition"
                        >
                          {/* Guest */}
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

                          {/* Room */}
                          <td className="py-3.5 px-4">
                            <span className="font-serif font-medium text-stone-900 block text-xs">
                              {b.roomTitle}
                            </span>
                            <span className="text-[11px] text-stone-500">
                              {b.guests}
                            </span>
                          </td>

                          {/* Dates */}
                          <td className="py-3.5 px-4">
                            <span className="font-medium text-stone-800 block text-xs">
                              {b.checkIn} &rarr; {b.checkOut}
                            </span>
                            <span className="text-[11px] text-stone-400">
                              {b.nights} nights
                            </span>
                          </td>

                          {/* Amount */}
                          <td className="py-3.5 px-4">
                            <span className="font-bold text-stone-900 text-sm">
                              ₹{b.totalAmount.toLocaleString("en-IN")}
                            </span>
                          </td>

                          {/* Status Dropdown */}
                          <td className="py-3.5 px-4">
                            <select
                              value={b.status}
                              onChange={(e) =>
                                handleBookingStatusChange(
                                  b.id,
                                  e.target.value as any
                                )
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

                          {/* WhatsApp & Delete */}
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <a
                                href={`https://wa.me/${b.guestPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                                  `Hi ${b.guestName}, regarding your booking for ${b.roomTitle} at Driftwood Stays:`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] px-2.5 py-1.5 rounded-lg flex items-center gap-1 font-medium transition"
                              >
                                <MessageCircle size={13} /> WhatsApp
                              </a>
                              <button
                                onClick={() => handleDeleteBooking(b.id)}
                                className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                                title="Remove booking"
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

                {filteredBookings.length === 0 && (
                  <div className="py-12 text-center text-xs text-stone-400">
                    No bookings found.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ===================================================== */}
          {/* TAB 4: DESTINATIONS                                   */}
          {/* ===================================================== */}
          {activeTab === "destinations" && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    name: "Kerala",
                    tagline: "Arabian Sea Cliffs & Backwaters",
                    roomCount: rooms.filter((r) => r.state === "Kerala").length,
                    image:
                      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
                  },
                  {
                    name: "Himachal Pradesh",
                    tagline: "Himalayan Pines & Snow Peaks",
                    roomCount: rooms.filter((r) => r.state === "Himachal Pradesh").length,
                    image:
                      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
                  },
                  {
                    name: "Rajasthan",
                    tagline: "Heritage Havelis & Desert Forts",
                    roomCount: rooms.filter((r) => r.state === "Rajasthan").length,
                    image:
                      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
                  },
                  {
                    name: "Karnataka",
                    tagline: "Coffee Plantations & Coastal Coves",
                    roomCount: rooms.filter((r) => r.state === "Karnataka").length,
                    image:
                      "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80",
                  },
                  {
                    name: "Goa",
                    tagline: "Latin Quarters & Tropical Sunshine",
                    roomCount: rooms.filter((r) => r.state === "Goa").length,
                    image:
                      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
                  },
                ].map((dest) => (
                  <div
                    key={dest.name}
                    className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-2xs flex flex-col"
                  >
                    <div
                      className="relative h-44 w-full bg-stone-100"
                      style={{ position: "relative" }}
                    >
                      <Image
                        src={dest.image}
                        alt={dest.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-4 text-white">
                        <h4 className="font-serif text-lg font-medium">
                          {dest.name}
                        </h4>
                        <p className="text-[11px] text-stone-200">
                          {dest.tagline}
                        </p>
                      </div>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <span className="text-xs text-stone-500">
                        {dest.roomCount} room{dest.roomCount > 1 ? "s" : ""} listed
                      </span>
                      <button
                        onClick={() => {
                          setRoomCategoryFilter("All");
                          setRoomSearch(dest.name);
                          setActiveTab("rooms");
                        }}
                        className="text-xs font-semibold text-[#144e47] hover:underline"
                      >
                        Manage Rooms &rarr;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ========================================================= */}
      {/* MODAL: ADD / EDIT ROOM                                    */}
      {/* ========================================================= */}
      {(isAddRoomOpen || editingRoom) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setIsAddRoomOpen(false);
                setEditingRoom(null);
              }}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-900 transition"
            >
              <X size={18} />
            </button>

            <h3 className="font-serif text-2xl font-medium text-stone-900">
              {editingRoom ? "Edit Room Details" : "Add New Boutique Room"}
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Enter room specs, nightly tariff and location
            </p>

            <form onSubmit={handleSaveRoom} className="mt-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Room Title
                </label>
                <input
                  required
                  type="text"
                  value={roomForm.title}
                  onChange={(e) =>
                    setRoomForm({ ...roomForm, title: e.target.value })
                  }
                  placeholder="E.g. Cliffside Sea-View Suite"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-800 focus:outline-none focus:border-[#144e47]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Location / City
                  </label>
                  <input
                    required
                    type="text"
                    value={roomForm.location}
                    onChange={(e) =>
                      setRoomForm({ ...roomForm, location: e.target.value })
                    }
                    placeholder="E.g. Varkala, Kerala"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-800 focus:outline-none focus:border-[#144e47]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    State
                  </label>
                  <input
                    required
                    type="text"
                    value={roomForm.state}
                    onChange={(e) =>
                      setRoomForm({ ...roomForm, state: e.target.value })
                    }
                    placeholder="Kerala"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-800 focus:outline-none focus:border-[#144e47]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Category
                  </label>
                  <select
                    value={roomForm.category}
                    onChange={(e) =>
                      setRoomForm({
                        ...roomForm,
                        category: e.target.value as any,
                      })
                    }
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-800 focus:outline-none focus:border-[#144e47]"
                  >
                    <option value="Beach">Beach</option>
                    <option value="Mountain">Mountain</option>
                    <option value="City">City</option>
                    <option value="Countryside">Countryside</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Nightly Price (₹)
                  </label>
                  <input
                    required
                    type="number"
                    min="500"
                    step="100"
                    value={roomForm.price}
                    onChange={(e) =>
                      setRoomForm({ ...roomForm, price: Number(e.target.value) })
                    }
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-800 focus:outline-none focus:border-[#144e47]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Photo URL (Unsplash or CDN)
                </label>
                <input
                  type="url"
                  value={roomForm.image}
                  onChange={(e) =>
                    setRoomForm({ ...roomForm, image: e.target.value })
                  }
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-800 focus:outline-none focus:border-[#144e47]"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Amenity Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={roomForm.tags}
                  onChange={(e) =>
                    setRoomForm({ ...roomForm, tags: e.target.value })
                  }
                  placeholder="Sea view, Wi-Fi, Breakfast included"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-800 focus:outline-none focus:border-[#144e47]"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={roomForm.description}
                  onChange={(e) =>
                    setRoomForm({ ...roomForm, description: e.target.value })
                  }
                  placeholder="Describe the atmosphere, furnishings and unique view..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-800 focus:outline-none focus:border-[#144e47]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Host Name
                  </label>
                  <input
                    type="text"
                    value={roomForm.hostName}
                    onChange={(e) =>
                      setRoomForm({ ...roomForm, hostName: e.target.value })
                    }
                    placeholder="Host Name"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-800 focus:outline-none focus:border-[#144e47]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Host WhatsApp Phone
                  </label>
                  <input
                    type="tel"
                    value={roomForm.hostPhone}
                    onChange={(e) =>
                      setRoomForm({ ...roomForm, hostPhone: e.target.value })
                    }
                    placeholder="+919876543210"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-800 focus:outline-none focus:border-[#144e47]"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddRoomOpen(false);
                    setEditingRoom(null);
                  }}
                  className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#144e47] hover:bg-[#0e3b35] text-white font-medium px-5 py-2.5 rounded-xl shadow-sm transition"
                >
                  {editingRoom ? "Save Changes" : "Create Room"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: MANUAL BOOKING ENTRY                               */}
      {/* ========================================================= */}
      {isAddBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsAddBookingOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-900 transition"
            >
              <X size={18} />
            </button>

            <h3 className="font-serif text-2xl font-medium text-stone-900">
              New Booking Reservation
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Record a direct phone or offline reservation
            </p>

            <form onSubmit={handleAddBooking} className="mt-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Assign Room
                </label>
                <select
                  required
                  value={bookingForm.roomId}
                  onChange={(e) =>
                    setBookingForm({ ...bookingForm, roomId: e.target.value })
                  }
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
                    value={bookingForm.guestName}
                    onChange={(e) =>
                      setBookingForm({ ...bookingForm, guestName: e.target.value })
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
                    value={bookingForm.guestPhone}
                    onChange={(e) =>
                      setBookingForm({ ...bookingForm, guestPhone: e.target.value })
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
                    value={bookingForm.checkIn}
                    onChange={(e) =>
                      setBookingForm({ ...bookingForm, checkIn: e.target.value })
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
                    value={bookingForm.checkOut}
                    onChange={(e) =>
                      setBookingForm({ ...bookingForm, checkOut: e.target.value })
                    }
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-800 focus:outline-none focus:border-[#144e47]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Notes / Special Requests
                </label>
                <textarea
                  rows={2}
                  value={bookingForm.notes}
                  onChange={(e) =>
                    setBookingForm({ ...bookingForm, notes: e.target.value })
                  }
                  placeholder="E.g. Airport pickup required, breakfast preferences..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-800 focus:outline-none focus:border-[#144e47]"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsAddBookingOpen(false)}
                  className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#144e47] hover:bg-[#0e3b35] text-white font-medium px-5 py-2.5 rounded-xl shadow-sm transition"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: DELETE CONFIRMATION                                */}
      {/* ========================================================= */}
      {roomToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-stone-200 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 size={24} />
            </div>
            <h4 className="font-serif text-lg font-medium text-stone-900">
              Delete &quot;{roomToDelete.title}&quot;?
            </h4>
            <p className="text-xs text-stone-500 mt-1">
              This room will be permanently removed from your active listings.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => setRoomToDelete(null)}
                className="px-4 py-2 text-xs font-medium text-stone-600 hover:bg-stone-100 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteRoom}
                className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-medium px-4 py-2 rounded-xl transition"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
