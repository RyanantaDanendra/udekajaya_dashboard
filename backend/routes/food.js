const express = require("express");

const { index } = require("../controllers/foodController");

const router = express.Router();

router.get("/", index);

module.exports = router;
