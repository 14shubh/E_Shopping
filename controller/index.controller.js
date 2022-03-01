const Category = require("../model/category.model");
const Product = require("../model/product.model");
const User = require('../model/user.model');
// const { categoryLits } = require("./category.controller");

exports.SignIn = (req,res,next)=>{
    console.log(req.body);
    let user = new User();
    user.email = req.body.email;
    user.password = req.body.password;

    user.CheckUser()
    .then((result)=>{
        if(result.length!=0){
            req.session.Current_User = result[0].id;
            return res.redirect('/');
        }
    }).catch((err)=>{
        console.log(err);
    })
}

// exports.indexPage = (req, res, next) => {
//   res.render("index.ejs", {
//     title: "Divine Electronic",
//   });
// };

exports.signinPage = (req, res, next) => {
  res.render("login.ejs", {
    title: "Sign In",
  });
};

exports.signupPage = (req, res, next) => {
  res.render("registration.ejs", {
    title: "Registration",
  });
};

exports.signoutPage = (req,res,next) =>{
    req.session.Current_User = null;
    req.session.destroy();
    res.redirect('/');
}

exports.indexPage = (req, res, next) => {
  const CurrentUser = req.session.Current_User;
  Promise.all([Category.fetchAllCategory(), Product.fetchALLProduct(CurrentUser)])
    .then((results) => {
      console.log(results[0]);
      console.log(results[1]);
      
      return res.render("index.ejs", {
        title: "Home Page",
        CategoryList: results[0],
        ProductList: results[1],
        isLoggedIn : req.session.Current_User
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
