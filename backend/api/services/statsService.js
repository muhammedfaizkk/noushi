const { roomsStore, bookingsStore } = require("../../data/initialData");

/**
 * Calculate storefront aggregate performance statistics
 * @returns {Object} Stats summary
 */
const getStats = () => {
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

  return {
    totalRooms: roomsStore.length,
    totalBookings: bookingsStore.length,
    pendingInquiries,
    confirmedBookings,
    totalRevenue,
    formattedRevenue: `₹${totalRevenue.toLocaleString("en-IN")}`,
    averagePrice,
    formattedAveragePrice: `₹${averagePrice.toLocaleString("en-IN")}`,
    regionalBreakdown,
  };
};

module.exports = {
  getStats,
};
