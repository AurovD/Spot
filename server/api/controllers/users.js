const pool = require("../models/bd");
const { v4: uuidv4 } = require('uuid');


const signup = async (req, res) => {
    pool.query("CREATE  TABLE IF NOT EXISTS users( id SERIAL PRIMARY KEY, name VARCHAR(200) NOT NULL, email VARCHAR(150) UNIQUE, pwd VARCHAR(200) NOT NULL, role TEXT DEFAULT 'user', description TEXT);", (err, res) => {
        if(res) {
            pool.query("CREATE  TABLE IF NOT EXISTS rating(id SERIAL PRIMARY KEY, iduser INT, one INT, two INT, three INT, four INT, five INT);");
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
const test = async (req, res) => {
    // pool.query('SELECT * FROM test', (err, result) => {
    //     if (err) {
    //         throw err;
    //     } else if (result) {
    //         console.log(result.rows);
    //         res.send({
    //             data: result.rows[0]
    //         });
    //     }
    // });
    res.send({answer: `Hello`})
};

module.exports = {signup, login, test};