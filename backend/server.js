require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const foodRoutes = require("./routes/food");
const userRoutes = require("./routes/user");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  // .then(() => {
  //   // listen request
  //   app.listen(process.env.PORT, () => {
  //     console.log("Connected to db & Listening on port 4000");
  //   });
  // })
  .catch((error) => {
    console.log(error);
  });

app.use("/foods", foodRoutes);
app.use("/", userRoutes);

module.exports = app;
