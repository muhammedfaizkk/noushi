const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");

// Room endpoints
router.get("/", roomController.getRooms);
router.get("/:id", roomController.getRoomById);

module.exports = router;
