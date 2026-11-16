const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const { validateBooking } = require("../middleware/validateBooking");

// Booking endpoints
router.post("/", validateBooking, bookingController.createBooking);
router.get("/", bookingController.getBookings);

module.exports = router;
