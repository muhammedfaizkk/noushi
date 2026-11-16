import {
  Room,
  Booking,
  DashboardStats,
  getRooms as getLocalRooms,
  createRoom as createLocalRoom,
  updateRoom as updateLocalRoom,
  deleteRoom as deleteLocalRoom,
  getBookings as getLocalBookings,
  createBooking as createLocalBooking,
  updateBookingStatus as updateLocalBookingStatus,
  deleteBooking as deleteLocalBooking,
  getDashboardStats as getLocalDashboardStats,
} from "@/data/adminStore";

export type { Room, Booking, DashboardStats };

const getBaseUrl = () => {
  if (typeof window !== "undefined") return "";
  return process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:3001";
};

// Check backend connection to Next.js API
export async function checkBackendConnection(): Promise<boolean> {
  try {
    const res = await fetch(`${getBaseUrl()}/api/health`, {
      method: "GET",
      signal: AbortSignal.timeout(1500),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// Rooms API
export async function getRooms(): Promise<Room[]> {
  try {
    const res = await fetch(`${getBaseUrl()}/api/rooms`, {
      signal: AbortSignal.timeout(2000),
    });
    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
  } catch {
    // Fallback to local store
  }
  return getLocalRooms();
}

export async function createRoom(data: Partial<Room>): Promise<Room> {
  try {
    const res = await fetch(`${getBaseUrl()}/api/rooms`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
  } catch {
    // Fallback
  }
  return createLocalRoom(data);
}

export async function updateRoom(id: string, data: Partial<Room>): Promise<Room> {
  try {
    const res = await fetch(`${getBaseUrl()}/api/rooms/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
  } catch {
    // Fallback
  }
  const updated = updateLocalRoom(id, data);
  if (updated) return updated;
  throw new Error("Room not found");
}

export async function deleteRoom(id: string): Promise<boolean> {
  try {
    const res = await fetch(`${getBaseUrl()}/api/rooms/${id}`, {
      method: "DELETE",
    });
    if (res.ok) return true;
  } catch {
    // Fallback
  }
  return deleteLocalRoom(id) !== null;
}

// Bookings API
export async function getBookings(): Promise<Booking[]> {
  try {
    const res = await fetch(`${getBaseUrl()}/api/bookings`, {
      signal: AbortSignal.timeout(2000),
    });
    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
  } catch {
    // Fallback
  }
  return getLocalBookings();
}

export async function createBooking(data: Partial<Booking>): Promise<Booking> {
  try {
    const res = await fetch(`${getBaseUrl()}/api/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
  } catch {
    // Fallback
  }
  return createLocalBooking(data);
}

export async function updateBookingStatus(
  id: string,
  status: "pending" | "confirmed" | "cancelled"
): Promise<Booking> {
  try {
    const res = await fetch(`${getBaseUrl()}/api/bookings/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
  } catch {
    // Fallback
  }
  const updated = updateLocalBookingStatus(id, status);
  if (updated) return updated;
  throw new Error("Booking not found");
}

export async function deleteBooking(id: string): Promise<boolean> {
  try {
    const res = await fetch(`${getBaseUrl()}/api/bookings/${id}`, {
      method: "DELETE",
    });
    if (res.ok) return true;
  } catch {
    // Fallback
  }
  return deleteLocalBooking(id) !== null;
}

// Dashboard Stats API
export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const res = await fetch(`${getBaseUrl()}/api/stats`, {
      signal: AbortSignal.timeout(2000),
    });
    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
  } catch {
    // Fallback
  }
  return getLocalDashboardStats();
}
