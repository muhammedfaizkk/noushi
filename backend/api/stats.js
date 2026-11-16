const express = require("express");
const router = express.Router();
const { roomsStore, bookingsStore } = require("../data/initialData");

router.get("/", (req, res) => {
  const totalRevenue = bookingsStore.reduce(
    (sum, b) => (b.status === "confirmed" ? sum + (b.totalAmount || 0) : sum),
    0
  );
  const pendingInquiries = bookingsStore.filter((b) => b.status === "pending").length;
  const confirmedBookings = bookingsStore.filter((b) => b.status === "confirmed").length;
  const averagePrice =
    roomsStore.length > 0
      ? Math.round(roomsStore.reduce((sum, r) => sum + r.price, 0) / roomsStore.length)
      : 0;

  const regionalBreakdown = {};
  roomsStore.forEach((r) => {
    regionalBreakdown[r.state] = (regionalBreakdown[r.state] || 0) + 1;
  });

  res.json({
    totalRooms: roomsStore.length,
    totalBookings: bookingsStore.length,
    pendingInquiries,
    confirmedBookings,
    totalRevenue,
    formattedRevenue: `₹${totalRevenue.toLocaleString("en-IN")}`,
    averagePrice,
    formattedAveragePrice: `₹${averagePrice.toLocaleString("en-IN")}`,
    regionalBreakdown,
  });
});

module.exports = router;
