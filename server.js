const express = require("express");
const path = require("path");
const body_parser = require("body-parser");
const adminRouter = require("./routes/admin.route");
const session = require("express-session");
const userRouter = require("./routes/user.route");
const categoryRouter = require("./routes/category.routes");
const indexRouter = require("./routes/index.route");
const productRouter = require("./routes/product.route");
const cartRouter = require('./routes/cart.routes');
const orderRouter = require('./routes/order.routes');
const authRouter = require('./routes/auth.router');
const passport = require('passport');
// const {Strategy} = require('passport-google-oauth20');
// const { Strategy } = require("passport-facebook");

let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// const {Strategy} = require('passport-google-oauth20');

const port = 3001;
const app = express();

app.set("view engine", "ejs");

app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "ramshreeram",
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user,callback)=>{
  callback(null,user);
});
passport.deserializeUser((obj,callback)=>{
  callback(null,obj);
});

// passport.use(new Strategy({
//   ClientID : '1061890224579-7v6ubi5o7flmss749ac4h9vr33rc25r0.apps.googleusercontent.com',
//   ClientSecret : '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',
//   callbackURL : 'http://localhost:3001/google/callback'
// },
//   (_accessToken, _refreshToken, _profile, done) => {
//     done(null, {});
//   }
// ));


// passport.use(new GoogleStrategy({
//   clientID: "1061890224579-7v6ubi5o7flmss749ac4h9vr33rc25r0.apps.googleusercontent.com",
//   clientSecret: "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",
//   callbackURL: "http://localhost:3001/google/callback"
// },
// function(accessToken, refreshToken, profile, done) {
//      User.findOrCreate({ userid: profile.id }, { name: profile.displayName,userid: profile.id }, function (err, user) {
//        return done(err, user);
//      });
// }
// ));

// app.get('/auth/google',passport.authenticate('google',{scope:['https://www.googleapis.com/auth/plus.login']}));
// // passportGoogle.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// app.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/auth/fail'}),
//   (req,res,next)=>{
//     console.log(req.user,req.isAuthenticated());
//     res.redirect('/');
// });


// app.get('/auth/fail',(req,res,next)=>{
//   res.send('loggin failed');
// })





app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/category",categoryRouter);
app.use("/order",orderRouter);
app.use("/product", productRouter);
app.use("/cart",cartRouter);
app.use("/auth",authRouter);
app.use(indexRouter);

app.listen(port, (err) => {
  err ? console.error(err) : console.log("listening on port localhost:" + port);
});
