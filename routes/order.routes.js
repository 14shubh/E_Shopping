const express = require('express');
const router = express.Router();
const OrderController = require('../controller/order.controller');
router.get("/place-order/:data/:address/:contact",OrderController.order);

module.exports = router;