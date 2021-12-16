var express = require('express');
var router = express.Router();
var getLogin = require('../db/services');
var signup = require('../db/services');


router.post('/login', getLogin);

router.post('/signup', signup);

module.exports = router;