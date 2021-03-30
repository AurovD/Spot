const express = require("express");
const router = express.Router();
const usr = require("../controllers/users");
const evt = require("../controllers/events");
const parser = require("body-parser").json();
router.post("/signup", parser, usr.signup);
router.post("/login", parser, usr.login);
router.post("/createEvent", parser, evt.createEvent);
module.exports = router;