app.get("/login", (req, res) => {
  if (req.session.user_id) {
    res.render('index_login');
  } else {
    const newId = Math.round(Math.random() * 100000);
    req.session.user_id = newId;
    res.render('index_login');
  }
});

router.post("/login", (req, res) => {

  if (req.session.adminLogin) {
    return res.render('./manager')
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
  } else if (password !== result.password){
    res.send('Incorrect password.');
  } else {
    // set cookie for user
    // res.session.adminLogin = true
    res.redirect('/manager');
  }

})
});
