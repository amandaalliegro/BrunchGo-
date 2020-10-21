/*
 * All routes for orders are defined here
 * Since this file is loaded in server.js into /orders,
 *   these routes are mounted onto /orders
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const { sendSMS } = require('../twilio');
const router = express.Router();

module.exports = (db) => {

  /*
  Workflow
  1. Insert into order data table
  2. Insert into order_items table
  4. render page to tell customer order received
  */

  // POST: for customer to place an order
  router.post("/confirmation", (req, res) => {

    // Set orderDatetime to current time
    // const placeOrderDatetime = Date.now();
    console.log(req.body)
    const { userid, name, phone, sub_total, tax, total } = req.body;

    // 1. INSERT the data to order database
    const currentDateTime = new Date().toISOString();

    // CREATE TABLE orders (
    //   id                  SERIAL PRIMARY KEY NOT NULL,
    //   restaurant_id        INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
    //   name                VARCHAR(255) NOT NULL,
    //   phone               VARCHAR (255) NOT NULL,
    //   place_order_datetime      TIMESTAMP NOT NULL,
    //   sub_total           INTEGER NOT NULL,
    //   tax                 INTEGER NOT NULL,
    //   total               INTEGER NOT NULL,
    //   accept_order_datetime TIMESTAMP,
    //   complete_order_datetime  TIMESTAMP
    // );

    let restaurantId = 100;
    db.query(
      `INSERT INTO orders (restaurant_id, name, phone, place_order_datetime, sub_total, tax, total, accept_order_datetime, complete_order_datetime)
    VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *
    ;`, [restaurantId, name, phone, currentDateTime, sub_total, tax, total, null, null])
    .then(data => {
      sendSMS('6478730463', 'new order received!');
      return data;
    })
    .then(data => res.send(`the order_id is ${data.rows[0].id}`))
    .catch(err => {
      res.status(500).json({ error: err.message })});


    });

    router.get('/user_order', (req, res) => {
      res.render('index_user_order')
    })
  return router;
};
