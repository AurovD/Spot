const express = require("express");
const router = express.Router();
const usr = require("../controllers/users");
const evt = require("../controllers/events");
const parser = require("body-parser").json();
const cors = require("cors");

let corsOptions = {
    origin: 'https://spot.aurovd.ru/',
    optionsSuccessStatus: 200
}

router.post("/signup", parser, usr.signup);
router.post("/login", parser, usr.login);
router.get("/test", cors(corsOptions),parser, usr.test);
router.post("/createEvent", parser, evt.createEvent);
router.get("/fetchMainEvents", parser, evt.fetchMainEvents);
module.exports = router;