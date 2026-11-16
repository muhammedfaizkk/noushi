const express = require("express");
const router = express.Router();
const { roomsStore } = require("../data/initialData");

// Get all rooms (with filters & search)
router.get("/", (req, res) => {
  const { category, search, sortBy } = req.query;
  let results = [...roomsStore];

  if (category && category !== "All") {
    results = results.filter(
      (r) =>
        r.category.toLowerCase() === category.toLowerCase() ||
        (category.toLowerCase() === "mountains" && r.category.toLowerCase() === "mountain")
    );
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q) ||
        r.state.toLowerCase().includes(q)
    );
  }

  if (sortBy === "price-asc") {
    results.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    results.sort((a, b) => b.price - a.price);
  } else {
    results.sort((a, b) => parseInt(a.number || "0") - parseInt(b.number || "0"));
  }

  res.json({ success: true, count: results.length, data: results });
});

// Get single room by ID
router.get("/:id", (req, res) => {
  const room = roomsStore.find((r) => r.id === req.params.id);
  if (!room) {
    return res.status(404).json({ success: false, message: "Room not found" });
  }
  res.json({ success: true, data: room });
});

module.exports = router;
