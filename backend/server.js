const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Handlers from the two backend subfolders: api and admin
const apiRouter = require("./api");
const adminRouter = require("./admin");
const { roomsStore, bookingsStore } = require("./data/initialData");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// ==========================================
// 1. HEALTH CHECK
// ==========================================
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    totalRooms: roomsStore.length,
    totalBookings: bookingsStore.length,
  });
});

// ==========================================
// 2. ADMIN FOLDER ROUTES (/api/admin/...)
// ==========================================
app.use("/api/admin", adminRouter);

// ==========================================
// 3. PUBLIC API FOLDER ROUTES (/api/...)
// ==========================================
app.use("/api", apiRouter);

// Start Server
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`  [Backend Server] Driftwood Stays`);
    console.log(`  Running on http://localhost:${PORT}`);
    console.log(`======================================================`);
    console.log(`  Health Check:  GET  http://localhost:${PORT}/api/health`);
    console.log(`  Storefront API:GET  http://localhost:${PORT}/api/rooms`);
    console.log(`  Admin API:     GET  http://localhost:${PORT}/api/admin/stats`);
    console.log(`======================================================\n`);
  });
}

module.exports = app;
