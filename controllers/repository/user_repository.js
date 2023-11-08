const uuid = require('uuid');

const { hash } = require('../../utils/passwordUtils');
const { users } = require('../../models/index');

const get_users = async({ user_id, email, name, status } = {}) => {
    let condition = {};

    if (user_id) {
        condition.user_id = user_id;
    }
    if (email) {
        condition.email = email;
    }
    if (name) {
        condition.name = name;
    }
    if (status) {
        condition.status = status;
    }

    let user_list = await users.findAll({
        where: condition,
        raw: true
    });

    return user_list;
}

const add_user = async(email, user_name, password) => {
    const hashedPassword = await hash(password);
    try {
        // if this account hasn't already been registered, add the new user data
        return await users.create({user_id: uuid.v4(), email: email, password: hashedPassword, name: user_name, status: 1}, {raw: true});
    }
    catch(error) {
        throw new Error(error);
    }
}

exports.add_user = add_user;
exports.get_users = get_users;