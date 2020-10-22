/*
 * All routes for orders are defined here
 * Since this file is loaded in server.js into /admin,
 *   these routes are mounted onto /admin
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const express = require('express');
const router = express.Router();
const user_cart = {};

module.exports = (db) => {



  router.post('/create', (req, res) => {
    const userid = req.session.user_id;


    let currentDate = new Date(Date.now() - 10*60000).toISOString();
    const timestamp = currentDate.replace('T', ' ').replace('Z', '')

    db.query(`
    INSERT INTO carts (id, created)
    VALUES(${userid}, '${timestamp}')
    ON CONFLICT DO NOTHING;
    `).then(() => {
      res.sendStatus(200)
    })
  })

  router.post('/add', (req, res) => {
    const userid = req.session.user_id;
    const itemid = Number(req.body.id);
    db.query(`
    INSERT INTO cart_items(item_id, cart_id)
    VALUES(${itemid}, ${userid});
    `).then(() => {
      res.sendStatus(200)
    })
  })

  router.post('/remove', (req, res) => {
    const userid = req.session.user_id;
    const itemid = Number(req.body.id);
    db.query(`
    DELETE FROM cart_items
    WHERE id IN (
      SELECT cart_items.id FROM cart_items WHERE cart_id = ${userid}
      AND cart_items.item_id = '${itemid}'
      LIMIT 1
      );
    `).then(() => {
      res.sendStatus(200)
    })
  });

  router.get('/all-cart-items', (req, res) => {
    db.query(`
    SELECT * FROM cart_items
    WHERE cart_items.cart_id = ${req.session.user_id};
    `).then((data)=> {
      res.send(data.rows)
    })
  })

  router.get('/show', (req, res) => {
    db.query(`
    SELECT COUNT(cart_items.item_id) AS quantity, items.*
    FROM items
    JOIN cart_items ON cart_items.item_id = items.id
    JOIN carts ON carts.id = cart_items.cart_id
    WHERE carts.id = ${req.session.user_id}
    GROUP BY items.id;
    `).then((data) => {
      res.send(data.rows)
    })
  })

  router.get('/finalize', (req, res) => {

    res.render('order_confirmation')
  })

  router.get('/', (req, res) => {
    const userid = req.session.user_id;

    db.query(`
    SELECT COUNT(cart_items.item_id) as quantity, items.*
    FROM items
    JOIN cart_items ON cart_items.item_id = items.id
    JOIN carts ON carts.id = cart_items.cart_id
    WHERE carts.id = ${userid}
    GROUP BY items.id;
    `).then((data) => {
      res.send(data.rows)
    })
  })

  router.get('/trim', (req, res) => {
    let currentDate = new Date(Date.now() - 10*60000).toISOString();
    const modified = currentDate.replace('T', ' ').replace('Z', '')

    db.query(`
    DELETE FROM carts
    WHERE created < timestamp '${modified}'
    RETURNING *;
    `).then((data) => {
      res.send(data.rows)
    })
  })

  return router;
};
