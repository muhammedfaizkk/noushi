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
  createdAt?: string;
  updatedAt?: string;
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
  updatedAt?: string;
}

export interface DashboardStats {
  totalRooms: number;
  totalBookings: number;
  pendingInquiries: number;
  confirmedBookings: number;
  cancelledBookings: number;
  totalRevenue: number;
  formattedRevenue: string;
  averagePrice: number;
  formattedAveragePrice: string;
  regionalBreakdown: Record<string, number>;
}

// Global in-memory cache to persist across Next.js dev reloads
declare global {
  var __adminRoomsStore: Room[] | undefined;
  var __adminBookingsStore: Booking[] | undefined;
}

const initialRooms: Room[] = [
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
    amenities: [
      "Panoramic Sea View",
      "Complimentary Kerala Breakfast",
      "High-speed Wi-Fi (150 Mbps)",
      "Air Conditioning",
      "Private Sundeck & Hammock",
    ],
    maxGuests: 2,
    createdAt: "2026-11-01T08:00:00.000Z",
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
    amenities: [
      "Himalayan Snow Peak View",
      "Radiant Space Heating",
      "Handmade Cedar Woodwork",
      "Dedicated Workstation & Wi-Fi",
    ],
    maxGuests: 2,
    createdAt: "2026-11-02T10:30:00.000Z",
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
    description: "Step into 180 years of Rajasthani architectural heritage with intricate stone jali arches and open central courtyard.",
    host: {
      name: "Digvijay Singh",
      phone: "+919876543210",
      responseSpeed: "Within 5 minutes",
    },
    amenities: [
      "Private Heritage Courtyard Access",
      "Traditional Rajasthani Breakfast",
      "Silent Inverter AC",
      "Artisanal Block-Print Linens",
    ],
    maxGuests: 2,
    createdAt: "2026-11-03T11:15:00.000Z",
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
    description: "Nestled inside a 40-acre heritage coffee and black pepper estate. Wake up to freshly roasted beans and rainforest streams.",
    host: {
      name: "Bopanna",
      phone: "+919876543210",
      responseSpeed: "Within 10 minutes",
    },
    amenities: [
      "Private Coffee Estate Verandah",
      "Guided Morning Birding Walk",
      "Evening Firepit & Barbecue",
      "Home-cooked Kodava Meals",
    ],
    maxGuests: 3,
    createdAt: "2026-11-04T09:00:00.000Z",
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
    description: "Set in the heart of Latin Quarter Fontainhas with Portuguese colonial architecture and iron-wrought balcony.",
    host: {
      name: "Maria & Carlos",
      phone: "+919876543210",
      responseSpeed: "Within 10 minutes",
    },
    amenities: [
      "Wrought-Iron Streetview Balcony",
      "Equipped Kitchenette",
      "High-speed Wi-Fi",
      "Air Conditioning",
    ],
    maxGuests: 2,
    createdAt: "2026-11-05T14:20:00.000Z",
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
    description: "A rustic bamboo and thatch sanctuary just steps away from the untouched sands of Kudle Beach.",
    host: {
      name: "Shankar",
      phone: "+919876543210",
      responseSpeed: "Within 15 minutes",
    },
    amenities: [
      "Direct Step-out Beach Access",
      "Private Verandah & Cotton Hammock",
      "Fresh Tropical Fruit Breakfast",
      "Open-air Eco Shower",
    ],
    maxGuests: 2,
    createdAt: "2026-11-06T16:45:00.000Z",
  },
];

