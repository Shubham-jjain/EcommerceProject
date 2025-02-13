const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware");
const Product = require("../models/Products");
const User = require("../models/User");
const { viewCart, addToCart, removeFromCart } = require("../controllers/cart");

//router to see the cart

router.get("/user/cart", isLoggedIn,viewCart);

// actually adding product to cart
router.post("/user/:productId/add", isLoggedIn,addToCart);

router.get('/cart/:idd/remove',removeFromCart);

module.exports = router;
