const express = require("express");
const router = express.Router();
const {
  getAdminStats,
  getAdminRooms,
  createAdminRoom,
  updateAdminRoom,
  deleteAdminRoom,
  getAdminBookings,
  updateAdminBookingStatus,
  deleteAdminBooking,
} = require("./adminController");

// Stats
router.get("/stats", getAdminStats);

// Rooms
router.get("/rooms", getAdminRooms);
router.post("/rooms", createAdminRoom);
router.put("/rooms/:id", updateAdminRoom);
router.delete("/rooms/:id", deleteAdminRoom);

// Bookings
router.get("/bookings", getAdminBookings);
router.patch("/bookings/:id/status", updateAdminBookingStatus);
router.delete("/bookings/:id", deleteAdminBooking);

module.exports = router;
