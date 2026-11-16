const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { initialRooms, initialBookings } = require("./data/initialData");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// In-memory State Store (can be plugged into MongoDB / PostgreSQL)
let rooms = [...initialRooms];
let bookings = [...initialBookings];

// ==========================================
// 1. HEALTH CHECK & STATS
// ==========================================
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    totalRooms: rooms.length,
    totalBookings: bookings.length,
  });
});

app.get("/api/stats", (req, res) => {
  const totalRevenue = bookings.reduce(
    (sum, b) => (b.status === "confirmed" ? sum + (b.totalAmount || 0) : sum),
    0
  );
  const pendingInquiries = bookings.filter((b) => b.status === "pending").length;
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed").length;
  const averagePrice =
    rooms.length > 0
      ? Math.round(rooms.reduce((sum, r) => sum + r.price, 0) / rooms.length)
      : 0;

  // Regional breakdown
  const regions = {};
  rooms.forEach((r) => {
    regions[r.state] = (regions[r.state] || 0) + 1;
  });

  res.json({
    totalRooms: rooms.length,
    totalBookings: bookings.length,
    pendingInquiries,
    confirmedBookings,
    totalRevenue,
    formattedRevenue: `₹${totalRevenue.toLocaleString("en-IN")}`,
    averagePrice,
    formattedAveragePrice: `₹${averagePrice.toLocaleString("en-IN")}`,
    regionalBreakdown: regions,
  });
});

// ==========================================
// 2. ROOMS ENDPOINTS
// ==========================================
// List all rooms with filtering, search & sort
app.get("/api/rooms", (req, res) => {
  const { category, search, sortBy } = req.query;
  let results = [...rooms];

  if (category && category !== "All") {
    results = results.filter(
      (r) =>
        r.category.toLowerCase() === category.toLowerCase() ||
        (category.toLowerCase() === "mountains" && r.category.toLowerCase() === "mountain")
    );
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q) ||
        r.state.toLowerCase().includes(q)
    );
  }

  if (sortBy === "price-asc") {
    results.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    results.sort((a, b) => b.price - a.price);
  } else {
    // Default by room number
    results.sort((a, b) => parseInt(a.number || "0") - parseInt(b.number || "0"));
  }

  res.json({ success: true, count: results.length, data: results });
});

// Get single room
app.get("/api/rooms/:id", (req, res) => {
  const room = rooms.find((r) => r.id === req.params.id);
  if (!room) {
    return res.status(404).json({ success: false, message: "Room not found" });
  }
  res.json({ success: true, data: room });
});

// Create new room
app.post("/api/rooms", (req, res) => {
  const {
    title,
    location,
    state,
    category,
    price,
    image,
    tags,
    description,
    amenities,
    maxGuests,
    host,
  } = req.body;

  if (!title || !price || !location) {
    return res.status(400).json({
      success: false,
      message: "Title, price and location are required fields.",
    });
  }

  const nextNumber = String(rooms.length + 1).padStart(2, "0");
  const newId =
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now().toString().slice(-4);

  const numPrice = Number(price);

  const newRoom = {
    id: newId,
    number: nextNumber,
    title,
    location,
    state: state || location.split(",")[1]?.trim() || "India",
    category: category || "Beach",
    price: numPrice,
    formattedPrice: `₹${numPrice.toLocaleString("en-IN")}`,
    image:
      image ||
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80",
    tags: Array.isArray(tags) ? tags : (tags ? tags.split(",").map((t) => t.trim()) : ["Wi-Fi", "Verified"]),
    description: description || "A serene handpicked room with authentic local charm.",
    status: "available",
    host: host || {
      name: "Local Host",
      phone: "+919876543210",
      responseSpeed: "Within 10 minutes",
    },
    amenities: Array.isArray(amenities)
      ? amenities
      : [
          "High-speed Wi-Fi",
          "Complimentary Breakfast",
          "Dedicated Host",
          "En-suite Bathroom",
        ],
    maxGuests: Number(maxGuests) || 2,
    createdAt: new Date().toISOString(),
  };

  rooms.push(newRoom);
  res.status(201).json({ success: true, data: newRoom });
});

