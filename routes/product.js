const express = require("express");
//const Products = require("../models/Products");
const Product = require("../models/Products");
const Review = require("../models/Review");
const router = express.Router();
const {validateProduct, isLoggedIn,isSeller,isProductAuthor} = require("../middleware");
const { showAllproducts, productForm, createProduct, showProduct, editProductForm, updateProduct, deleteProduct } = require("../controllers/product");

router.get("/products", showAllproducts );

router.get("/products/new", isLoggedIn, isSeller,productForm );

//to actually add the product

// Yha pe validateProduct as a middleware js rha hai to add hone se pehle check karega ki thik hai ya nhi.
//jo wha next use kiya tha vo pehle middleware chlata hai aur phir next yha vapas bhej deta hai.
router.post("/products", validateProduct, isLoggedIn,createProduct );

//to show a particular product
router.get("/products/:id", isLoggedIn,showProduct);

//to edit the product

router.get("/products/:id/edit", isLoggedIn, isSeller,editProductForm );
router.patch("/products/:id", validateProduct, isLoggedIn,updateProduct );

//to delete the product

router.delete("/products/:id",isLoggedIn,isSeller,isProductAuthor, deleteProduct);

module.exports = router;
