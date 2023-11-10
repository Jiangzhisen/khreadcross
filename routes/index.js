const express = require('express');

// const book = require('./modules/bookBySequelize');
const index = require('./modules/index');
const login = require('./modules/login');
const signIn = require('./modules/signIn');
const logout = require('./modules/logout');
const users = require('./modules/users');

const router = express.Router();

// router.use('/book', book);
router.use('/', index);
router.use('/login', login);
router.use('/signIn', signIn);
router.use('/logout', logout);
router.use('/users', users);

module.exports = router;