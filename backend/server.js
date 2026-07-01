const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// Load Environment Variables
dotenv.config();

// Database
const connectDB = require("./config/db");

// Connect MongoDB
console.log("MONGO_URI:", process.env.MONGO_URI);
connectDB();

const app = express();

// =========================
// Middlewares
// =========================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// =========================
// Static Upload Folder
// =========================

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// =========================
// Import Routes
// =========================

const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const qrRoutes = require("./routes/qrRoutes");
const profileRoutes = require("./routes/profileRoutes");
const reportRoutes = require("./routes/reportRoutes");

// =========================
// API Routes
// =========================

app.use("/api/auth", authRoutes);

app.use("/api/events", eventRoutes);

app.use("/api/tickets", ticketRoutes);

app.use("/api/qr", qrRoutes);

app.use("/api/profile", profileRoutes);

app.use("/api/reports", reportRoutes);

// =========================
// Home Route
// =========================

app.get("/", (req, res) => {
  res.send("🚀 Event Management System API Running...");
});

// =========================
// 404 Route
// =========================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API Route Not Found",
  });
});

// =========================
// Start Server
// =========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running on Port ${PORT}`);
});