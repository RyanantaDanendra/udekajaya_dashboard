require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const foodRoutes = require("./routes/food");
const userRoutes = require("./routes/user");

const app = express();

const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:3000";
const corsOptions = {
  // Only allow requests from your frontend domain
  origin: allowedOrigin,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/foods", foodRoutes);
app.use("/", userRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Backend Serverless Function is running!" });
});

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

// LOCAL
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     // listen request
//     // app.listen(process.env.PORT, () => {
//     console.log("Connected to db");
//     // });
//   })
//   .catch((error) => {
//     console.log(error);
//   });

module.exports = async (req, res) => {
  await connectDb();
  // We explicitly call the express app to handle the request/response
  app(req, res);
};
