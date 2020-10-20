// load .env data into process.env
require('dotenv').config();

const { sendSMS } = require("./helpers");

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const cookieSession = require('cookie-session');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");

// Need this for postman; need to check if it's needed for the app
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));
app.use(cookieSession ({
  name: 'session',
  keys: ['a']
}));

app.use(cookieSession({
  name: 'session',
  keys: ['key1','key2']
}))

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const menuRoutes = require("./routes/menu");
const widgetsRoutes = require("./routes/widgets");
const { reapIntervalMillis } = require('pg/lib/defaults');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/menu", menuRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {

  res.send('hello');
  // if (req.session.user_id) {
  //   res.render("index");
  // } else {
  //   const newId = Math.round(Math.random() * 100000);
  //   req.session.user_id = newId;
  //   res.render("index");
  // }
});


// test the POST method for sending SMS message
app.post('/test', (req, res) => {

  const { phone, message } = req.body;
  // console.log(typeof req.body);
  // const {phone, message} = req.body;
  sendSMS(phone, message);
  res.send('SMS message sent');

});
app.get("/login", (req, res) => {
  if (req.session.user_id) {
    res.render('index_login');
  } else {
    const newId = Math.round(Math.random() * 100000);
    req.session.user_id = newId;
    res.render('index_login');
  }
});

app.get("/manager", (req, res) => {
  if (req.session.user_id) {
    res.render('index_manager');
  } else {
    const newId = Math.round(Math.random() * 100000);
    req.session.user_id = newId;
    res.render('index_manager');
  }
});

// Returns the user's cookie so it can be used to create a local entry with the user's menu selections
app.get("/userid", (req, res) => {
  const userid = req.session.user_id.toString();
  res.send(userid);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
