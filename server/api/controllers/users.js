const pool = require("../models/bd");
const signup = async (req, res) => {
    console.log("jhgkg", req.body)
    pool.query("CREATE  TABLE IF NOT EXISTS users( id SERIAL PRIMARY KEY, name VARCHAR(200) NOT NULL, email VARCHAR(150) UNIQUE, pwd VARCHAR(200) NOT NULL, role TEXT DEFAULT 'user');", (err, res) => {
        if(err) {
            console.log(err);
        } else {
            console.log(res);
        }
    });
    pool.query('INSERT INTO users (name, email, pwd) VALUES ($1, $2, $3)', [req.body.name, req.body.email, req.body.pass], (err, result) => {
        if (err) {
            console.log(err)
        } else if (result) {
            res.send({
                "msg": "ok"
            });
        }
    });
};
const login = async (req, res) => {
    pool.query('SELECT * FROM users WHERE email = $1 AND pwd = $2', [req.body.email, req.body.pass], (err, result) => {
        if (err) {
            throw err;
        } else if (result) {
            console.log(result.rows);
            res.send({
                // data: result.rows[0].name
                data: {
                    id: result.rows[0].id,
                    name: result.rows[0].name,
                }
            });
        }
    });
};

module.exports = {signup, login};