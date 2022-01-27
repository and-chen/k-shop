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

// Export functions
module.exports = {
    getUser
};