var express = require('express');
var session = require('express-session');
var apiRouter = require("./api/login");

var services = require('./db/services');
const DBService = require('./db/DBService');

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

// app.use('/login', function (req, res) {
//     res.sendFile("./pub_html/login.html", { root: __dirname });
// });

app.post('/auth', function (req, res) {
    console.log("[SERVER]", req.body);

    const dbService = new DBService();
    dbService.getLogin(req.body)
        .then((response) => {
            if (response.rowCount > 0) {
                sess = req.session;
                sess.user = req.body
                console.log("[SERVER]", sess);
                console.log("[SERVER]", "log in success");
            } else {
                console.log("[SERVER]", "log in failed");
            }
            
        })
        .catch((error) => { 
            response.status(400).send({ message: error.message }) 
        })



});

app.use('/asdf', isLoggedIn, function (req, res) {
    res.sendFile("./pub_html/index.html", { root: __dirname });
});

app.use('/api', apiRouter)

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