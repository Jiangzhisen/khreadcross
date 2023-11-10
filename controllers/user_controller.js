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

const logout_user = async(req, res) => {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/login');
    });
}



// API
const users_get = async(req, res) => {
    try {
        user_data = await UserRepository.get_users();
        if (user_data[0]) {
            return res.json(user_data);
        }
        else {
            return res.json({'message': 'User not found!!'});
        }
    } 
    catch(error) {
        throw new HttpError(error, 400);
    }
}

const user_get_by_email = async(req, res) => {
    const email = req.params.email;
    try {
        user_data = await UserRepository.get_users({email: email});
        if (user_data[0]) {
            return res.json(user_data[0]);
        }
        else {
            return res.json({'message': 'User not found!!'});
        }
    } 
    catch(error) {
        throw new HttpError(error, 400);
    }
}

const user_add = async(req, res) => {
    const { email, name, password, avatar, self_introduction } = req.body;
    let user_data;

    try {
        user_data = await UserRepository.get_users({email: email});
    } 
    catch(error) {
        throw new HttpError(error, 400);
    }

    if (user_data[0]) {
        return res.json({'message': 'This user is already existed!!'});
    }
    else {
        try {
            user_info = await UserRepository.add_user({email: email, user_name: name, password: password, avatar: avatar, self_introduction: self_introduction});
            console.log('Add user successfully!!');
            return res.json(user_info);
        }
        catch(error) {
            throw new HttpError(error, 400);
        }
    }
}

const user_update_by_password = async(req, res) => {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    try {
        user_info = await UserRepository.update_user({email: email, password: password});
        return res.json(user_info);
    }
    catch(error) {
        throw new HttpError(error, 400);
    }
}

const user_delete_by_email = async(req, res) => {
    const { email } = req.body;
    console.log(email);
    try {
        user_info = await UserRepository.delete_user({email: email});
        return res.json(user_info);
    }
    catch(error) {
        throw new HttpError(error, 400);
    }
}


exports.register_user = register_user;
exports.login_user = login_user;
exports.logout_user = logout_user;
exports.users_get = users_get;
exports.user_get_by_email = user_get_by_email;
exports.user_add = user_add;
exports.user_delete_by_email = user_delete_by_email;
exports.user_update_by_password = user_update_by_password;