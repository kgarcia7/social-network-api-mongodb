const express = require('express'); // importing the express.js library to create a web server
const db = require('./config/connection'); // importing database connect config
const routes = require('./routes'); // imports routes modules

const cwd = process.cwd(); //getting current working directory 


const PORT = process.env.PORT || 3001; // setting port number to either env variable PORT or 3001 if not defined
const app = express(); //creating an express app 

// middleware to parse incoming URL-encoded and JSON data
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 

//use routes modules
// app.use(routes);

//Once database connection is open, start express server and listen on specified port
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});

