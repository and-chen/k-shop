var express = require('express')
var router = express.Router()
var pool = require("../server");

router.post('/login', function (req, resp) {
    var text = 'SELECT * FROM users WHERE username = $1 AND password = $2;'
    var values = [req.body.username, req.body.password]

    pool.query(text, values, (err, res) => {
        console.log(res)
        console.log(err, res.rows.length)
        if (res.rows.length != 0) {
            resp.send("success")
        } else {
            resp.send("failure")
        }
    })
});

module.exports = router;