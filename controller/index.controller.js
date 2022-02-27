const Category = require("../model/category.model");
const Product = require("../model/product.model");
const { categoryLits } = require("./category.controller");

exports.indexPage = (req, res, next) => {
  res.render("index.ejs", {
    title: "Divine Electronic",
  });
};

exports.signinPage = (req, res, next) => {
  res.render("login", {
    title: "Sign In",
  });
};

exports.signupPage = (req, res, next) => {
  res.render("registration.ejs", {
    title: "Registration",
  });
};

exports.indexPage = (req, res, next) => {
  Promise.all([Category.fetchAllCategory(), Product.fetchALLProduct()])
    .then((results) => {
      console.log(results[0]);
      console.log(results[1]);
      return res.render("index.ejs", {
        title: "Home Page",
        CategoryList: results[0],
        ProductList: results[1],
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
