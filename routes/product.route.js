const express = require('express');
const router = express.Router();
const productController = require ('../controller/product.controller');
const authenticate = require('../middleware/authenticate');
const multer = require('multer');
const upload = multer({dest:'public/products_images'})



router.get('/add_product',authenticate.isAuthenticate,productController.add_productPage);
router.post('/add_product',authenticate.isAuthenticate,upload.array('productImages'),productController.saveProduct);
// router.get('/view_product/:cid',productController.viewProducthomePage);
module.exports = router;