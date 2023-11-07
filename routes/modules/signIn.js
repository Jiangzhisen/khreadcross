const express = require('express');
const { Model } = require('sequelize');
const uuid = require('uuid');

const { users } = require('../../models/index');
const { hash } = require('../../utils/passwordUtils');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('signIn', {'error': ''});
});

router.post('/', async(req, res) => {
   const { email, user_name, password } = req.body;
   const hashedPassword = await hash(password);
   let user_data;

   try {
        // Check if it has already been registered
        user_data = await users.findOne({
            where: {
                email: email
            },
            raw: true
        });
   } 
   catch(error) {
        console.error("An error occurred:", error);
   }

   // if this account has already been registered, throw the error
   if (user_data) {
        res.render('signIn', {'error': 'This account is already registered'});
   }

   try {
        // if this account hasn't already been registered, add the new user data
        await users.create({user_id: uuid.v4(), email: email, password: hashedPassword, name: user_name, status: 1}, {raw: true});
        res.render('signIn', {'error': 'Registration successful. Please go to the login page to log in again'});
   }
   catch(error) {
        console.error("An error occurred:", error);
   }
});

module.exports = router;