// Update room
app.put("/api/rooms/:id", (req, res) => {
  const index = rooms.findIndex((r) => r.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: "Room not found" });
  }

  const updatedData = req.body;
  if (updatedData.price) {
    updatedData.price = Number(updatedData.price);
    updatedData.formattedPrice = `₹${updatedData.price.toLocaleString("en-IN")}`;
  }

  rooms[index] = {
    ...rooms[index],
    ...updatedData,
    updatedAt: new Date().toISOString(),
  };

  res.json({ success: true, data: rooms[index] });
});

// Delete room
app.delete("/api/rooms/:id", (req, res) => {
  const index = rooms.findIndex((r) => r.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: "Room not found" });
  }

  const deleted = rooms.splice(index, 1)[0];
  res.json({ success: true, message: "Room deleted successfully", data: deleted });
});

// ==========================================
// 3. BOOKINGS & INQUIRIES ENDPOINTS
// ==========================================
// List bookings
app.get("/api/bookings", (req, res) => {
  const { status, search } = req.query;
  let results = [...bookings];

  if (status && status !== "all") {
    results = results.filter((b) => b.status === status);
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (b) =>
        b.guestName.toLowerCase().includes(q) ||
        b.guestEmail?.toLowerCase().includes(q) ||
        b.guestPhone?.includes(q) ||
        b.roomTitle?.toLowerCase().includes(q)
    );
  }

  // Sort newest first
  results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  res.json({ success: true, count: results.length, data: results });
});

// Create new booking inquiry
app.post("/api/bookings", (req, res) => {
  const {
    roomId,
    roomTitle,
    guestName,
    guestEmail,
    guestPhone,
    checkIn,
    checkOut,
    nights,
    guests,
    notes,
  } = req.body;

  if (!guestName || !guestPhone) {
    return res.status(400).json({
      success: false,
      message: "Guest name and phone number are required.",
    });
  }

  const matchedRoom = rooms.find((r) => r.id === roomId || r.title === roomTitle);
  const stayNights = Number(nights) || 2;
  const pricePerNight = matchedRoom ? matchedRoom.price : 3500;
  const total = pricePerNight * stayNights;

  const newBooking = {
    id: `bk-${Date.now().toString().slice(-4)}`,
    roomId: matchedRoom ? matchedRoom.id : (roomId || "custom"),
    roomTitle: matchedRoom ? matchedRoom.title : (roomTitle || "Boutique Stay"),
    guestName,
    guestEmail: guestEmail || `${guestName.toLowerCase().replace(/\s+/g, ".")}@example.com`,
    guestPhone,
    checkIn: checkIn || new Date().toISOString().slice(0, 10),
    checkOut: checkOut || new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10),
    nights: stayNights,
    guests: guests || "2 guests",
    totalAmount: total,
    status: "pending",
    notes: notes || "Direct inquiry from website",
    createdAt: new Date().toISOString(),
  };

  bookings.unshift(newBooking);
  res.status(201).json({ success: true, data: newBooking });
});

// Update booking status
app.patch("/api/bookings/:id/status", (req, res) => {
  const { status } = req.body;
  const booking = bookings.find((b) => b.id === req.params.id);

  if (!booking) {
    return res.status(404).json({ success: false, message: "Booking not found" });
  }

  if (!["pending", "confirmed", "cancelled"].includes(status)) {
    return res.status(400).json({ success: false, message: "Invalid status value" });
  }

  booking.status = status;
  booking.updatedAt = new Date().toISOString();

  res.json({ success: true, data: booking });
});

// Delete booking
app.delete("/api/bookings/:id", (req, res) => {
  const index = bookings.findIndex((b) => b.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: "Booking not found" });
  }

  const deleted = bookings.splice(index, 1)[0];
  res.json({ success: true, message: "Booking removed", data: deleted });
});

// Start listening
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`[Express Backend] Driftwood Stays API running on http://localhost:${PORT}`);
    console.log(`[Endpoints] GET http://localhost:${PORT}/api/health`);
    console.log(`[Endpoints] GET http://localhost:${PORT}/api/rooms`);
    console.log(`[Endpoints] GET http://localhost:${PORT}/api/bookings`);
    console.log(`[Endpoints] GET http://localhost:${PORT}/api/stats`);
  });
}

module.exports = app;
