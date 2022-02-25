const router = require('express').Router();
const indexController = require('../controller/index.controller');



router.get('/', indexController.indexPage);

router.get('/signin', indexController.signinPage);

router.get('/signup', indexController.signupPage);
module.exports = router;