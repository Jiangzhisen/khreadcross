const _ = require('lodash');
const dayjs = require('dayjs');
const express = require('express');
const { check, validationResult } = require('express-validator');

const { booktest } = require('../../models/index'); 


const router = express.Router();

router.use((req, res, next) => {
    console.log(`requestTime:`, dayjs().format('YYYY-MM-DD HH:mm:ss'));
    next();
});

router.get('/', async (req, res) => {
    try {
      const books = await booktest.findAll({raw: true});
      console.log(books);
      _.forEach(books.name, name => {
            console.log(name);
      })
    } 
    catch (error) {
        console.error("An error occurred:", error);
    }

    res.render('page',{'text': 'Get a book'});
});

// define the book route by post method
router.post('/', [check('bookName').exists({checkFalsy: true}).withMessage('Missing bookName')], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Handle validation errors
        const errorMessages = errors.array().map(error => error.msg);
        console.log(errorMessages);
        return res.status(400).json({ errors: errorMessages });
    }

    const bookName =  req.body.bookName;

    try {
        const books = await booktest.create({ bookName: bookName }, { raw: true });
    } 
    catch (error) {
        console.error("An error occurred:", error);
    }

    res.render('page',{'text': `add a new book: ${bookName}`});
});

// define the book route by delete method
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const books = await booktest.destroy({
            where: {
                id : id
            }
        });
    } 
    catch (error) {
        console.error("An error occurred:", error);
    }

    res.render('page',{'text': `Delete the book number ${id}`});
});

module.exports = router;