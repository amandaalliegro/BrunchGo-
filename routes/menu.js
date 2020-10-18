/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/appetizers", (req, res) => {
    db.query(`SELECT * FROM items WHERE category = 'Appetizers';`).then(data => {
      const menu = data.rows;
      res.send(menu);
    }).catch(err => {
      res.status(500).json({ error: err.message });
    });

  })
  router.get("/mains", (req, res) => {
    db.query(`SELECT * FROM items WHERE category = 'Mains';`).then(data => {
      const menu = data.rows;
      res.send(menu);
    }).catch(err => {
      res.status(500).json({ error: err.message });
    });

  });

  router.get("/desserts", (req, res) => {
    db.query(`SELECT * FROM items WHERE category = 'Desserts';`).then(data => {
      const menu = data.rows;
      res.send(menu);
    }).catch(err => {
      res.status(500).json({ error: err.message });
    });

  })
  return router;
}
