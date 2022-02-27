const express = require('express');
const categoryController = require('../controller/category.controller');
const auth = require('../middleware/authenticate');
const multer = require('multer');
const router = express.Router();

const upload = multer({dest: 'public/category_images'});

router.post("/addCategory", auth.isAuthenticate, upload.single('categoryImage'),categoryController.addCategory);

module.exports = router;