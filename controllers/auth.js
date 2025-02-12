const User = require("../models/User");
const passport = require("passport");

const registerForm =  (req, res) => {
    res.render("../views/auth/signup.ejs");
  };
const register =  async (req, res) => {
  try {
    let { username, email, password, role } = req.body;
    const user = new User({ email, username, role });
    const newUser = await User.register(user, password);
    //res.redirect("/views/auth/login.ejs");
    req.login(newUser, function (err) {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome,you are successfully registered");
      return res.redirect("/products");
    });
  } catch (e) {
    req.flash("error", e.message);
    return res.redirect("/register");
  }
};
const loginForm =  (req, res) => {
    res.render("../views/auth/login.ejs");
  };
const login =  (req, res) => {
    req.flash("success", "Welcome Back");

    res.redirect("/products");
  };
const logout =  (req, res) => {
    () => {
      req.logout();
    };
    req.flash("success", "Come back soon");
  
    res.redirect("/");
  };

module.exports = {registerForm,register,loginForm,login,logout};
