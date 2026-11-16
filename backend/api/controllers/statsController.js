const statsService = require("../services/statsService");

/**
 * Controller: Get storefront stats
 * GET /api/stats
 */
const getStats = (req, res) => {
  try {
    const data = statsService.getStats();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to generate stats.",
      error: error.message,
    });
  }
};

module.exports = {
  getStats,
};
