"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AdminSidebar } from "../../components/AdminSidebar";
import { AdminHeader } from "../../components/AdminHeader";
import {
  checkBackendConnection,
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  getBookings,
  Room,
} from "../../lib/api";
import { Search, Plus, Edit, Trash2, X } from "lucide-react";

export default function StandaloneAdminRoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [isBackendConnected, setIsBackendConnected] = useState<boolean | null>(null);
  const [pendingCount, setPendingCount] = useState(0);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [roomToDelete, setRoomToDelete] = useState<Room | null>(null);

  const [form, setForm] = useState({
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

  const loadData = async () => {
    setLoading(true);
    const connected = await checkBackendConnection();
    setIsBackendConnected(connected);

    const [roomsData, bookingsData] = await Promise.all([
      getRooms(),
      getBookings(),
    ]);

    setRooms(roomsData);
    setPendingCount(bookingsData.filter((b) => b.status === "pending").length);
    setLoading(false);
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      const connected = await checkBackendConnection();
      if (!mounted) return;
      setIsBackendConnected(connected);

      const [roomsData, bookingsData] = await Promise.all([
        getRooms(),
        getBookings(),
      ]);

      if (!mounted) return;
      setRooms(roomsData);
      setPendingCount(bookingsData.filter((b) => b.status === "pending").length);
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRoom) {
      const updated = await updateRoom(editingRoom.id, {
        title: form.title,
        location: form.location,
        state: form.state,
        category: form.category,
        price: Number(form.price),
        image: form.image || editingRoom.image,
        tags: form.tags.split(",").map((t) => t.trim()),
        description: form.description,
        host: {
          name: form.hostName,
          phone: form.hostPhone,
          responseSpeed: "Within 10 minutes",
        },
      });
      setRooms(rooms.map((r) => (r.id === updated.id ? updated : r)));
      setEditingRoom(null);
    } else {
      const created = await createRoom({
        title: form.title,
        location: form.location,
        state: form.state,
        category: form.category,
        price: Number(form.price),
        image:
          form.image ||
          "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80",
        tags: form.tags.split(",").map((t) => t.trim()),
        description: form.description,
        host: {
          name: form.hostName,
          phone: form.hostPhone,
          responseSpeed: "Within 10 minutes",
        },
      });
      setRooms([...rooms, created]);
      setIsAddOpen(false);
    }
  };

  const openEdit = (room: Room) => {
    setEditingRoom(room);
    setForm({
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

  const confirmDelete = async () => {
    if (!roomToDelete) return;
    await deleteRoom(roomToDelete.id);
    setRooms(rooms.filter((r) => r.id !== roomToDelete.id));
    setRoomToDelete(null);
  };

  const filtered = rooms.filter((r) => {
    if (categoryFilter !== "All" && r.category !== categoryFilter) return false;
    if (
      search &&
      !r.title.toLowerCase().includes(search.toLowerCase()) &&
      !r.location.toLowerCase().includes(search.toLowerCase())
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
          title="Rooms & Suites Management"
          subtitle="Add, edit or archive your boutique listings across India"
          onRefresh={loadData}
          loading={loading}
          actionButton={
            <button
              onClick={() => {
                setForm({
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
                setIsAddOpen(true);
              }}
              className="bg-[#144e47] hover:bg-[#0e3b35] text-white text-xs font-medium px-4 py-2.5 rounded-lg flex items-center gap-1.5 shadow-sm transition cursor-pointer"
            >
              <Plus size={15} /> Add New Room
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
                placeholder="Search by room title, location, or state..."
                className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#144e47]"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto">
              {["All", "Beach", "Mountain", "City", "Countryside"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                    categoryFilter === cat
                      ? "bg-[#144e47] text-white shadow-xs"
                      : "bg-stone-50 text-stone-600 hover:bg-stone-100"
                  }`}
                >
                  {cat}
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
                    <th className="py-3 px-4">Room & Visual</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Nightly Tariff</th>
                    <th className="py-3 px-4">Host Contact</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filtered.map((room) => (
                    <tr key={room.id} className="hover:bg-stone-50/70 transition">
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

                      <td className="py-3.5 px-4">
                        <span className="font-medium text-stone-800">
                          {room.location}
                        </span>
                        <span className="block text-[11px] text-stone-400">
                          {room.state}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="bg-[#f0ece2] text-stone-700 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                          {room.category}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-bold text-stone-900 text-sm">
                          {room.formattedPrice}
                        </span>
                        <span className="text-[10px] text-stone-400"> / night</span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-medium text-stone-800 block">
                          {room.host.name}
                        </span>
                        <span className="text-[11px] text-stone-400">
                          {room.host.phone}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openEdit(room)}
                            className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition cursor-pointer"
                            title="Edit"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => setRoomToDelete(room)}
                            className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                            title="Delete"
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

            {filtered.length === 0 && (
              <div className="py-12 text-center text-xs text-stone-400">
                No rooms match your filter.
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Add/Edit Modal */}
      {(isAddOpen || editingRoom) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setIsAddOpen(false);
                setEditingRoom(null);
              }}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-900 transition cursor-pointer"
            >
              <X size={18} />
            </button>

            <h3 className="font-serif text-2xl font-medium text-stone-900">
              {editingRoom ? "Edit Room Details" : "Add New Boutique Room"}
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Enter room specs, nightly tariff and location
            </p>

            <form onSubmit={handleSave} className="mt-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Room Title
                </label>
                <input
                  required
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
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
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
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
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
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
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value as Room["category"] })
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
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-800 focus:outline-none focus:border-[#144e47]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Photo URL
                </label>
                <input
                  type="url"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-800 focus:outline-none focus:border-[#144e47]"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
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
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Room atmosphere..."
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
                    value={form.hostName}
                    onChange={(e) => setForm({ ...form, hostName: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-800 focus:outline-none focus:border-[#144e47]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Host Phone
                  </label>
                  <input
                    type="tel"
                    value={form.hostPhone}
                    onChange={(e) => setForm({ ...form, hostPhone: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-800 focus:outline-none focus:border-[#144e47]"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddOpen(false);
                    setEditingRoom(null);
                  }}
                  className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#144e47] hover:bg-[#0e3b35] text-white font-medium px-5 py-2.5 rounded-xl shadow-sm transition cursor-pointer"
                >
                  {editingRoom ? "Save Changes" : "Create Room"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {roomToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-stone-200 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 size={24} />
            </div>
            <h4 className="font-serif text-lg font-medium text-stone-900">
              Delete &quot;{roomToDelete.title}&quot;?
            </h4>
            <p className="text-xs text-stone-500 mt-1">
              This room will be permanently removed.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => setRoomToDelete(null)}
                className="px-4 py-2 text-xs font-medium text-stone-600 hover:bg-stone-100 rounded-xl transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-medium px-4 py-2 rounded-xl transition cursor-pointer"
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
