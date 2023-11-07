const express = require('express');

const { user } = require('../../models/index');
const { compare } = require('../../utils/passwordUtils');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('login', {'error': ''});
});

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    let userData;

    try {
        userData = await user.findOne({
            where: {
                username: username
            },
            raw: true
        });
    }
    catch (error) {
        console.error("An error occurred:", error);
    }

    console.log('userData', userData);
    // If it has not been registered, an error will be thrown
    if (!userData) {
        res.render('login', {'error': 'Account not found'});
    }

    if (username !== userData.username || !await compare(password, userData.password)) {
        res.render('login', {'error': 'Invalid username or password'});
    }

    if (username === userData.username && await compare(password, userData.password)) {
        // login successful
        req.session.userId = userData.id;
        req.session.user = userData.username;
        res.redirect('/');
    } 
    else {
        // login failed
        res.render('login', {'error': 'Invalid username or password'});
    }
});

module.exports = router;