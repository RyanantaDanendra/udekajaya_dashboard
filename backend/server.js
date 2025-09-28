require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const foodRoutes = require("./routes/food");
const userRoutes = require("./routes/user");

const app = express();

app.use(express.json());

const allowedOrigin = process.env.FRONTEND_URL;
const corsOptions = {
  // Only allow requests from your frontend domain
  origin: allowedOrigin,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen request
    // app.listen(process.env.PORT, () => {
    console.log("Connected to db");
    // });
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/foods", foodRoutes);
app.use("/", userRoutes);
