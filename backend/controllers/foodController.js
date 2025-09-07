const Food = require("../models/foodModel");

const index = async (req, res) => {
  try {
    const foods = await Food.find({});
    res.status(200).json(foods);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addFood = async (req, res) => {
  const { nama, jumlah, harga } = req.body;
  const totalHarga = jumlah * harga;

  try {
    const Foods = await Food.create({
      nama,
      jumlah,
      harga,
      totalHarga: totalHarga,
    });
    res.status(200).json({ mssg: "Data Added Successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editJumlah = async (req, res) => {
  const foodId = req.params.id;

  try {
    const food = await Food.findOne({ _id: foodId });

    const { jumlah } = req.body;

    const updated = await Food.updateOne(
      { _id: foodId },
      { $set: { jumlah: jumlah, totalHarga: food.totalHarga * jumlah } }
    );

    res.status(200).json({ mssg: "Jumlah Berhasil Diperbarui" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editHarga = async (req, res) => {
  const foodId = req.params.id;

  try {
    const food = await Food.findOne({ _id: foodId });

    const { harga } = req.body;

    const updated = await Food.updateOne(
      { _id: foodId },
      { $set: { harga: harga, totalHarga: harga * food.jumlah } }
    );

    res.status(200).json({ mssg: "Harga Berhasil Diubah" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteFood = async (req, res) => {
  const foodId = req.params.id;

  try {
    const food = await Food.deleteOne({ _id: foodId });

    res.status(200).json({ mssg: "Data Berhasil Dihapus" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  index,
  addFood,
  editJumlah,
  deleteFood,
  editHarga,
};
