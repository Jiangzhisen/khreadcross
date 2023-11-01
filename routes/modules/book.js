const express = require('express')
const router = express.Router()


// Middleware
router.use((req, res, next) => {
    // get the current time
    console.log('requestTime: ', new Date(new Date().getTime() + 8 * 60 * 60 * 1000)) 
    next()  // call next() to excute the next function
})

// define the book page route by get method
router.get('/', (req, res) => {
    res.render('page', {'text': 'Get a book'})
})
// define the book route by post method
router.post('/', (req, res) => {
    res.render('page',{'text': 'Post a book'})
})

// define the book route by delete method
router.delete('/', (req, res) => {
    res.render('page',{'text': 'Delete the book'})
})

module.exports = router