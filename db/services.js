const DBService = require('./DBService');

function getLogin(request, response) {
    const dbService = new DBService();
    dbService.getLogin(request)
        .then((res) => { response.send(res); })
        .catch((error) => { response.status(400).send({ message: error.message }) })
}
function signup(request,response){
    const dbService = new DBService();
    dbService.signup(request)
    .then((res) => { response.send(res); })
    .catch((error) => { response.status(400).send({ message: error.message }) })

}

module.exports.signup = signup;
module.exports.getLogin = getLogin;
