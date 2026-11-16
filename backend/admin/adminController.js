const { roomsStore, bookingsStore } = require("../data/initialData");

// Get comprehensive admin stats
const getAdminStats = (req, res) => {
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

  const regionalBreakdown = {};
  roomsStore.forEach((r) => {
    regionalBreakdown[r.state] = (regionalBreakdown[r.state] || 0) + 1;
  });

  res.json({
    success: true,
    data: {
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
    },
  });
};

// Admin: Get all rooms
const getAdminRooms = (req, res) => {
  res.json({
    success: true,
    count: roomsStore.length,
    data: roomsStore,
  });
};

// Admin: Create room
const createAdminRoom = (req, res) => {
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

  const nextNumber = String(roomsStore.length + 1).padStart(2, "0");
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
    tags: Array.isArray(tags)
      ? tags
      : tags
      ? tags.split(",").map((t) => t.trim())
      : ["Wi-Fi", "Verified"],
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

  roomsStore.push(newRoom);
  res.status(201).json({ success: true, data: newRoom });
};

// Admin: Update room
const updateAdminRoom = (req, res) => {
  const index = roomsStore.findIndex((r) => r.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: "Room not found" });
  }

  const updatedData = req.body;
  if (updatedData.price) {
    updatedData.price = Number(updatedData.price);
    updatedData.formattedPrice = `₹${updatedData.price.toLocaleString("en-IN")}`;
  }

  roomsStore[index] = {
    ...roomsStore[index],
    ...updatedData,
    updatedAt: new Date().toISOString(),
  };

  res.json({ success: true, data: roomsStore[index] });
};

// Admin: Delete room
const deleteAdminRoom = (req, res) => {
  const index = roomsStore.findIndex((r) => r.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: "Room not found" });
  }

  const deleted = roomsStore.splice(index, 1)[0];
  res.json({ success: true, message: "Room removed", data: deleted });
};

// Admin: Get all bookings
const getAdminBookings = (req, res) => {
  const { status, search } = req.query;
  let results = [...bookingsStore];

  if (status && status !== "all") {
    results = results.filter((b) => b.status === status);
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (b) =>
        b.guestName.toLowerCase().includes(q) ||
        b.guestPhone?.includes(q) ||
        b.roomTitle?.toLowerCase().includes(q)
    );
  }

  results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json({ success: true, count: results.length, data: results });
};

// Admin: Update booking status
const updateAdminBookingStatus = (req, res) => {
  const { status } = req.body;
  const booking = bookingsStore.find((b) => b.id === req.params.id);

  if (!booking) {
    return res.status(404).json({ success: false, message: "Booking not found" });
  }

  if (!["pending", "confirmed", "cancelled"].includes(status)) {
    return res.status(400).json({ success: false, message: "Invalid status" });
  }

  booking.status = status;
  booking.updatedAt = new Date().toISOString();

  res.json({ success: true, data: booking });
};

// Admin: Delete booking
const deleteAdminBooking = (req, res) => {
  const index = bookingsStore.findIndex((b) => b.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: "Booking not found" });
  }

  const deleted = bookingsStore.splice(index, 1)[0];
  res.json({ success: true, message: "Booking deleted", data: deleted });
};

module.exports = {
  getAdminStats,
  getAdminRooms,
  createAdminRoom,
  updateAdminRoom,
  deleteAdminRoom,
  getAdminBookings,
  updateAdminBookingStatus,
  deleteAdminBooking,
};
