/*
 * All routes for orders are defined here
 * Since this file is loaded in server.js into /orders,
 *   these routes are mounted onto /orders
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

// { orderid: '8656',
//   userid: '83508',
//   name: '',
//   phone: '',
//   sub_total: '36',
//   tax: '5.3999999999999995',
//   total: '41.4',
//   order:
//    [ { id: '8',
//        name: 'French Fries',
//        category: 'Appetizers',
//        price: '1000',
//        available: 'true',
//        prep_time: '360',
//        image: './styles/french_fries.jpeg',
//        stock: '10',
//        quantity: '2' },
//      { id: '9',
//        name: 'Green Salad',
//        category: 'Appetizers',
//        price: '800',
//        available: 'true',
//        prep_time: '360',
//        image: './styles/green_salad.jpeg',
//        stock: '10',
//        quantity: '2' } ] }



const express = require('express');
const { sendSMS } = require('../twilio');
const router = express.Router();

module.exports = (db) => {

  // GET: for customer to check their order
  // post
  router.get("/confirmation", (req, res) => {

    // if no order_id in session, redirect to menu
    const orderId = req.session.order_id;
    if (!orderId) {
      return redirect("../");
    }

    // Query for the order_status
    db.query(`
    SELECT order_status
    FROM orders
    WHERE id = $1
    `, [orderId])
    // render specific page based on
    .then(data => {
      const orderStatus = data.rows[0].order_status;

      // Pseudocode logic
      if (orderStatus === 'received') {
        return res.render(/* page "order received" */);
      } else if (orderStatus === 'accepted') {
        return res.render(/* page "order accepted" */); // Will need the estimated time
      } else if (orderStatus === 'completed') {
        return res.render(/* page "order completed" */);
      } else if (orderStatus === 'denied') {
        return res.render(/* page 'order denied */)
      }
    })
    .catch(err => {
      res.status(500).json({ error: err.message })});

  });


  // POST: for customer to place an order
  /*
  Workflow
  1. INSERT INTO orders table
  2. INSERT INTO order_item table
  3. send SMS to resturant ownder
  */

  router.post("/", (req, res) => {

    // Set orderDatetime to current time
    // const placeOrderDatetime = Date.now();

    const { restaurantId, name, phone, subTotal, tax, total } = req.body;

    // 1. INSERT the data to order database
    const currentDateTime = new Date().toISOString();

    db.query(
      `INSERT INTO orders (restaurant_id, name, phone, place_order_datetime, sub_total, tax, total, order_status, accept_order_datetime, complete_order_datetime)
    VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *
    ;`, [restaurantId, name, phone, currentDateTime, subTotal, tax, total, 'received', null, null])

    // Send SMS message to restaruant
    .then(data => {
      // currently using George's phone number
      sendSMS('7783194360', 'new order received!');
      return data;
    })
    // Set cookie with order_id and redirect to /order page
    .then(data => {
      const orderId = data.rows[0].id;
      // Set cookie on browser for order_id
      req.session.order_id = orderId;
      // Check the name of view
      res.redirect('/');
    })
    .catch(err => {
      res.status(500).json({ error: err.message })});
    });
  return router;
};
