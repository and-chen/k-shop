var express = require('express');
var {Pool} = require('pg');

var app = express();
var pool = new Pool({
    user:'postgres',
    host:'localhost',
    database: 'postgres',
    password: 'admin',
    port: 5432


})

app.use(express.json());
app.use(express.urlencoded({extended: true}));

var options = {
    dotfile: 'ignore',
    extensions: ['htm', 'html'],
    index: 'index.html'
}

app.use('/', express.static('./pub_html', options));

app.post('/login', function (req, resp) {


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


var PORT = 3000;
app.listen(PORT, () => console.log("Server started on port " + PORT));