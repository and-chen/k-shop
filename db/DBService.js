const pool = require('./dbConnect');

class DBService {

    getLogin(req) {
        return new Promise(((resolve, reject) => {
            pool.connect((err, db) => {
                if (err) reject(err);

                var text = 'SELECT * FROM users WHERE username = $1 AND password = $2;'
                var values = [req.body.username, req.body.password]
                db.query(text, values, (err, result) => {
                    if (err) reject(err);

                    resolve(result);
                })
            });
        }));
    }
}

module.exports = DBService;