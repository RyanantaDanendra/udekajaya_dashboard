require("dotenv").config();

const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "5d" });
};

// login
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // login method from user model
    const user = await User.login(email, password);

    // create auth token
    const token = createToken(user._id);

    // return json response
    res.status(200).json({ user, token });
  } catch (error) {
    // return json response
    res.status(400).json({ error: error.message });
  }
};

//signup
const userSignup = async (req, res) => {
  // take the user input
  const { email, password } = req.body;

  try {
    // signup user from model signup static function
    const user = await User.signup(email, password);

    // create auth token
    const token = createToken(user._id);

    // send json response
    res.status(200).json({ user, token });
  } catch (error) {
    // return error response
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  userLogin,
  userSignup,
};
