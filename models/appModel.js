var pool = require('../database/db.js');

// get user by username and password
function getUser(username, password, callback) {
    var query = "SELECT * FROM users WHERE username = $1 AND password = $2;";
    var values = [username, password];
    pool.query(query, values, (error, result) => {
        if (error) {
            callback(error.message);
        } else {
            callback(result);
        }
    } );
}
function createUser(username, password, callback) {
    var query = "INSERT INTO users(username,password) VALUES($1,$2) RETURNING *;";
    var values = [username, password];
    pool.query(query, values, (error, result) => {
        if (error) {
            callback(false);
        } else {
            callback(true);
        }
    } );
}

// Export functions
module.exports = {
    getUser,
    createUser
};