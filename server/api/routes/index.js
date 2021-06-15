const express = require("express");
const router = express.Router();
const usr = require("../controllers/users");
const evt = require("../controllers/events");
const parser = require("body-parser").json();
const cors = require('cors');

let corsOptions = {
    origin: '*',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200
}

router.post("/signup", cors(corsOptions), parser, usr.signup);
router.post("/login", cors(corsOptions), parser, usr.login);
router.get("/test", cors(corsOptions), parser, usr.test);
router.post("/createEvent", cors(corsOptions), parser, evt.createEvent);
router.get("/fetchMainEvents", cors(corsOptions), parser, evt.fetchMainEvents);
router.post("/eventReg", cors(corsOptions), parser, evt.eventReg);
router.post("/fetchHistoryEvents", cors(corsOptions), parser, evt.fetchHistoryEvents);
router.post("/event", cors(corsOptions), parser, evt.event);
router.post("/userevents", cors(corsOptions), parser, evt.userEvents);
router.post("/getuser", cors(corsOptions), parser, usr.getuser);
router.post("/userrating", cors(corsOptions), parser, usr.userrating);
module.exports = router;
// router.post("/signup", parser, usr.signup);
// router.post("/login", parser, usr.login);
// router.get("/test", parser, usr.test);
// router.post("/createEvent", parser, evt.createEvent);
// router.get("/fetchMainEvents", parser, evt.fetchMainEvents);
// module.exports = router;