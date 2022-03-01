var express = require('express');
var router = express.Router();
var passportGoogle = require('../middleware/socialAuthenticate');



router.get('/google',
passportGoogle.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

router.get('/google/callback',
passportGoogle.authenticate('google', { failureRedirect: '/signin' }),
function(req, res) {
  res.redirect('/');
});

module.exports = router;