const pool = require('./dbConnect');

class DBService {

    getLogin(req) {
        console.log("[DBService]", req);
        return new Promise(((resolve, reject) => {
            pool.connect((err, db) => {
                if (err) reject(err);

                var text = 'SELECT * FROM users WHERE username = $1 AND password = $2;'
                var values = [req.username, req.password]
                db.query(text, values, (err, result) => {
                    if (err) reject(err);

                    resolve(result);
                })
            });
        }));
    }
    
    signup(req){
        return new Promise(((resolve, reject) => {
            pool.connect((err, db) => {
                if (err) reject(err);

                var text = 'INSERT INTO users(username,password) VALUES($1,$2);'
                var values = [req.username, req.password]
                console.log("[PSQL]", req.body);
                db.query(text, values, (err, result) => {
                    if (err) reject(err);

                    resolve(result);
                })
            });
        }));



    }

}



module.exports = DBService;