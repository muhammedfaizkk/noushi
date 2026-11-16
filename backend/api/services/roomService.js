const { roomsStore } = require("../../data/initialData");

/**
 * Filter and sort rooms based on query parameters
 * @param {Object} query - { category, search, sortBy }
 * @returns {Array} List of filtered and sorted rooms
 */
const getAllRooms = ({ category, search, sortBy } = {}) => {
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
    results.sort((a, b) => parseInt(a.number || "0", 10) - parseInt(b.number || "0", 10));
  }

  return results;
};

/**
 * Find room by ID
 * @param {string} id
 * @returns {Object|null}
 */
const getRoomById = (id) => {
  return roomsStore.find((r) => r.id === id) || null;
};

module.exports = {
  getAllRooms,
  getRoomById,
};
