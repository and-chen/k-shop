var express = require('express');
var session = require('express-session');
var routes = require("./routes/appRoute.js");

var app = express();

var sess;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        name: 'sessionname',
        secret: 'zordon',
        resave: false,
        maxAge: 30 * 60 * 1000 // 30 minutes
    })
)

var options = {
    dotfile: 'ignore',
    extensions: ['htm', 'html'],
    index: 'index.html'
}

app.use('/', express.static('./pub_html', options));

app.use('/index', isLoggedIn, function (req, res) {
    res.sendFile("./pub_html/index.html", { root: __dirname });
});

app.use('/asdf', isLoggedIn, function (req, res) {
    res.sendFile("./pub_html/index.html", { root: __dirname });
});

app.use('/api', routes);

var PORT = 3000;
app.listen(PORT, () => console.log("Server started on port " + PORT));

function isLoggedIn(req, res, next) {
    console.log("[SERVER]", sess);
    if (sess.user) {
        return next();
    }
    else {
        throw new Error('Error!!!!');
    }
}