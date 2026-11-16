import { Room, ROOMS } from "@/data/rooms";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface Booking {
  id: string;
  roomId: string;
  roomTitle: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: string;
  totalAmount: number;
  status: "pending" | "confirmed" | "cancelled";
  notes?: string;
  createdAt: string;
}

export interface DashboardStats {
  totalRooms: number;
  totalBookings: number;
  pendingInquiries: number;
  confirmedBookings: number;
  totalRevenue: number;
  formattedRevenue: string;
  averagePrice: number;
  formattedAveragePrice: string;
  regionalBreakdown: Record<string, number>;
}

// Fallback initial in-memory state
let fallbackRooms: Room[] = [...ROOMS];
let fallbackBookings: Booking[] = [
  {
    id: "bk-101",
    roomId: "varkala-cliff",
    roomTitle: "Cliffside Sea-View Room",
    guestName: "Priya Sharma",
    guestEmail: "priya.sharma@example.com",
    guestPhone: "+91 98450 12345",
    checkIn: "2026-11-20",
    checkOut: "2026-11-23",
    nights: 3,
    guests: "2 guests",
    totalAmount: 12600,
    status: "confirmed",
    notes: "Late check-in requested (around 8 PM). Vegetarian breakfast.",
    createdAt: "2026-11-15T10:15:00.000Z",
  },
  {
    id: "bk-102",
    roomId: "manali-cedar",
    roomTitle: "Cedar Loft with Valley View",
    guestName: "Arjun Verma",
    guestEmail: "arjun.v@example.com",
    guestPhone: "+91 98210 54321",
    checkIn: "2026-11-25",
    checkOut: "2026-11-28",
    nights: 3,
    guests: "2 guests",
    totalAmount: 10800,
    status: "pending",
    notes: "Remote work stay. Needs high speed Wi-Fi verification.",
    createdAt: "2026-11-16T08:30:00.000Z",
  },
  {
    id: "bk-103",
    roomId: "jaipur-haveli",
    roomTitle: "Heritage Haveli Suite",
    guestName: "David & Sarah Miller",
    guestEmail: "david.miller@example.co.uk",
    guestPhone: "+44 7700 900123",
    checkIn: "2026-12-01",
    checkOut: "2026-12-05",
    nights: 4,
    guests: "2 guests",
    totalAmount: 23200,
    status: "confirmed",
    notes: "Anniversary trip. Interested in heritage photography tour.",
    createdAt: "2026-11-14T15:20:00.000Z",
  },
  {
    id: "bk-104",
    roomId: "coorg-plantation",
    roomTitle: "Plantation Cottage",
    guestName: "Kavita Reddy",
    guestEmail: "kavita.reddy@example.com",
    guestPhone: "+91 94480 67890",
    checkIn: "2026-11-22",
    checkOut: "2026-11-24",
    nights: 2,
    guests: "3 guests",
    totalAmount: 9800,
    status: "pending",
    notes: "Family visit with elderly parent. Ground floor preferred.",
    createdAt: "2026-11-16T11:00:00.000Z",
  },
];

// Helper to check backend health
export async function checkBackendConnection(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/health`, {
      method: "GET",
      signal: AbortSignal.timeout(1500),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// Fetch all rooms
export async function getRooms(): Promise<Room[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/rooms`, {
      signal: AbortSignal.timeout(2000),
    });
    if (!res.ok) throw new Error("Failed to fetch");
    const json = await res.json();
    return json.data;
  } catch {
    return [...fallbackRooms];
  }
}

// Create Room
export async function createRoom(roomData: Partial<Room>): Promise<Room> {
  try {
    const res = await fetch(`${API_BASE_URL}/rooms`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(roomData),
    });
    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
  } catch {
    // ignore
  }

  // Fallback
  const num = String(fallbackRooms.length + 1).padStart(2, "0");
  const newRoom: Room = {
    id: `room-${Date.now()}`,
    number: num,
    title: roomData.title || "New Boutique Room",
    location: roomData.location || "Goa, India",
    state: roomData.state || "Goa",
    category: (roomData.category as any) || "Beach",
    price: Number(roomData.price) || 3500,
    formattedPrice: `₹${Number(roomData.price || 3500).toLocaleString("en-IN")}`,
    image:
      roomData.image ||
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80",
    tags: roomData.tags || ["Wi-Fi", "Verified"],
    description: roomData.description || "Serene boutique stay in India.",
    host: roomData.host || {
      name: "Local Host",
      phone: "+919876543210",
      responseSpeed: "Within 10 minutes",
    },
    amenities: roomData.amenities || [
      "High-speed Wi-Fi",
      "Complimentary Breakfast",
      "Dedicated Host",
    ],
    maxGuests: Number(roomData.maxGuests) || 2,
  };
  fallbackRooms.push(newRoom);
  return newRoom;
}

