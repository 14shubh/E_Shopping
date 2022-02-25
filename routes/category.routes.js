const express = require('express');
const categoryController = require('../controller/category.controller');
const auth = require('../middleware/authenticate');
const router = express.Router();

router.post("/addCategory", auth.isAuthenticate, categoryController.addCategory);

module.exports = router;