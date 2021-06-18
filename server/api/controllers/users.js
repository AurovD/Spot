const pool = require("../models/bd");
const { v4: uuidv4 } = require('uuid');


const signup = async (req, res) => {
    pool.query("CREATE  TABLE IF NOT EXISTS users( id SERIAL PRIMARY KEY, name VARCHAR(200) NOT NULL, email VARCHAR(150) UNIQUE, pwd VARCHAR(200) NOT NULL, role TEXT DEFAULT 'user', description TEXT);", (err, res) => {
        if(res) {
            pool.query("CREATE  TABLE IF NOT EXISTS rating(iduser INT, idhost INT, number INT);");
        }
    });
    pool.query('INSERT INTO users (name, email, pwd) VALUES ($1, $2, $3);', [req.body.name, req.body.email, req.body.pass], (err, result) => {
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
        if (result.rows.length === 0) {
            res.send({msg: "Пользователь не найден"});
            // console.log("no user")
        } else if (result.rows.length > 0) {
            console.log(result.rows)
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
const getuser = async (req, res) => {
    pool.query('SELECT name, description FROM users WHERE id = $1', [req.body.id], (err, result) => {
        if (err) {
            throw err;
        } else if (result.rows) {
            pool.query('SELECT SUM(number), COUNT(number) FROM rating WHERE iduser = $1;', [req.body.id], (err, respond) => {
                if (err) {
                    throw err;
                } else if (respond.rows) {
                    res.json({
                        user: result.rows[0],
                        count: respond.rows[0].count,
                        rating: respond.rows[0].sum / +respond.rows[0].count
                    });
                }
            });
        }
    });
};
const userrating = async (req, res) => {
    pool.query('DELETE FROM rating  WHERE iduser = $1 and idhost = $2;', [req.body.id, req.body.idhost], (err, respond) => {
        if(respond){
            pool.query('INSERT INTO rating (iduser, idhost, number) VALUES ($1, $2, $3);', [req.body.id, req.body.idhost, req.body.number]);
        }
    });
};
const subscribe = async (req, res) => {
    pool.query('CREATE  TABLE IF NOT EXISTS followers(idfollow INT, idfollower INT);');
    pool.query('SELECT * FROM followers WHERE idfollow = $1 and idfollower = $2;', [req.body.follow, req.body.follower], (err, respond) => {
        if(respond.rows.length > 0){
            if(req.body.click){
                pool.query('DELETE FROM followers WHERE idfollow = $1 and idfollower = $2;', [req.body.follow, req.body.follower], (err, answer) => {
                    if(answer){
                        res.send({respond: false});
                    }
                });
            } else {
                res.send({respond: true});
            }
        } else if (respond.rows.length === 0) {
            if(req.body.click){
                pool.query('INSERT INTO followers (idfollow, idfollower) VALUES ($1, $2);', [req.body.follow, req.body.follower], (err, answer) => {
                    if(answer){
                        res.send({respond: true});
                    }
                });
            } else {
                res.send({respond: false});
            }
        }
    });
};

const test = async (req, res) => {
    res.send({answer: `Hello`})
};

module.exports = {signup, login, test, getuser, userrating, subscribe};