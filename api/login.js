var express = require('express');
var router = express.Router();
var services = require('../db/services');


router.post('/login', services.getLogin);
router.post('/signup', services.signup);

module.exports = router;