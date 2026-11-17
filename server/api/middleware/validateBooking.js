/**
 * Middleware to validate booking inquiry payload
 */
const validateBooking = (req, res, next) => {
  const { guestName, guestPhone } = req.body || {};

  if (!guestName || !guestPhone) {
    return res.status(400).json({
      success: false,
      message: "Guest name and phone number are required.",
    });
  }

  next();
};

module.exports = {
  validateBooking,
};
