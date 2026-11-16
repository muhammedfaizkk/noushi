const express = require("express");
const router = express.Router();
const { roomsStore, bookingsStore } = require("../data/initialData");

// Create new customer booking inquiry
router.post("/", (req, res) => {
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

  const matchedRoom = roomsStore.find((r) => r.id === roomId || r.title === roomTitle);
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

  bookingsStore.unshift(newBooking);
  res.status(201).json({ success: true, data: newBooking });
});

// List bookings
router.get("/", (req, res) => {
  res.json({ success: true, count: bookingsStore.length, data: bookingsStore });
});

module.exports = router;
