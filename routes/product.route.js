const express = require('express');
const router = express.Router();
const productController = require ('../controller/product.controller');
const authenticate = require('../middleware/authenticate');




router.get('/add_product',authenticate.isAuthenticate,productController.add_productPage);
// router.post('/add_product',authenticate.isAuthenticate,productController.saveProduct);
module.exports = router;