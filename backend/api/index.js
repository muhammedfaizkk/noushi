const express = require("express");
const router = express.Router();

const roomsRouter = require("./rooms");
const bookingsRouter = require("./bookings");
const statsRouter = require("./stats");

router.use("/rooms", roomsRouter);
router.use("/bookings", bookingsRouter);
router.use("/stats", statsRouter);

module.exports = router;
