const express = require("express");
const path = require('path');
const port = process.env.PORT || 8001;
const app = express();
const cors = require("cors");

// app.use(function(req, res, next){
//     res.header('Access-Control-Allow-Methods',
//         'GET,PUT,POST,DELETE,OPTIONS');
//     res.header('Access-Control-Allow-Headers',
//         'Access-Control-Allow-Origin,*');
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header('Access-Control-Allow-Origin',
//         '*');
//     if (req.method === 'OPTIONS') {
//         res.status(200);
//     } next(); });
const corsOptions = {
    credentials: true,
    origin: 'http://aurovd.ru',
    allowedHeaders: ['Content-Type'],
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: true}));
app.use("/api", require("./api/routes/index"));

app.listen(port);
