const express = require('express');

const UserController = require('../../controllers/user_controller');

const router = express.Router();


router.get('/', UserController.users_get);

router.get('/:email', UserController.user_get_by_email);

router.post('/', UserController.user_add);

router.patch('/', UserController.user_update_by_password);

router.delete('/', UserController.user_delete_by_email);

module.exports = router;