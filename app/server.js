//set up basic express server
const express = require('express');
const app = express();
const DB = require("../database/connection");
const bodyParser = require("body-parser");
const port = 3000;

// Routes
const routes = require("./routes.js");

// Using Body parser for post request data
app.use(bodyParser.urlencoded({extended: true}));

// Static Files Folder
app.use(express.static("public"));
// Template Engine
app.set("view engine", "pug");

// listening on port 3000
app.use("/", routes)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})