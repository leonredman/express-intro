const express = require("express"),
router = express.Router()
const DB = require("../database/connection")

// routes we use Route Methods app.get, app.post http://expressjs.com/en/guide/routing.html

router.get("/", (req, res) => {
   return res.render("../assets/views/homepage.pug")
});


 router.get("/post/create", (req, res) => {
    return res.render("../assets/views/post/create.pug")
 });

 // route to post(create) to the database
 router.post("/post/create", (req, res) => {
     const post = req.body;
    DB.query(`INSERT INTO posts (title, description, image_url) VALUES ('${post.title}', '${post.description}', '${post.image_url}')`, (error, result) => {
        if(error){
            console.log('error:')
            console.log(error)
            return res.redirect("/post/create");
        } else {
            return res.redirect("/")
        }
    }
   );
 });

      // route params must be below the create so that it can be picked up
      // passing object to the view

 router.get("/post/:id", (req, res) => {
    DB.query(
        `SELECT * FROM posts WHERE id = ${req.params.id} LIMIT 1`, (error, result) => {
        if(error){
            console.log('error:')
            console.log(error)
            return res.redirect("/");
        } else {
            console.log("results:");
            console.log(result[0]);
            return res.render("../assets/views/post/show.pug", result[0])
        }
    }
   );
    
 });

 // route to select data to edit - post route

 router.get("/post/:id/edit", (req, res) => {
    DB.query(
        `SELECT * FROM posts WHERE id = ${req.params.id} LIMIT 1`, (error, result) => {
        if(error){
            console.log('error:')
            console.log(error)
            return res.redirect("/");
        } else {
            console.log("results:");
            console.log(result[0]);
            return res.render("../assets/views/post/edit.pug", {
                id: req.params.id, 
                title: result[0].title,
                description: result[0].description,
                image_url: result[0].image_url
            })
        }
    }
   );   
 });

// route to send new edit  back to the database

 router.post("/post/:id/edit", (req, res) => {
    const post = req.body;
   DB.query(`UPDATE posts SET title = '${post.title}', image_url = '${post.image_url}', description = '${post.description}' WHERE id = ${req.params.id}`, (error, result) => {
       if(error){
           console.log("error:")
           console.log(error)
           return res.redirect("/post/create");
       } else {
           return res.redirect(`/post/${req.params.id}`) // sends to post page
           //return res.redirect(`/post/${req.params.id}/edit`) sends to edit page
       }
   }
  );
});

router.get("/post/:id/delete", (req, res) => {
    const post = req.body;
   DB.query(`DELETE FROM posts WHERE id = ${req.params.id}`, (error, result) => {
       if(error){
           console.log("error:");
           console.log(error);
           return res.redirect(`/post/${req.params.id}/edit`);
       } else {
           return res.redirect(`/`) // if good sends back to home page
           
       }
   }
  );
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