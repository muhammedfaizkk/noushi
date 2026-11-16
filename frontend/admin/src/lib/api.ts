export interface Room {
  id: string;
  number: string;
  title: string;
  location: string;
  state: string;
  category: "Beach" | "Mountain" | "City" | "Countryside";
  price: number;
  formattedPrice: string;
  image: string;
  tags: string[];
  description: string;
  host: {
    name: string;
    phone: string;
    responseSpeed: string;
  };
  amenities: string[];
  maxGuests: number;
}

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

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Initial seed fallback
let fallbackRooms: Room[] = [
  {
    id: "varkala-cliff",
    number: "01",
    title: "Cliffside Sea-View Room",
    location: "Varkala, Kerala",
    state: "Kerala",
    category: "Beach",
    price: 4200,
    formattedPrice: "₹4,200",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=80",
    tags: ["Sea view", "Wi-Fi", "50 m walk to sea", "Breakfast included"],
    description: "Perched directly above the North Cliff of Varkala, wake up to panoramic Arabian Sea horizons and gentle coastal breezes.",
    host: {
      name: "Anand",
      phone: "+919876543210",
      responseSpeed: "Within 10 minutes",
    },
    amenities: ["Panoramic Sea View", "Complimentary Breakfast", "High-speed Wi-Fi"],
    maxGuests: 2,
  },
  {
    id: "manali-cedar",
    number: "02",
    title: "Cedar Loft with Valley View",
    location: "Manali, Himachal Pradesh",
    state: "Himachal Pradesh",
    category: "Mountain",
    price: 3600,
    formattedPrice: "₹3,600",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1000&q=80",
    tags: ["Valley view", "Wi-Fi", "Heated rooms", "Work desk"],
    description: "Tucked amidst ancient deodar forests in Upper Manali, this warm timber loft offers floor-to-ceiling windows facing snow-dusted Himalayan peaks.",
    host: {
      name: "Tenzin & Meera",
      phone: "+919876543210",
      responseSpeed: "Within 15 minutes",
    },
    amenities: ["Himalayan Snow Peak View", "Radiant Heating", "Workstation"],
    maxGuests: 2,
  },
  {
    id: "jaipur-haveli",
    number: "03",
    title: "Heritage Haveli Suite",
    location: "Jaipur, Rajasthan",
    state: "Rajasthan",
    category: "City",
    price: 5800,
    formattedPrice: "₹5,800",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    tags: ["Courtyard", "Wi-Fi", "Air conditioning", "Artisan handcrafted"],
    description: "Step into 180 years of Rajasthani architectural heritage with stone jali arches.",
    host: {
      name: "Digvijay Singh",
      phone: "+919876543210",
      responseSpeed: "Within 5 minutes",
    },
    amenities: ["Heritage Courtyard Access", "Traditional Breakfast", "Silent AC"],
    maxGuests: 2,
  },
  {
    id: "coorg-plantation",
    number: "04",
    title: "Plantation Cottage",
    location: "Coorg, Karnataka",
    state: "Karnataka",
    category: "Countryside",
    price: 4900,
    formattedPrice: "₹4,900",
    image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=1000&q=80",
    tags: ["Garden", "Estate nature trails", "Free parking", "Bonfire area"],
    description: "Nestled inside a 40-acre heritage coffee and black pepper estate.",
    host: {
      name: "Bopanna",
      phone: "+919876543210",
      responseSpeed: "Within 10 minutes",
    },
    amenities: ["Coffee Estate Verandah", "Nature Walk", "Bonfire Pit"],
    maxGuests: 3,
  },
  {
    id: "goa-quarter",
    number: "05",
    title: "Old Quarter Studio",
    location: "Fontainhas, Goa",
    state: "Goa",
    category: "City",
    price: 2800,
    formattedPrice: "₹2,800",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=80",
    tags: ["Wi-Fi", "Historic walking", "Kitchenette", "Balcony"],
    description: "Set in the heart of Latin Quarter Fontainhas with Portuguese colonial architecture.",
    host: {
      name: "Maria & Carlos",
      phone: "+919876543210",
      responseSpeed: "Within 10 minutes",
    },
    amenities: ["Streetview Balcony", "Kitchenette", "High-speed Wi-Fi"],
    maxGuests: 2,
  },
  {
    id: "gokarna-palms",
    number: "06",
    title: "Beach Hut by the Palms",
    location: "Gokarna, Karnataka",
    state: "Karnataka",
    category: "Beach",
    price: 2400,
    formattedPrice: "₹2,400",
    image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1000&q=80",
    tags: ["Beach access", "Breakfast included", "Hammock", "Ceiling fan"],
    description: "A rustic bamboo sanctuary steps from Kudle Beach.",
    host: {
      name: "Shankar",
      phone: "+919876543210",
      responseSpeed: "Within 15 minutes",
    },
    amenities: ["Direct Beach Access", "Private Hammock", "Eco Shower"],
    maxGuests: 2,
  },
];

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

