const express = require('express');
const Cart = require('../model/cart.model');
const cartController = require('../controller/cart.controller');
const UserAuthentication = require('../middleware/userAuthenticate');
const router = express.Router();

router.get("/add-cart/:pid",UserAuthentication.isUserAuthenticate,cartController.AddtoCart);
router.get("/remove-cart/:pid",UserAuthentication.isUserAuthenticate,cartController.RemoveFromCart);

router.get("/view-cart",UserAuthentication.isUserAuthenticate,cartController.viewCart);
router.get("/cart-item",UserAuthentication.isUserAuthenticate,cartController.cartItem);
module.exports = router;