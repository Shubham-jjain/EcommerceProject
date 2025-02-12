const Product = require("../models/Products");
const Review = require("../models/Review");

const addReview =  async (req, res) => {
  try {
    let { id } = req.params;
    let { rating, comment } = req.body;
    const product = await Product.findById(id);
    // await Review.create({rating,comment});
    const review = new Review({ rating, comment });
    product.reviews.push(review);
    await review.save(); //save the new item in db
    await product.save(); //save the new item in db
    //req.flash('success','Review added successfully');
    console.log("Review added");

    res.redirect(`/products/${id}`);

    // Jab dusri collection se data likhna hoto use process ko kehte hai populate
    // ine to many relation ship se information uthana
    // jb ek particular product ko show kar rhe toh uske review show karenge isse populate kehte hai(On basis of objectid only)
  } catch (e) {
    res.status(500).render("Error", { err: e.message });
  }
};

module.exports = {addReview};