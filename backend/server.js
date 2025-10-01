require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const corsMiddleware = require("./middleware/cors");

const foodRoutes = require("./routes/food");
const userRoutes = require("./routes/user");

const app = express();

// use cors middleware
app.use(corsMiddleware);

// JSON Body Parser (AFTER CORS, BEFORE ROUTES)
app.use(express.json());

// Root Check
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Backend Serverless Function is running!",
    // allowed_origins: allowedOrigins,
  });
});

// Route Handlers
app.use("/foods", foodRoutes);
app.use("/", userRoutes);

// Database Connection
let isConnected = false;

// production
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

// local
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     app.listen(process.env.PORT, () => {
//       console.log("Connected to database & Listening on port 4000");
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// Vercel Serverless Export
module.exports = async (req, res) => {
  await connectDb();
  app(req, res);
};
