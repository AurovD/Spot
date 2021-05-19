const express = require("express");
const router = express.Router();
const usr = require("../controllers/users");
const evt = require("../controllers/events");
const parser = require("body-parser").json();
const cors = require('cors');

let corsOptions = {
    origin: '*',
}

router.post("/signup", parser, usr.signup);
router.post("/login", parser, usr.login);
router.get("/test", parser, usr.test);
router.post("/createEvent", cors(corsOptions), parser, evt.createEvent);
router.get("/fetchMainEvents", parser, evt.fetchMainEvents);
module.exports = router;