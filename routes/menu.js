/*
 * All routes for Menu are defined here
 * Since this file is loaded in server.js into api/menu,
 *   these routes are mounted onto /menu
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const toTitleCase = require('./menu-helpers');

module.exports = (db) => {
  router.get("/:category", (req, res) => {

    // converts req.params.category to Title Case to avoid any issues querying the database
    let category = toTitleCase(req.params.category);

    db.query(`SELECT * FROM items WHERE category = '${category}';`).then(data => {
      const menu = data.rows;
      res.send(menu);
    }).catch(err => {
      res.status(500).json({ error: err.message });
    });
  });

  return router;
}
