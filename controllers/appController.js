var path = require('path');
var model = require('../models/appModel.js');

function get_index(request, response) {
    response.sendFile(path.resolve("views/index.html"));
}

function get_login(request, response) {
    response.sendFile(path.resolve("views/login.html"));
}

function post_login(request, response) {
    var { username, password } = request.body;

    console.log("[CTRL]", username, password);

    model.getUser(username, password, (result) => {
        console.log("[CTRL]", "Result: ", result.rows);

        if (result.rows.length > 0) {
            response.send(true);
        } else {
            response.send(false);
        }
    });
}

module.exports = {
    post_login,
    get_login,
    get_index
}