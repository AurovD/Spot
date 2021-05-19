const express = require("express");
const dotenv = require('dotenv');
const path = require('path');
const port = process.env.PORT || 8001;
const app = express();
const cors = require("cors");
dotenv.config();
app.use(cors());

app.use(function(req, res, next){
    res.header('Access-Control-Allow-Methods',
        'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers',
        'Access-Control-Allow-Origin,*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin',
        '*');
    if (req.method === 'OPTIONS') {
        res.status(200);
    } next(); })

app.get("/", (req, res) => {
    res.send("test")
});
app.use(express.urlencoded({extended: true}));
app.use(express.static("./public"));
app.use("/api", require("./api/routes/index"));

app.listen(port);
