var express = require('express');
var router = express.Router();
var controller = require('../controllers/appController.js');
var middleware = require('../middlewares/appMiddleware.js');

router.get('/index', middleware.isNotAuth, controller.get_index);

router.get('/login', controller.get_login);
router.get('/signup', controller.get_signup);

router.post('/login', controller.post_login);
router.post('/signup', controller.post_signup);
router.post('/logout', controller.post_logout);

module.exports = router;