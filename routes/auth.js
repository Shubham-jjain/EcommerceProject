const express = require("express");
const User = require("../models/User");
const passport = require("passport");
const { registerForm, register, loginForm, login, logout } = require("../controllers/auth");
const router = express.Router(); // Mini instance

// to show the form of signup
router.get("/register",registerForm);

//Actually want to register a user in my DB

router.post("/register",register);

// to get login form

router.get("/login",loginForm);

// to actually login via db

router.post("/login",passport.authenticate("local", {failureRedirect: "/register",failureMessage: true,}),login);

//Logout

//Always works with a callback function.

router.get("/logout",logout);

module.exports = router;
