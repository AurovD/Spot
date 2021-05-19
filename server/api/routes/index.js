const express = require("express");
const router = express.Router();
const usr = require("../controllers/users");
const evt = require("../controllers/events");
const parser = require("body-parser").json();
const cors = require("cors");

let whitelist = ['https://spot.aurovd.ru', 'http://spot.aurovd.ru/', 'http://localhost:3000/']

let corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

router.post("/signup", parser, usr.signup);
router.post("/login", parser, usr.login);
router.get("/test", cors(corsOptions),parser, usr.test);
router.post("/createEvent", parser, evt.createEvent);
router.get("/fetchMainEvents", parser, evt.fetchMainEvents);
module.exports = router;