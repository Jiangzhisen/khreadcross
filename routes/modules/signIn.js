const express = require('express');

const UserController = require('../../controllers/user_controller');

const router = express.Router();


router.get('/', (req, res) => {
    res.render('signIn', {'error': ''});
});

router.post('/', UserController.register_user);

module.exports = router;