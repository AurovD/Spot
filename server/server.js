const express = require("express");
const dotenv = require('dotenv');
const path = require('path');
const port = 8001;
const app = express();
const cors = require("cors");
dotenv.config();
app.use(cors());

app.get("/");
app.use(express.urlencoded({extended: true}));
app.use(express.static("./public"));
app.use("/api", require("./api/routes/index"));

app.listen(port);

// proxy_set_header Access-Control-Allow-Origin *;