const initialBookings: Booking[] = [
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

if (!globalThis.__adminRoomsStore) {
  globalThis.__adminRoomsStore = [...initialRooms];
}
if (!globalThis.__adminBookingsStore) {
  globalThis.__adminBookingsStore = [...initialBookings];
}

export const roomsStore = globalThis.__adminRoomsStore;
export const bookingsStore = globalThis.__adminBookingsStore;

// Store Operations
export function getRooms(): Room[] {
  return [...roomsStore];
}

export function getRoomById(id: string): Room | undefined {
  return roomsStore.find((r) => r.id === id);
}

export function createRoom(data: Partial<Room>): Room {
  const nextNumber = String(roomsStore.length + 1).padStart(2, "0");
  const newId =
    (data.title || "room")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") +
    "-" +
    Date.now().toString().slice(-4);
  const numPrice = Number(data.price) || 3500;

  const newRoom: Room = {
    id: newId,
    number: nextNumber,
    title: data.title || "New Room",
    location: data.location || "Goa, India",
    state: data.state || (data.location ? data.location.split(",")[1]?.trim() : "India") || "India",
    category: data.category || "Beach",
    price: numPrice,
    formattedPrice: `₹${numPrice.toLocaleString("en-IN")}`,
    image:
      data.image ||
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80",
    tags: Array.isArray(data.tags)
      ? data.tags
      : ["Wi-Fi", "Verified"],
    description: data.description || "A serene handpicked room with authentic local charm.",
    host: data.host || {
      name: "Local Host",
      phone: "+919876543210",
      responseSpeed: "Within 10 minutes",
    },
    amenities: Array.isArray(data.amenities)
      ? data.amenities
      : [
          "High-speed Wi-Fi",
          "Complimentary Breakfast",
          "Dedicated Host",
          "En-suite Bathroom",
        ],
    maxGuests: Number(data.maxGuests) || 2,
    createdAt: new Date().toISOString(),
  };

  roomsStore.push(newRoom);
  return newRoom;
}

export function updateRoom(id: string, data: Partial<Room>): Room | null {
  const index = roomsStore.findIndex((r) => r.id === id);
  if (index === -1) return null;

  const current = roomsStore[index];
  const numPrice = data.price !== undefined ? Number(data.price) : current.price;

  roomsStore[index] = {
    ...current,
    ...data,
    price: numPrice,
    formattedPrice: `₹${numPrice.toLocaleString("en-IN")}`,
    updatedAt: new Date().toISOString(),
  };

  return roomsStore[index];
}

export function deleteRoom(id: string): Room | null {
  const index = roomsStore.findIndex((r) => r.id === id);
  if (index === -1) return null;
  return roomsStore.splice(index, 1)[0];
}

export function getBookings(filter?: { status?: string; search?: string }): Booking[] {
  let results = [...bookingsStore];

  if (filter?.status && filter.status !== "all") {
    results = results.filter((b) => b.status === filter.status);
  }

  if (filter?.search) {
    const q = filter.search.toLowerCase();
    results = results.filter(
      (b) =>
        b.guestName.toLowerCase().includes(q) ||
        b.guestPhone.includes(q) ||
        b.roomTitle.toLowerCase().includes(q)
    );
  }

  results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return results;
}

export function createBooking(data: Partial<Booking>): Booking {
  const matchedRoom = roomsStore.find((r) => r.id === data.roomId || r.title === data.roomTitle);
  const stayNights = Number(data.nights) || 2;
  const price = matchedRoom ? matchedRoom.price : 3500;
  const total = Number(data.totalAmount) || price * stayNights;

  const newBooking: Booking = {
    id: `bk-${Date.now().toString().slice(-4)}`,
    roomId: matchedRoom ? matchedRoom.id : (data.roomId || "custom"),
    roomTitle: matchedRoom ? matchedRoom.title : (data.roomTitle || "Boutique Stay"),
    guestName: data.guestName || "Guest",
    guestEmail: data.guestEmail || `${(data.guestName || "guest").toLowerCase().replace(/\s+/g, ".")}@example.com`,
    guestPhone: data.guestPhone || "+91 98765 43210",
    checkIn: data.checkIn || new Date().toISOString().slice(0, 10),
    checkOut: data.checkOut || new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10),
    nights: stayNights,
    guests: data.guests || "2 guests",
    totalAmount: total,
    status: data.status || "pending",
    notes: data.notes || "Recorded via Admin Console",
    createdAt: new Date().toISOString(),
  };

  bookingsStore.unshift(newBooking);
  return newBooking;
}

export function updateBookingStatus(
  id: string,
  status: "pending" | "confirmed" | "cancelled"
): Booking | null {
  const booking = bookingsStore.find((b) => b.id === id);
  if (!booking) return null;
  booking.status = status;
  booking.updatedAt = new Date().toISOString();
  return booking;
}

export function deleteBooking(id: string): Booking | null {
  const index = bookingsStore.findIndex((b) => b.id === id);
  if (index === -1) return null;
  return bookingsStore.splice(index, 1)[0];
}

export function getDashboardStats(): DashboardStats {
  const totalRevenue = bookingsStore.reduce(
    (sum, b) => (b.status === "confirmed" ? sum + (b.totalAmount || 0) : sum),
    0
  );
  const pendingInquiries = bookingsStore.filter((b) => b.status === "pending").length;
  const confirmedBookings = bookingsStore.filter((b) => b.status === "confirmed").length;
  const cancelledBookings = bookingsStore.filter((b) => b.status === "cancelled").length;

  const averagePrice =
    roomsStore.length > 0
      ? Math.round(roomsStore.reduce((sum, r) => sum + r.price, 0) / roomsStore.length)
      : 0;

  const regionalBreakdown: Record<string, number> = {};
  roomsStore.forEach((r) => {
    regionalBreakdown[r.state] = (regionalBreakdown[r.state] || 0) + 1;
  });

  return {
    totalRooms: roomsStore.length,
    totalBookings: bookingsStore.length,
    pendingInquiries,
    confirmedBookings,
    cancelledBookings,
    totalRevenue,
    formattedRevenue: `₹${totalRevenue.toLocaleString("en-IN")}`,
    averagePrice,
    formattedAveragePrice: `₹${averagePrice.toLocaleString("en-IN")}`,
    regionalBreakdown,
  };
}
