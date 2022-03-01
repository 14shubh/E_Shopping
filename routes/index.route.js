const router = require('express').Router();
const indexController = require('../controller/index.controller');



router.get('/', indexController.indexPage);

router.get('/signin', indexController.signinPage);

router.post('/signin',indexController.SignIn);

router.get('/signup', indexController.signupPage);

router.get('/signout', indexController.signoutPage);
module.exports = router;    