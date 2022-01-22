var express = require('express');
var router = express.Router();
var controller = require('../controllers/appController.js');

router.post('/login', controller.post_login);

module.exports = router;