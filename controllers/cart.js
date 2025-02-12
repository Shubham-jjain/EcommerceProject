const Product = require("../models/Products");
const User = require("../models/User");


const viewCart =  async (req, res) => {
    let user = await User.findById(req.user._id).populate("cart");
    console.log(user, "user");
    
    res.render("cart/cart", { user });
  };
const addToCart =  async (req, res) => {
  let { productId } = req.params;
  let userId = req.user._id;
  let product = await Product.findById(productId);
  let user = await User.findById(userId);

  user.cart.push(product);
  await user.save();
  res.redirect("/user/cart");
};

module.exports = {viewCart,addToCart}