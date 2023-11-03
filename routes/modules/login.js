const express = require('express');


const router = express.Router();

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    console.log(username);
    console.log(password);

    if (username === 'admin' && password === 'admin') {
      req.session.user = username;
      res.redirect('/');
    } else {
      res.render('login', { error: 'Invalid username or password' });
    }
});

module.exports = router;