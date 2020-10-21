/*
 * All routes for orders are defined here
 * Since this file is loaded in server.js into /admin,
 *   these routes are mounted onto /admin
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const e = require('express');
const express = require('express');
const { sendSMS } = require('../twilio');
const router = express.Router();

module.exports = (db) => {

  // GET Root page of admin
  router.get("/", (req, res) => {

    // if not logged in, direct to login page
    if (!req.session.admin_id) {
      return res.render("./admin/login");
    } else {
    // Need to determin file placement
      return res.render("./admin/order");
    }
  });

  // GET admin login page
  router.get("/login", (req, res) => {

    // direct to order page if already login
    if (req.session.admin_id) {
      return res.render("./admin/order");
    }
    res.render("login");
  });

  // POST login username and password
  router.post("/login", (req, res) => {
    
    if (req.session.adminLogin) {
      return res.render('./admin/order')
    }

    const { username, password } = req.body;

    db.query(`SELECT * FROM manager
    WHERE username = $1
    `, [username])
    .then(data => {
      console.log('data.rows is', data.rows);
      const result = data.rows[0];
      console.log('result is', result);
      if (!result) {
        res.send('User does not exist.');
      } else if (password !== result.password){
        res.send('Incorrect password.');
      } else {
        // set cookie for user
        // res.session.adminLogin = true
        res.send('success');
      }
    })
  });

  // POST accept order base on order_id
  router.post("/order/accept/:order_id", (req, res) => {
    const orderId = req.params.order_id;


    const acceptOrderDatetime = new Date().toISOString();
    console.log('the orderId is:', orderId);

    // Update order table with accept_order_datetime
    db.query(`UPDATE orders
    SET accept_order_datetime = $1
    WHERE id = $2
    RETURNING *;
    `,[acceptOrderDatetime, orderId])
    // Send SMS to customer to notify the order is accepted
    .then(data => {
      const {id, phone} = data.rows[0];
      sendSMS(phone, 'order accepted');
    })
    .then(() => res.send(`Thank you for your order! Order ID: ${id}`))
  });

  // POST complete order by


  return router;




}
