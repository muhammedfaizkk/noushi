const roomService = require("../services/roomService");

/**
 * Controller: Get all rooms (with filters & search)
 * GET /api/rooms
 */
const getRooms = (req, res) => {
  try {
    const results = roomService.getAllRooms(req.query);
    res.json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch rooms.",
      error: error.message,
    });
  }
};

/**
 * Controller: Get single room by ID
 * GET /api/rooms/:id
 */
const getRoomById = (req, res) => {
  try {
    const room = roomService.getRoomById(req.params.id);
    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }
    res.json({
      success: true,
      data: room,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch room details.",
      error: error.message,
    });
  }
};

module.exports = {
  getRooms,
  getRoomById,
};
