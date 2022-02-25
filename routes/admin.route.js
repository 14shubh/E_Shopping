// const express = require('express');
// const adminController = require('../controller/admin.controller');
// const router = express.Router();

const express = require('express');
const authenticate = require('../middleware/authenticate');
const adminController = require('../controller/admin.controller');
const router = express.Router();

router.get("/", adminController.adminLoginPage);

router.post("/login", adminController.adminLoginPost);

router.get("/dashboard", authenticate.isAuthenticate, adminController.adminDashBoard);

router.get("/signout",authenticate.isAuthenticate,adminController.adminSignout)
module.exports = router;