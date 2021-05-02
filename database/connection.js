const mysql = require("mysql");

const DB = mysql.createConnection({
    host: "remotemysql.com",
    user: "VlNfIMc8X6",
    password: "bkXBCZof24",
    database: "VlNfIMc8X6",
    multipleStatements: true
});

DB.connect((error) => {
    if (!error) {
        console.log("Connected To Database");
        //Running Migration of Tables - see if database exist, if not create table
        DB.query("SELECT 1 FROM posts LIMIT 1", (error, results) => {
            if(error) {
                //create table
                console.log("Creating Table Posts");
                DB.query(`CREATE TABLE posts(id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    title VARCHAR(60) NOT NULL,
                    description MEDIUMTEXT NOT NULL,
                    image_url MEDIUMTEXT NOT NULL)`, (error, results) => {
                    if(error) {
                        console.log("ERROR WITH CREATING TABLE");
                        console.log(error);
                    } else {
                        console.log("CREATED TABLE");
                    }
                })
            } else {
                console.log("Table Posts Already Exists");
            }
        })
    } else {
        console.log("No Connection");
    }
});

module.exports = DB