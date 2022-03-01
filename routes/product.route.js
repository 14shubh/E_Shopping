const express = require('express');
const router = express.Router();
const productController = require ('../controller/product.controller');
const authenticate = require('../middleware/authenticate');
const multer = require('multer');
const upload = multer({dest:'public/products_images'})



router.get('/add_product',authenticate.isAuthenticate,productController.add_productPage);
router.post('/add_product',authenticate.isAuthenticate,upload.array('productImages'),productController.saveProduct);
 //router.get('/view_product',productController.viewProducthomePage);
 router.get('/product_list',authenticate.isAuthenticate,productController.productList)
 router.post('/edit_product', authenticate.isAuthenticate,productController.updateProduct);
 router.get('/edit_product/:id', authenticate.isAuthenticate,productController.getProductById);
 router.get('/delete-product/:id',authenticate.isAuthenticate,productController.deleteProduct);

module.exports = router;