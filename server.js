var express = require('express');

var app = express();

app.use(express.json());
app.use(express.urlencoded());

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
        console.log(err, res.rows.length)
        if (res.rows.length != 0) {
            resp.send("success")


        } else {
            resp.send("failure")


        }
    })

});
app.get()

var PORT = 3000;
app.listen(PORT, () => console.log("Server started on port " + PORT));