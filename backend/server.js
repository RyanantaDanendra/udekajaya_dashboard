require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const foodRoutes = require("./routes/food");
const userRoutes = require("./routes/user");

const app = express();

const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:3000";

// --- Middleware Setup ---
// const corsOptions = {
//   // This value is read from the Vercel ENV variable.
//   origin: allowedOrigin,
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true,
//   // Setting 200 is often more reliable than 204 in Vercel for preflight success.
//   optionsSuccessStatus: 200,
// };

// // 1. CORS Configuration - Applied globally to handle OPTIONS requests first
// app.use(cors(corsOptions));

// app.options("*", cors(corsOptions));

app.use((req, res, next) => {
  const origin = req.headers.origin;

  // Set CORS headers for allowed origins
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else if (!origin) {
    // For same-origin requests (no Origin header)
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5174");
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
    res.status(200).end();
    return;
  }

  next();
});

// 2. JSON Body Parser
app.use(express.json());

// 3. Optional: Root Check
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Backend Serverless Function is running!",
    allowed_origin_set: allowedOrigin,
  });
});

// --- Route Handlers ---
// These routes will only be processed after the global CORS check passes
app.use("/foods", foodRoutes);
app.use("/", userRoutes);

// --- Database Connection (Connection Pooling for Serverless) ---
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

// --- Vercel Serverless Export (Structural Fix for Stability) ---
const handler = (req, res) => {
  // Explicitly pass the request to the Express app instance
  app(req, res);
};

module.exports = async (req, res) => {
  await connectDb();
  // Use the explicit handler function
  handler(req, res);
};
