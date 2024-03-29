const express = require('express');

const UserController = require('../../controllers/user_controller');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('login', {'error': ''});
});

router.post('/', UserController.login_user);

module.exports = router;