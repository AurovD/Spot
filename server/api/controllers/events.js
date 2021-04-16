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
    console.log("kjh")
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const createEvent = async (req, res) => {
    console.log(req.files)
    let upload = multer({ storage: storage, fileFilter: imageFilter }).array('file', 3);
    upload(req, res, function (err) {
        if (req.fileValidationError) {
            return res.send({ "msg": req.fileValidationError });
        } else if (!req.files) {
            return res.send({ "msg": 'Please select an image to upload' });
        } else {
            console.log("jhgkg", req.body);
        }
    });
};

module.exports = {createEvent};