const express = require("express");
const router = express.Router();
const Product = require("../models/Products");
const Review = require("../models/Review");
const { validateReview } = require("../middleware");
const { addReview } = require("../controllers/review");

router.post("/products/:id/review", validateReview,addReview);

module.exports = router;
