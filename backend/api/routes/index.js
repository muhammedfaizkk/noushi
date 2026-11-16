const express = require("express");
const router = express.Router();

const roomRoutes = require("./roomRoutes");
const bookingRoutes = require("./bookingRoutes");
const statsRoutes = require("./statsRoutes");

router.use("/rooms", roomRoutes);
router.use("/bookings", bookingRoutes);
router.use("/stats", statsRoutes);

module.exports = router;
