/*
 * All routes for orders are defined here
 * Since this file is loaded in server.js into /admin,
 *   these routes are mounted onto /admin
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const e = require('express');
const express = require('express');
const router = express.Router();

module.exports = (db) => {

  // Get: Root page of admin
  router.get("/", (req, res) => {

    // if not logged in, direct to login page
    if (!req.session.admin_id) {
      return res.render("./admin/login");
    } else {
    // Need to determin file placement
      return res.render("./admin/order");
    }
  });

  router.get("/login", (req, res) => {
    if (req.session.admin_id) {
      return res.render("./admin/order");
    }
    res.render("login");
  });

  return router;
}
