let passport = require('passport');
let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// const {Strategy} = require('passport-google-oauth20');


passport.use(new GoogleStrategy({
    clientID: "1061890224579-7v6ubi5o7flmss749ac4h9vr33rc25r0.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3001/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
       User.findOrCreate({ userid: profile.id }, { name: profile.displayName,userid: profile.id }, function (err, user) {
         return done(err, user);
       });
  }
));

module.exports = passport;