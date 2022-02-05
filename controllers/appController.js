var path = require('path');
var model = require('../models/appModel.js');

function get_index(request, response) {
    response.sendFile(path.resolve("views/index.html"));
}

function get_login(request, response) {
    response.sendFile(path.resolve("views/login.html"));
}
function get_signup(request, response) {
    response.sendFile(path.resolve("views/signup.html"));
}

function post_login(request, response) {
    var { username, password } = request.body;

    model.getUser(username, password, (result) => {

        if (result.rows.length > 0) {
            request.session.isAuth = true;
            request.session.userid = result.rows[0].id;
            request.session.username = username;
            console.log("[CTRL]", request.session, "User login successful.")

            response.send(true);
        } else {
            response.send(false);
        }
    });
}

function post_signup(request, response) {
    var { username, password, password2 } = request.body;
    if (password != password2) {
        response.send("2")
    }
    else {
        model.createUser(username, password, (result) => {
            console.log(result);
            if (result == false) {
                response.send("1");
            } else {
                response.send("0");
            }
        });
    }
}

function post_logout(request, response) {
    request.session.destroy((error) => {
        if (error) throw error;
        console.log("[CTRL]", 'User logout.');
        response.redirect('/login');
    });
}

function post_user_listings(request, response) {
    var currentUserId = request.params.id;
    //console.log("[CTRL]", currentUserId);
    model.getUserListings(currentUserId, (result) => {
        if (result.rows.length > 0) {
            //console.log("[CTRL]", result.rows);
            response.send(result.rows);
        } else {
            response.send(false);
        }
    });
}

module.exports = {
    post_login,
    get_login,
    get_index,
    get_signup,
    post_signup,
    post_logout,
    post_user_listings
}