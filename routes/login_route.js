const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
module.exports = (db) => {


  router.get("/", (req, res) => {
    if (!req.session.adminLogin) {
      res.render('index_login');
    } else {
      res.render('index_manager');
    }
  });

  router.post("/", (req, res) => {

    if (req.session.adminLogin) {
      return res.render('./manager');
    }

    const { username, password } = req.body;

    db.query(`SELECT * FROM admin
WHERE username = $1;
`, [username])
      .then(data => {
        console.log('data.rows is', data.rows);
        const result = data.rows[0];
        console.log('result is', result);
        if (!result) {
          res.send('User does not exist.');
        } else if (password !== result.password) {
          res.send('Incorrect password.');
        } else {
          // set cookie for user
          // res.session.adminLogin = true
          res.redirect('/manager');
        }

      });
  });

  router.post('/logout', () => {
    const { username, password } = req.body;
    if ([username]) {
      res.clearCookie("session");
      res.clearCookie("session.sig");
      res.redirect('/login');

    };
  });
  return router
}