// Update Room
export async function updateRoom(
  id: string,
  updated: Partial<Room>
): Promise<Room> {
  try {
    const res = await fetch(`${API_BASE_URL}/rooms/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
  } catch {
    // ignore
  }

  const idx = fallbackRooms.findIndex((r) => r.id === id);
  if (idx !== -1) {
    fallbackRooms[idx] = { ...fallbackRooms[idx], ...updated };
    return fallbackRooms[idx];
  }
  throw new Error("Room not found");
}

// Delete Room
export async function deleteRoom(id: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/rooms/${id}`, {
      method: "DELETE",
    });
    if (res.ok) return true;
  } catch {
    // ignore
  }

  fallbackRooms = fallbackRooms.filter((r) => r.id !== id);
  return true;
}

// Fetch all bookings
export async function getBookings(): Promise<Booking[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/bookings`, {
      signal: AbortSignal.timeout(2000),
    });
    if (!res.ok) throw new Error("Failed");
    const json = await res.json();
    return json.data;
  } catch {
    return [...fallbackBookings];
  }
}

// Create booking
export async function createBooking(data: Partial<Booking>): Promise<Booking> {
  try {
    const res = await fetch(`${API_BASE_URL}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
  } catch {
    // ignore
  }

  const newBooking: Booking = {
    id: `bk-${Date.now().toString().slice(-4)}`,
    roomId: data.roomId || "custom",
    roomTitle: data.roomTitle || "Boutique Stay",
    guestName: data.guestName || "Guest",
    guestEmail: data.guestEmail || "guest@example.com",
    guestPhone: data.guestPhone || "+91 98765 43210",
    checkIn: data.checkIn || new Date().toISOString().slice(0, 10),
    checkOut: data.checkOut || new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10),
    nights: Number(data.nights) || 2,
    guests: data.guests || "2 guests",
    totalAmount: Number(data.totalAmount) || 7000,
    status: "pending",
    notes: data.notes || "Direct inquiry from website",
    createdAt: new Date().toISOString(),
  };
  fallbackBookings.unshift(newBooking);
  return newBooking;
}

// Update booking status
export async function updateBookingStatus(
  id: string,
  status: "pending" | "confirmed" | "cancelled"
): Promise<Booking> {
  try {
    const res = await fetch(`${API_BASE_URL}/bookings/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
  } catch {
    // ignore
  }

  const booking = fallbackBookings.find((b) => b.id === id);
  if (booking) {
    booking.status = status;
    return booking;
  }
  throw new Error("Booking not found");
}

// Delete booking
export async function deleteBooking(id: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/bookings/${id}`, {
      method: "DELETE",
    });
    if (res.ok) return true;
  } catch {
    // ignore
  }

  fallbackBookings = fallbackBookings.filter((b) => b.id !== id);
  return true;
}

// Fetch Stats
export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const res = await fetch(`${API_BASE_URL}/stats`, {
      signal: AbortSignal.timeout(2000),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // ignore
  }

  const totalRev = fallbackBookings.reduce(
    (acc, b) => (b.status === "confirmed" ? acc + (b.totalAmount || 0) : acc),
    0
  );
  const avg =
    fallbackRooms.length > 0
      ? Math.round(
          fallbackRooms.reduce((acc, r) => acc + r.price, 0) /
            fallbackRooms.length
        )
      : 0;

  const reg: Record<string, number> = {};
  fallbackRooms.forEach((r) => {
    reg[r.state] = (reg[r.state] || 0) + 1;
  });

  return {
    totalRooms: fallbackRooms.length,
    totalBookings: fallbackBookings.length,
    pendingInquiries: fallbackBookings.filter((b) => b.status === "pending").length,
    confirmedBookings: fallbackBookings.filter((b) => b.status === "confirmed").length,
    totalRevenue: totalRev,
    formattedRevenue: `₹${totalRev.toLocaleString("en-IN")}`,
    averagePrice: avg,
    formattedAveragePrice: `₹${avg.toLocaleString("en-IN")}`,
    regionalBreakdown: reg,
  };
}
