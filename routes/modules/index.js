const express = require('express');

const requireLogin = require('../../middleware/auth') 


const router = express.Router();

router.get('/', requireLogin, (req, res) => {
    res.render('index');
});

module.exports = router;