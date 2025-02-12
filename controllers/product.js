const Product =  require("../models/Products");

const showAllproducts = async (req, res) => {
    try {
      let products = await Product.find({});
  
      res.render("products/index", { products });
    } catch (e) {
      res.status(500).render("Error", { err: e.message });
    }
  };

const productForm = async (req, res) => {
    try {
      let products = await Product.find({});
  
      res.render("products/new");
    } catch (e) {
      res.status(500).render("Error", { err: e.message });
    }
  };

const createProduct = async (req, res) => {
 
    try {
      let { name, img, price, desc } = req.body;
      await Product.create({ name, img, price, desc, author: req.user._id });
      req.flash("success", "Product added successfully");
      res.redirect("/products");
    } catch (e) {
      res.status(500).render("Error", { err: e.message });
    }
  };

const showProduct =  async (req, res) => {
    try {
      let { id } = req.params;
      let foundproduct = await Product.findById(id).populate("reviews");
      res.render("products/show", { foundproduct });
    } catch (e) {
      res.status(500).render("Error", { err: e.message });
    }
  };

const editProductForm = async (req, res) => {
    try {
      let { id } = req.params;
      let foundproduct = await Product.findById(id);
      res.render("products/edit", { foundproduct });
    } catch (e) {
      res.status(500).render("Error", { err: e.message });
    }
  };

const updateProduct = async (req, res) => {
    try {
      let { id } = req.params;
      let { name, img, price, desc } = req.body;
      await Product.findByIdAndUpdate(id, { name, img, price, desc });
      req.flash("success", "Product edited successfully");
      res.redirect(`/products/${id}`);
    } catch (e) {
      res.status(500).render("Error", { err: e.message });
    }
  };

const deleteProduct = async (req, res) => {
    try {
      let { id } = req.params;
      const product = await Product.findById(id);
      // console.log(product,"product.review");

      // for(let ide of product.reviews){
      //   await Review.findByIdAndDelete(ide);
      // }
      await Product.findByIdAndDelete(id);
      req.flash("success", "Product deleted successfully");
      res.redirect(`/products`);
    } catch (e) {
      res.status(500).render("Error", { err: e.message });
    }
  };


module.exports = {showAllproducts,productForm,createProduct,showProduct,editProductForm,updateProduct,deleteProduct};

