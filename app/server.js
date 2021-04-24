//set up basic express server
const express = require('express')
const app = express()
const port = 3000

// import routes
const routes = require("./routes.js");
// Static Files Folder
app.use(express.static("public"));
// Template Engine
app.set("view engine", "pug");

// listening on port 3000
app.use("/", routes)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})