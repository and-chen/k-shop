var express = require('express');
var router = express.Router();
var getLogin = require('../db/services');

router.post('/login', getLogin);

module.exports = router;