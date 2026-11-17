const { roomsStore, bookingsStore } = require("../../data/initialData");

/**
 * Create a new guest booking inquiry
 * @param {Object} bookingData
 * @returns {Object} Newly created booking
 */
const createBooking = (bookingData) => {
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
  } = bookingData;

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
  return newBooking;
};

/**
 * Retrieve all bookings
 * @returns {Array} List of all bookings
 */
const getAllBookings = () => {
  return bookingsStore;
};

module.exports = {
  createBooking,
  getAllBookings,
};
