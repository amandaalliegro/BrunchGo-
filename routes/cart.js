/*
 * All routes for orders are defined here
 * Since this file is loaded in server.js into /admin,
 *   these routes are mounted onto /admin
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const express = require('express');
const router = express.Router();
const local_db = require('../public/local_db/local_db')
const user_cart = {};

module.exports = (db) => {
  router.post('/add/:id', (req, res) => {
    let orderid = req.session.user_id;
    if (!user_cart[orderid]) {
      user_cart[orderid] = [];
    }

    db.query(`
    SELECT * FROM items
    WHERE items.id = ${req.params.id}
    `).then((data) => {
      user_cart[orderid][req.params.id]
    })
     = local_db[req.params.id];

    // db.query(`
    // INSERT INTO orders (restaurant_id, userid, name, phone, place_order_datetime, sub_total, tax, total, order_status, accept_order_datetime, estimated_prep_time, complete_order_datetime)
    // VALUES
    // ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    // RETURNING *;`, [restaurantId, req.session.user_id, name, phone, currentDateTime, sub_total, tax, total, 'received', null, null, null]
    // )
  })

  return router;
};
