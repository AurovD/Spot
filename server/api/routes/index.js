const express = require("express");
const router = express.Router();
const usr = require("../controllers/users");
const evt = require("../controllers/events");
const parser = require("body-parser").json();
const cors = require('cors');

let corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

router.post("/signup", cors(corsOptions), parser, usr.signup);
router.post("/login", cors(corsOptions), parser, usr.login);
router.get("/test", cors(corsOptions), parser, usr.test);
router.post("/createEvent", cors(corsOptions), parser, evt.createEvent);
router.get("/fetchMainEvents", cors(corsOptions), parser, evt.fetchMainEvents);
module.exports = router;