
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const seedDb = require("./seed");
// const ejsMate = require('ejs-mate');
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/User");

const productRoutes = require("./routes/product");
const reviewRoutes = require("./routes/review");
const authRoutes = require("./routes/auth");
const cartRoutes = require("./routes/cart");

const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
mongoose
  .connect("mongodb://127.0.0.1:27017/Shopping-shubham-app")
  .then(() => {
    console.log("Db Connected");
  })
  .catch(() => {
    console.log("Error :-", err);
  });

let configSession = {
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};

app.engine("ejs", ejsMate);
// yaha pe set kardiya ki ejs ki file ejs mate dekhega
app.set("view engine", "ejs");
//view folder
app.set("views", path.join(__dirname, "views"));
//public folder

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); //taki req.body se input padh ske
app.use(methodOverride("_method"));
app.use(session(configSession));
app.use(flash());

// Middleware to initialize req.user as null
// app.use((req, res, next) => {
//   if (!req.user) {
//     req.user = null; // Initialize as null
//   }
//   next();
// });

// Middleware to ensure req.session is initialized
app.use(passport.initialize());
app.use(passport.session());
// app.use((req, res, next) => {
//   if (!req.user) {
//     req.user = null; // Initialize as null
//   }
//   next();
// });

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");

  next();
});

//Passport Wali
// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

//seeding database
//baar baar file chalti hai  kyuki nodemon kar kar rha hai to products baar baar seed honge to prevent this we will use
//ek baar run karo phir comment kardo
//seedDb();
app.get('/',(req,res)=>{
  res.render("home")
});
app.use(productRoutes); //products ka route har incoming request pe chalna chahiye
app.use(reviewRoutes); //review ka route har incoming request pe chalna chahiye
app.use(authRoutes); //auth ka route har incoming request pe chalna chahiye
app.use(cartRoutes); //cart ka route har incoming request pe chalna chahiye




app.listen(process.env.PORT||8080, () => {
  console.log(`Port connected at`);
});
