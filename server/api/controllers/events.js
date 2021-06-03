const pool = require("../models/bd");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images');
    },
    filename: function (req, file, cb) {
        let arr = file.originalname.split(".");
        let newName = Date.now() + "." + arr[1];
        return cb(null, newName.toLowerCase());
    }
});

const imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const createEvent = async (req, res) => {
    let upload = multer({ storage: storage, fileFilter: imageFilter }).array('file', 3);
    upload(req, res, function (err) {
        if (req.fileValidationError) {
            return res.send({ "msg": req.fileValidationError });
        } else if (!req.files) {
            return res.send({ "msg": 'Please select an image to upload' });
        } else {
            pool.query("CREATE TABLE IF NOT EXISTS events(id SERIAL PRIMARY KEY, title VARCHAR(200), description TEXT, price INT, bannerURL VARCHAR(200), countGuests SMALLINT, dateStart DATE, timeStart TIME WITH TIME ZONE, type VARCHAR(50), status BOOLEAN DEFAULT false, periodic VARCHAR(100), idCreator INT REFERENCES users (id), admins INT[], members INT [], category VARCHAR(100), tags VARCHAR(50)[]);");
            pool.query('INSERT INTO events (title, description, price, countGuests, dateStart, timeStart, type, periodic, category, link) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id', [req.body.title, req.body.description, req.body.price, req.body.maxParticipants, req.body.startDate, req.body.startTime, req.body.type, req.body.periodic, req.body.category, uuidv4()], (err, result) => {
                if (err) {
                    console.log(err)
                } else if (result) {
                    let tagsList = req.body.tags.split("#");
                    tagsList.shift();
                    pool.query("UPDATE events SET idCreator = $1 WHERE id = $2;", [req.body.user, result.rows[0].id]);
                    if(req.files.length !== 0){
                        pool.query("UPDATE events SET bannerURL = $1 WHERE id = $2;", [req.files[0].filename, result.rows[0].id]);
                    }
                    pool.query("CREATE TABLE IF NOT EXISTS category(id SERIAL PRIMARY KEY, name_category VARCHAR(100), id_events INT[]);");
                    // pool.query("INSERT INTO category(name_category) VALUES ('Other');");
                    pool.query(`UPDATE category SET id_events = array_append(id_events, $1) WHERE name_category = $2;`, [result.rows[0].id, req.body.category],(errors, res) => {
                        if(errors) {
                            console.log("category", errors);
                        }
                    });
                    pool.query("CREATE TABLE IF NOT EXISTS tags( id SERIAL PRIMARY KEY,  name VARCHAR(40) UNIQUE);");
                    pool.query("CREATE TABLE IF NOT EXISTS tags_events( id SERIAL PRIMARY KEY,  id_tag INT REFERENCES tags (id), id_event INT REFERENCES events (id));");
                    tagsList.forEach( tag => {
                        pool.query("INSERT INTO tags (name) VALUES ($1);", [tag], (exs, data) => {
                            if (data) {
                                console.log("data", data);
                                pool.query("INSERT INTO tags_events(id_tag, id_event) VALUES ((SELECT id FROM tags WHERE name = $1), $2);", [tag, result.rows[0].id]);
                            } else if(exs.code && exs.code === "23505"){
                                console.log("exs", exs.code)
                                pool.query("INSERT INTO tags_events(id_tag, id_event) VALUES ((SELECT id FROM tags WHERE name = $1), $2);", [tag, result.rows[0].id]);
                            }
                        });
                    });
                    res.send({
                        "msg": "ok"
                    });
                }
            });
        }
    });
};

const fetchMainEvents = async (req, res) => {
    pool.query("SELECT users.name, events.* FROM events JOIN users ON events.idCreator = users.id WHERE  events.type = 'public' and events.status = false ORDER by id;", (req, results) => {
        if(results){
            res.send({
                events: results.rows
            })
        }
    });
};
const fetchHistoryEvents = async (req, res) => {
    pool.query("SELECT users.name, events.* FROM events JOIN users ON events.idCreator = users.id WHERE events.id IN (SELECT idevent FROM userHistory WHERE iduser = $1);", [req.body.user], (req, results) => {
        if(results){
            res.send({
                events: results.rows
            })
        }
    });
};
const eventReg = async (req, res) => {
    pool.query("CREATE TABLE IF NOT EXISTS userHistory(id SERIAL PRIMARY KEY, idUser INT REFERENCES users (id), idEvent INT REFERENCES events (id));");
    pool.query("INSERT INTO userHistory (idUser, idEvent) VALUES ($1, $2);", [req.body.id, req.body.idEvent]);
    pool.query("UPDATE events SET members = array_append(members , $1) WHERE id = $2;", [req.body.id, req.body.idEvent]);
    res.send({msg: "done"});
};
const event = async (req, res) => {
    pool.query("SELECT * FROM events WHERE id = $1;", [req.body.id], (req, results) => {
        if(results){
            return res.send(results.rows[0]);
        }
    });
};

module.exports = {createEvent, fetchMainEvents, eventReg, fetchHistoryEvents, event };