// Connection checker
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

// Rooms API
export async function getRooms(): Promise<Room[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/rooms`, {
      signal: AbortSignal.timeout(2000),
    });
    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
  } catch {
    // fallback
  }
  return [...fallbackRooms];
}

export async function createRoom(data: Partial<Room>): Promise<Room> {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/rooms`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
  } catch {
    // fallback
  }

  const num = String(fallbackRooms.length + 1).padStart(2, "0");
  const newRoom: Room = {
    id: `room-${Date.now()}`,
    number: num,
    title: data.title || "New Room",
    location: data.location || "Goa, India",
    state: data.state || "Goa",
    category: data.category || "Beach",
    price: Number(data.price) || 3500,
    formattedPrice: `₹${Number(data.price || 3500).toLocaleString("en-IN")}`,
    image:
      data.image ||
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80",
    tags: data.tags || ["Wi-Fi", "Verified"],
    description: data.description || "Boutique retreat.",
    host: data.host || {
      name: "Host",
      phone: "+919876543210",
      responseSpeed: "Within 10 minutes",
    },
    amenities: data.amenities || ["Wi-Fi", "Breakfast"],
    maxGuests: Number(data.maxGuests) || 2,
  };
  fallbackRooms.push(newRoom);
  return newRoom;
}

export async function updateRoom(id: string, data: Partial<Room>): Promise<Room> {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/rooms/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
  } catch {
    // fallback
  }

  const idx = fallbackRooms.findIndex((r) => r.id === id);
  if (idx !== -1) {
    fallbackRooms[idx] = { ...fallbackRooms[idx], ...data };
    return fallbackRooms[idx];
  }
  throw new Error("Room not found");
}

export async function deleteRoom(id: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/rooms/${id}`, {
      method: "DELETE",
    });
    if (res.ok) return true;
  } catch {
    // fallback
  }

  fallbackRooms = fallbackRooms.filter((r) => r.id !== id);
  return true;
}

// Bookings API
export async function getBookings(): Promise<Booking[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/bookings`, {
      signal: AbortSignal.timeout(2000),
    });
    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
  } catch {
    // fallback
  }
  return [...fallbackBookings];
}

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
    // fallback
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
    notes: data.notes || "Direct inquiry",
    createdAt: new Date().toISOString(),
  };
  fallbackBookings.unshift(newBooking);
  return newBooking;
}

export async function updateBookingStatus(
  id: string,
  status: "pending" | "confirmed" | "cancelled"
): Promise<Booking> {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/bookings/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
  } catch {
    // fallback
  }

  const b = fallbackBookings.find((x) => x.id === id);
  if (b) {
    b.status = status;
    return b;
  }
  throw new Error("Booking not found");
}

export async function deleteBooking(id: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/bookings/${id}`, {
      method: "DELETE",
    });
    if (res.ok) return true;
  } catch {
    // fallback
  }

  fallbackBookings = fallbackBookings.filter((b) => b.id !== id);
  return true;
}

// Stats API
export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/stats`, {
      signal: AbortSignal.timeout(2000),
    });
    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
  } catch {
    // fallback
  }

  const rev = fallbackBookings.reduce(
    (sum, b) => (b.status === "confirmed" ? sum + (b.totalAmount || 0) : sum),
    0
  );
  const avg =
    fallbackRooms.length > 0
      ? Math.round(
          fallbackRooms.reduce((sum, r) => sum + r.price, 0) /
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
    totalRevenue: rev,
    formattedRevenue: `₹${rev.toLocaleString("en-IN")}`,
    averagePrice: avg,
    formattedAveragePrice: `₹${avg.toLocaleString("en-IN")}`,
    regionalBreakdown: reg,
  };
}
