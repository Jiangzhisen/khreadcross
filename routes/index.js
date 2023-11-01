const express = require('express')
const router = express.Router()

const book = require('./modules/book') // book route

router.use('/book', book)

module.exports = router