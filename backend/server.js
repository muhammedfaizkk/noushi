const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Storefront API Router
const apiRouter = require("./api");
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
// 2. STOREFRONT API ROUTES (/api/...)
// ==========================================
app.use("/api", apiRouter);

// Start Server
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`  [Backend Server] Driftwood Stays (Storefront API)`);
    console.log(`  Running on http://localhost:${PORT}`);
    console.log(`======================================================`);
    console.log(`  Health Check:  GET  http://localhost:${PORT}/api/health`);
    console.log(`  Storefront API:GET  http://localhost:${PORT}/api/rooms`);
    console.log(`======================================================\n`);
  });
}

module.exports = app;
