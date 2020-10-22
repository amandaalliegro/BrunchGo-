// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 3050;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const cookieSession = require('cookie-session');
const { sendSMS } = require('./twilio');

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
app.use(bodyParser.urlencoded({ extended: true }));
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

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const menuRoutes = require("./routes/menu");
const widgetsRoutes = require("./routes/widgets");
const ordersRoutes = require('./routes/orders');
const adminRoutes = require('./routes/admin');
const cartRoutes = require('./routes/cart');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/menu", menuRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
app.use('/api/orders', ordersRoutes(db));
app.use("/admin", adminRoutes(db));
app.use("/cart", cartRoutes(db));
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  if (req.session.user_id) {
    res.render("index");
  } else {
    const newId = Math.round(Math.random() * 100000);
    req.session.user_id = newId;
    res.render("index");
  }
});



app.get('/manager/orders', (req, res) => {
  const returnObj = []

  const orderids = [];


  db.query(`
    SELECT * FROM orders
    ORDER BY place_order_datetime DESC;
  `).then((data) => {
res.send(data.rows)
  }).then(() => {
    for (const item in returnObj[0]) {
      orderids.push(returnObj[0][item].id)
    }
  }).then(() => {
    db.query(`
    SELECT * FROM orders;
    `)
  }).then((data)=> {
    console.log(data)
  })


})

app.get('/manager/orders/:orderid', (req, res) => {
  db.query(`
  SELECT items.name, order_items.quantity
  FROM items
  JOIN order_items ON order_items.item_id = items.id
  WHERE order_items.order_id = ${req.params.orderid};

  `).then((data) => {
    res.send(data.rows)
  });

})

app.get("/manager", (req, res) => {
  if (req.session.user_id) {
    res.render('index_manager');
  } else {
    const newId = Math.round(Math.random() * 100000);
    req.session.user_id = newId;
    res.render('index_manager');
  }
});
app.get("/update", (req, res) => {
  if (req.session.user_id) {
    res.render('index_menu_update');
  } else {
    const newId = Math.round(Math.random() * 100000);
    req.session.user_id = newId;
    res.render('index_menu_update');
  }
});

app.post("/update", (req, res) => {
  console.log(req.body)
  db.query(`
  INSERT INTO items (id, name, category, price, available, prep_time, image, stock)
  VALUES(1000000, '${req.body.name}', '${req.body.category}', ${req.body.price}, ${req.body.available}, ${req.body.prep_time}, '${req.body.image}', ${req.body.stock});
  `)
  res.send('ok')
})

// Returns the user's cookie so it can be used to create a local entry with the user's menu selections
app.get("/userid", (req, res) => {
  const userid = req.session.user_id.toString();
  res.send(userid);
});


app.get("/orderclient", (req, res) => {
  if (req.session.user_id) {
    res.render('index_user_order');
  } else {
    const newId = Math.round(Math.random() * 100000);
    req.session.user_id = newId;
    res.render('index_user_order');
  }
});
app.post("/orderaccepted", (req, res) => {
  if (req.session.user_id) {
    res.render('index_user_accept');
  } else {
    const newId = Math.round(Math.random() * 100000);
    req.session.user_id = newId;
    res.render('index_user_accept');
  }
});
app.get("/orderdenied", (req, res) => {
  if (req.session.user_id) {
    res.render('index_user_denied');
  } else {
    const newId = Math.round(Math.random() * 100000);
    req.session.user_id = newId;
    res.render('index_user_denied');
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
