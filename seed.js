const mongoose = require("mongoose");
const Product = require("./models/Products"); //.js likho ya nhi ek hi baat hai

const products = [
  {
    name: "Iphone 16",
    img: "https://images.unsplash.com/photo-1726587912121-ea21fcc57ff8?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 150000,
    desc: "Very costly , waste of money only showoff",
  },
  {
    name: "MacBook M2 Air",
    img: "https://images.unsplash.com/photo-1522169799806-79cb544552bf?q=80&w=2095&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 200000,
    desc: "Bilkul aukat ke bahar",
  },
  {
    name: "Samsung S24 Ultra",
    img: "https://images.unsplash.com/photo-1706469980834-36cc556c02c2?q=80&w=3284&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 100000,
    desc: "In budget and good phone",
  },
  {
    name: "Iwatch",
    img: "https://images.unsplash.com/photo-1558126319-c9feecbf57ee?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 51000,
    desc: "Aukat se bahar wali ghaadi",
  },
  {
    name: "Samsung Watch 6",
    img: "https://images.unsplash.com/photo-1680113727062-8a118574b782?q=80&w=3465&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 27000,
    desc: "Mehngi hai par le sakte hai",
  },
];

async function seedDb() {
  await Product.insertMany(products);
  console.log("Data seeded succesfully");
}

//function ko khi bhi use karne ke liye ise export kardo

module.exports = seedDb;
