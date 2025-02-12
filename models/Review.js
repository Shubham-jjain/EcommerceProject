const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

//timestamps use to save the time and date of review or anything

let Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
