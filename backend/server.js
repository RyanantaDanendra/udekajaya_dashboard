require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectToDatabase = require("./db");

const foodRoutes = require("./routes/food");
const userRoutes = require("./routes/user");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://udekajaya-dashboard.vercel.app",
    methods: ["POST", "GET"],
    credentials: true,
  })
);

// connectToDatabase(process.env.MONGO_URI)
//   // .then(() => {
//   //   // listen request
//   //   app.listen(process.env.PORT, () => {
//   //     console.log("Connected to db & Listening on port 4000");
//   //   });
//   // })
//   .catch((error) => {
//     console.log(error);
//   });

app.use("/api/foods", foodRoutes);
app.use("/api", userRoutes);

// Add a catch-all for unsupported methods/routes
app.use((req, res) => {
  res.status(404).json({
    error: `Route ${req.method} ${req.path} not found`,
  });
});

module.exports = app;
