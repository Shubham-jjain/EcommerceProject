const mongoose = require("mongoose");
const Review = require("./Review");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  img: {
    type: String,
    require: true,
    //default:
  },
  price: {
    type: Number,
    min: 0,
    require: true,
  },
  desc: {
    type: String,
    trim: true,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

//middleware jo bts mongodb operation karvane vane par use hota and iske andar pre and post middleware
// hote hai which are basically used over schema and before the model is js class.

// agar post middleware use karte hai toh middleware ko yaad hai delete hote hi review delete karna hai

productSchema.post("findOneAndDelete", async function (product) {
  if (product.reviews.length > 0) {
    console.log("Middleware is running");

    await Review.deleteMany({ _id: { $in: product.reviews } });
  }
});

let Product = mongoose.model("Product", productSchema);

//vaha route mein  middleware chal rha hai
//toh vha se hum argument le sakte hai ki kis par chal rha hai.

module.exports = Product;
