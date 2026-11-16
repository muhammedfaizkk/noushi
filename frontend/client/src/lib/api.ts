import { Room, ROOMS } from "@/data/rooms";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface BookingPayload {
  roomId?: string;
  roomTitle: string;
  guestName: string;
  guestEmail?: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  nights?: number;
  guests: string;
  notes?: string;
}

// Check backend availability
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

// Fetch rooms from backend API with fallback to static rooms
export async function getRooms(): Promise<Room[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/rooms`, {
      signal: AbortSignal.timeout(2000),
    });
    if (res.ok) {
      const json = await res.json();
      if (json.data && json.data.length > 0) {
        return json.data;
      }
    }
  } catch {
    // Fallback to static catalog
  }
  return [...ROOMS];
}

// Submit a new booking inquiry to Express backend
export async function createBooking(data: BookingPayload) {
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
    // Graceful fallback
  }

  return {
    id: `bk-${Date.now().toString().slice(-4)}`,
    ...data,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
}
