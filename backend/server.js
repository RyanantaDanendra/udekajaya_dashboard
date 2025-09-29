require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const foodRoutes = require("./routes/food");
const userRoutes = require("./routes/user");

const app = express();

// Define allowed origins
const allowedOrigins = [
  process.env.FRONTEND_URL || "https://udekajaya-dashboard.vercel.app",
  "http://localhost:3000",
  "http://localhost:5174",
];

// --- CRITICAL: CORS MUST BE FIRST ---
app.use((req, res, next) => {
  const origin = req.headers.origin;

  // Set CORS headers for allowed origins
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS, PATCH"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With, Accept, Origin"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "86400");

  // Handle OPTIONS preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

// JSON Body Parser (AFTER CORS, BEFORE ROUTES)
app.use(express.json());

// Root Check
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Backend Serverless Function is running!",
    allowed_origins: allowedOrigins,
  });
});

// Route Handlers
app.use("/foods", foodRoutes);
app.use("/", userRoutes);

// Database Connection
let isConnected = false;

const connectDb = async () => {
  if (isConnected) {
    console.log("Using existing database connection.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("Connected to db");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

// Vercel Serverless Export
module.exports = async (req, res) => {
  await connectDb();
  app(req, res);
};
