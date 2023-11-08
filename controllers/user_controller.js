const { compare } = require('../utils/passwordUtils');

const UserRepository = require('./repository/user_repository');
const HttpError = require('../utils/http_error');


const register_user = async(req, res) => {
    const { email, user_name, password } = req.body;
    let user_data;

    try {
        // Check if it has already been registered
        user_data = await UserRepository.get_users({email: email});
    } 
    catch(error) {
        throw new HttpError(error, 400);
    }

    // if this account has already been registered, throw the error
    if (user_data[0]) {
        res.render('signIn', {'error': 'This account is already registered'});
    }
    else {
        try {
            // if this account hasn't already been registered, add the new user data
            user_info = UserRepository.add_user(email, user_name, password);
            res.render('signIn', {'error': 'Registration successful. Please go to the login page to log in again'});
        }
        catch(error) {
            throw new HttpError(error, 400);
        }
    }
}

const login_user = async(req, res) => {
    const { email, password } = req.body;
    let user_data;

    try {
        // user_data = await users.findOne({
        //     where: {
        //         email: email
        //     },
        //     raw: true
        // });
        user_data = await UserRepository.get_users({email: email});
    }
    catch(error) {
        throw new HttpError(error, 400);
    }

    console.log('user_data: ', user_data[0]);
    // If it has not been registered, an error will be thrown
    if (!user_data[0]) {
        res.render('login', {'error': 'Account not found'});
    }
    else if (email === user_data[0].email && await compare(password, user_data[0].password)) {
        // login successful
        req.session.user_id = user_data[0].user_id;
        req.session.user_name = user_data[0].name;
        res.redirect('/');
    } 
    else {
        // login failed
        res.render('login', {'error': 'Invalid email or password'});
    }
}

exports.register_user = register_user;
exports.login_user = login_user;