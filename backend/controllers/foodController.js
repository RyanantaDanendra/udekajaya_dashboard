const index = async (req, res) => {
  res.status(200).json({ mssg: "Route success" });
};

module.exports = {
  index,
};
