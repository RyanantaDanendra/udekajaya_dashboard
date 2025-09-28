const express = require("express");
const requireAuth = require("../middleware/requireAuth");

const {
  index,
  addFood,
  editJumlah,
  deleteFood,
  editHarga,
} = require("../controllers/foodController");

const router = express.Router();
router.use(requireAuth);

router.get("/", index);

router.post("/addFood", addFood);

router.patch("/editJumlah/:id", editJumlah);
router.patch("/editHarga/:id", editHarga);

router.delete("/deleteFood/:id", deleteFood);

module.exports = router;
