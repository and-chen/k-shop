var path = require('path');
var model = require('../models/appModel.js');

function get_login(request, response) {
    response.sendFile(path.resolve("views/login.html"));
}

function post_login(request, response) {
    var { username, password } = request.body;

    console.log("[CTRL]", username, password);

    model.getUser(username, password, (result) => {
        console.log("[CTRL]", "Result: ", result.rows);

        response.send(result.rows);
    });
}

module.exports = {
    post_login,
    get_login
}