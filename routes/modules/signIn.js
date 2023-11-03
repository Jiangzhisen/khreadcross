const express = require('express');
const { Model } = require('sequelize');


const router = express.Router();

router.get('/', (req, res) => {
    res.render('signIn');
});

module.exports = router;