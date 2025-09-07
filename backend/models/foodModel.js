const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const foodSchema = new Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    jumlah: {
      type: Number,
      required: true,
    },
    harga: {
      type: Number,
      required: true,
    },
    totalHarga: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  { timeseries: true }
);

module.exports = mongoose.model("Food", foodSchema);
