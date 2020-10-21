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
  4. redirect customer to confirmation page
  */

  // POST: for customer to place an order
  router.post("/confirmation", (req, res) => {

    // Set orderDatetime to current time
    // const placeOrderDatetime = Date.now();

    const { name, phone, sub_total, tax, total } = req.body;
    // console.log(name, phone, sub_total, tax, total);
    /* 1. INSERT the data to order database */
    const currentDateTime = new Date().toISOString();

    // Currently only accepting order from one restaruant
    const restaurantId = 100;
    db.query(
      `INSERT INTO orders (restaurant_id, name, phone, place_order_datetime, sub_total, tax, total, order_status, accept_order_datetime, estimated_prep_time, complete_order_datetime)
    VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *
    ;`, [restaurantId, name, phone, currentDateTime, sub_total, tax, total, 'received', null, null, null])
    /* 2 INSERT INTO order item table */
    .then(data => {
      //retrieve id from orders table
      const orderId = data.rows[0].id;
      const { order } = req.body;
      console.log(orderId, order);

      const orderLength = order.length;
      let count = 0;
      let queryString = 'INSERT INTO order_items (order_id, item_id, quantity) VALUES ';
      for (let item of order) {
        queryString += `(${orderId}, ${item.id}, ${item.quantity}) `;
        if (count < orderLength - 1) {
          queryString += ', ';
        }
        count++;
      }
      queryString += 'RETURNING * ;';

      console.log(queryString);

      return db.query(queryString);
    })
    // Send SMS message to restaruant
    .then(data => {
      // currently using George's phone number
      sendSMS('6478730463', 'new order received!');
      return data;
    })
    // Set cookie with order_id and redirect to /order page
    .then(data => {
      // const orderId = data.rows[0].order_id;
      // // Set cookie on browser for order_id
      // req.session.order_id = orderId;
      // Check the name of view
      res.send('message placed');
    })
    .catch(err => {
      res.status(500).json({ error: err.message })});


    });

    router.get('/user_order', (req, res) => {
      res.render('index_user_order')
    })
  return router;
};
