const pool = require("../models/bd");
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './');
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
            console.log("jhgkg", req.body, req.files);
            pool.query("CREATE TABLE IF NOT EXISTS events(id SERIAL PRIMARY KEY, title VARCHAR(200), description TEXT, price INT, bannerURL VARCHAR(200), dateStart DATE, timeStart TIME WITH TIME ZONE, type VARCHAR(50), status BOOLEAN, periodic VARCHAR(100), idCreator INT, admins INT[], members INT []);", (err, res) => {
                if(err) {
                    console.log(err);
                }
            });
            pool.query('INSERT INTO events (title, description, price, bannerURL, dateStart, timeStart) VALUES ($1, $2, $3)', [req.body.name, req.body.email, req.body.pass], (err, result) => {
                if (err) {
                    console.log(err)
                } else if (result) {
                    res.send({
                        "msg": "ok"
                    });
                }
            });
        }
    });
};

module.exports = {createEvent};