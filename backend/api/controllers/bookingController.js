const bookingService = require("../services/bookingService");

/**
 * Controller: Create new guest booking inquiry
 * POST /api/bookings
 */
const createBooking = (req, res) => {
  try {
    const newBooking = bookingService.createBooking(req.body);
    res.status(201).json({
      success: true,
      data: newBooking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to process booking inquiry.",
      error: error.message,
    });
  }
};

/**
 * Controller: Get all bookings
 * GET /api/bookings
 */
const getBookings = (req, res) => {
  try {
    const bookings = bookingService.getAllBookings();
    res.json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings.",
      error: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getBookings,
};
