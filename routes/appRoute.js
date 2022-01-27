var express = require('express');
var router = express.Router();
var controller = require('../controllers/appController.js');

router.get('/index', controller.get_index);
router.get('/login', controller.get_login);

router.post('/login', controller.post_login);

module.exports = router;