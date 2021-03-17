const express = require('express');

const app = express();

const connectDB = require('./db/connection');

connectDB();   // connect DB

const port = 3000;
const api = require('./routes/api') // get exports from this folder which are routes

app.use(express.urlencoded({ extended: true })); // required to parse nested objects
app.use(express.json());           // required to parse body
// app.use(express.static('public'))  // sets the view to public folder index.html
app.set('view engine', 'ejs');     // tells app to look for view folder to use EJS template engine

app.use('/', api)  // all api routes start with /api as described on this line

app.listen(port, () => console.log(`App running on port: ${port}`))
