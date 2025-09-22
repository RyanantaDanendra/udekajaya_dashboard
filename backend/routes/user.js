const express = require("express");

const { userSignup, userLogin } = require("../controllers/userController");

const router = express.Router();

router.post("/login", userLogin);
router.post("/register", userSignup);

module.exports = router;
