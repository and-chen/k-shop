var model = require('../models/appModel.js');

function post_login(request, response) {
    var { username, password } = request.body;

    model.getUser(username, password, (result) => {
        console.log("[CTRL]", "Result: ", result);

        response.send(result);
    });
}

module.exports.post_login = post_login;