const express = require("express"),
router = express.Router()


// routes we use Route Methods app.get, app.post http://expressjs.com/en/guide/routing.html
router.get("/", (req, res) => {
   return res.render("../assets/views/homepage.pug")
});

router.get("/pug", (req, res) => {
    return res.render("../assets/views/testing.pug", {
        username: "Neo",
        fname: "Kanu",
        lname: "Reeves",
        loggedIn: true,
        friends: ['Jane', 'Johnny', 'Billy', 'Cindy']

    }); 
});

  module.exports = router;