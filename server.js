var express = require('express');
var {Pool} = require('pg');
var baserouter  = require("./routes/api/login")
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
app.use('/', baserouter)

var PORT = 3000;
app.listen(PORT, () => console.log("Server started on port " + PORT));
module.export = pool;