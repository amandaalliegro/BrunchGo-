/*
 * All routes for orders are defined here
 * Since this file is loaded in server.js into /admin,
 *   these routes are mounted onto /admin
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const { sendSMS } = require('../twilio');
const router = express.Router();
const bcrypt = require('bcrypt');
require('dotenv').config();

module.exports = (db) => {

  // GET Root page of admin
  router.get("/", (req, res) => {

    // if not logged in, direct to login page
    if (!req.session.admin) {
      return res.render("./admin/login");
    } else {
    // Need to determin file placement
      return res.render("../manager");
    }
  });

  // GET admin login page
  router.get("/login", (req, res) => {

    // direct to order page if already login
    if (req.session.adminLogin) {
      res.redirect("../manager");
    }
    res.render("index_login");
  });

  // POST login username and password
  router.post("/login", (req, res) => {
    console.log(req.body);


    const { username, password } = req.body;
    db.query(`SELECT * FROM manager
    WHERE user_name = $1;
    `, [username])
      .then(data => {
        console.log(data)
        console.log('data.rows is', data.rows);
        const result = data.rows[0];
        console.log('result is', result);
        if (!result) {
          res.send('User does not exist.');
        } else if (!bcrypt.compareSync(password, result.password)) {
          res.send('Incorrect password.');
        } else {
        // set cookie for user
          req.session.adminLogin = 'jamie_roll';
          res.redirect("../manager");
        }
      });
  });

  // POST accept order base on order_id
  router.post("/order/accept/:order_id", (req, res) => {
    console.log(req.body.ordertime)
    const orderId = req.params.order_id;
    const {ordertime } = req.body;

    const currentDatetime = new Date().toISOString();

    // Update order table with accept_order_datetime
    db.query(`UPDATE orders
    SET accept_order_datetime = $1, order_status = $2, estimated_prep_time = $3
    WHERE id = $4
    RETURNING *;
    `,[currentDatetime, 'accepted', ordertime, orderId])
    // Send SMS to customer to notify the order is accepted
    .then(data => {
      const {id, phone} = data.rows[0];
      const acceptedOrderDatetime = data.rows[0].accept_order_datetime;
      const estPrepTime = data.rows[0].estimated_prep_time;
      const estCompletionTime = new Date(acceptedOrderDatetime.getTime() + estPrepTime * 60000);
      const estCompletionTimeString = estCompletionTime.toLocaleString('en-US', {timeZone: 'Canada/Eastern', year:"numeric", month:"2-digit", day: "2-digit", hour: '2-digit', minute:'2-digit'});
      sendSMS(phone, `We're preparing your order! The estimated pick up time is ${estCompletionTimeString}. Order #${id} `);
    })
    .then(() =>
      res.redirect('/'))
    .catch(err => {
      res.status(500).json({ error: err.message })});

    // .then(() => res.send(`Thank you for your order! Order ID: ${id}`))
  });

  // POST complete order by restaruant
  router.post("/order/complete/:order_id", (req, res) => {
    const currentDatetime = new Date().toISOString();

    // Update order table with complete_order_datetime
    db.query(`UPDATE orders
    SET complete_order_datetime = $1, order_status = $2
    WHERE id = $3
    RETURNING *;
    `,[currentDatetime, 'completed', req.params.order_id])
    // Send SMS to customer to notify the order is completed
    .then(data => {
      const {id, phone} = data.rows[0];
      sendSMS(phone, `Your order is ready for pickup! See you soon. Order #${id}`);
    })
    .then(() => {
      res.redirect('/');
    })
    .catch(err => {
      res.status(500).json({ error: err.message })});
    });


  // POST deny order by restaruant
  router.post("/order/deny/:order_id", (req, res) => {
    const orderId = req.params.order_id;
    //const currentDatetime = new Date().toISOString();

    // Update order table with complete_order_datetime
    db.query(`UPDATE orders
    SET order_status = $1
    WHERE id = $2
    RETURNING *;
    `,['denied', orderId])
    // Send SMS to customer to notify the order is completed
    .then(data => {
      // console.log(data)
      const {id, phone} = data.rows[0];
      sendSMS(phone, `Sorry, we can't accept your order at this moment. Please try again later. Order #${id}`);
    })
    .then(() => {
      res.redirect('/');
    })
    .catch(err => {
      res.status(500).json({ error: err.message })});
    });

    router.post('/logout', (req, res) => {
        res.clearCookie("session");
        res.clearCookie("session.sig");
        res.redirect('/admin/login');


    });

  return router;
};
