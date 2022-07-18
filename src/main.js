const express = require("express");
// bring in bodyparse
const bodyParse = require("body-parser");
// bring in .env
let dotenv = require("dotenv");
// store express in a variable
let app = express();
// use dot env config.
dotenv.config();
let userRoutes = require("./routes/userRoutes");
let djRoutes = require("./routes/djRoutes");
let clientRoutes = require("./routes/clientRoutes");

app.use(userRoutes);
app.use(djRoutes);
// Create USER,CLIENT, and DJ tables sql
//
//get the app servers port from env, fallback on 8000 
// if not configured
const PORT = process.env.PORT || 8000;

// use the body parse
app.use(bodyParse.json());
// Get the route definitions


// tell express app to use routes
app.use();

// start the express app and log what port im on
app.listen(PORT,()=>{
    console.log("API Server started on port", PORT);
});



//PUSH to HEROKU!!!! Type in terminal!!!!!
// heroku login  , heroku version, heroku git:remote -a zaydb , git remote -v, git push heroku master