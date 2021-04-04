const pool = require("../models/bd");
const signup = async (req, res) => {
    console.log("jhgkg", req.body)
    pool.query("CREATE  TABLE IF NOT EXISTS users( id SERIAL PRIMARY KEY,  login TEXT NOT NULL, name VARCHAR(15) NOT NULL, email TEXT NOT NULL, pwd TEXT NOT NULL, role TEXT DEFAULT 'user');", (err, res) => {
        if(err) {
            console.log(err);
        } else {
            console.log(res);
        }
    });
    pool.query('INSERT INTO users (login, name, email, pwd) VALUES ($1, $2, $3, $4)', [req.body.login, req.body.name, req.body.email, req.body.pass], (err, result) => {
        if (err) {
            throw err;
        } else if (result) {
            res.send({
                "msg": "ok"
            });
        }
    });
};
const login = async (req, res) => {
    pool.query('SELECT * FROM users WHERE login = $1 AND pwd = $2', [req.body.login, req.body.pass], (err, result) => {
        if (err) {
            throw err;
        } else if (result) {
            console.log(result.rows);
            res.send({
                data: result.rows[0].login
            });
        }
    });
};

module.exports = {signup, login};