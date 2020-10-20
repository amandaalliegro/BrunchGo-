/*
 * All routes for orders are defined here
 * Since this file is loaded in server.js into /orders,
 *   these routes are mounted onto /orders
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {

  /*
  Workflow
  1. Insert into order data table
  2. Insert into order_items table
  4. render page to tell customer order received
  */

  // POST: for customer to place an order
  router.post("/", (req, res) => {

    // Set orderDatetime to current time
    // const placeOrderDatetime = Date.now();

    const { restaurantId, name, phone, subTotal, tax, total } = req.body;

    // console.log(req.body);
    // res.send('done');
    // [restaurantId, name, phone, placeOrderDatetime, subTotal, tax, total, null, null]
    // 1. INSERT the data to order database
    const currentDateTime = new Date().toISOString();

    db.query(
      `INSERT INTO orders (restaurant_id, name, phone, place_order_datetime, sub_total, tax, total, accept_order_datetime, complete_order_datetime)
    VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *
    ;`, [restaurantId, name, phone, currentDateTime, subTotal, tax, total, null, null])
    .then(data => res.send(`the order_id is ${data.rows[0].id}`))
    .catch(err => {
      res.status(500).json({ error: err.message })});
    });
  return router;
}



    // // 2. INSERT the data into order_items database
    // .then(data => {
    //   // Get orderId from previous query
    //   const orderId = data.rows[0].id;

    //   // need to destructure the order based on the req parameter
    //   // ideally, the format is {item_id: {quantity, specification}}
    //   cartItems = {};
    //   let queryString = 'INSERT INTO order_items (order_id, item_id, quantity, specification) VALUES ';

    //   // loop through keys
    //   for (const key in cartItems) {
    //     // need to deconstruct { quantity, specification } = cartItems;
    //     queryString += `(${orderId}, ${cartItems[key].quantity}, $${cartItems[key].specifications}), `;
    //   }
    //   queryString += 'RETURNING * LIMIT 1;';
    //   return db.query(queryString);
    // })

    // // Calculate estimated preparation time
    // .then(data => {
    //   const orderId = data.rows[0].order_id;

    //   return db.query(`SELECT oi.order_id, SUM(oi.quantity * preparation_time) as estimated_time
    //   FROM order_items as oi
    //   JOIN items ON items.id = oi.item_id
    //   WHERE oi.order_id = $1
    //   GROUP BY oi.order_id`, [orderId]);
    // })
    // // 4. Return order completion page (need to create)
    // .then(data => {

    //   // Render page to notify customer the order is received
    //   res.render('order');

    // });
