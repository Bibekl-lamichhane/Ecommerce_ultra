const express = require("express");
const router = express.Router();
const { logInUser, registerUser, getAllUser } = require("../controller/User");


// SIGN IN
router.post("/login", logInUser);

// signup
router.post("/register", registerUser);

// fetch users
router.get("/users", getAllUser);


module.exports = router;