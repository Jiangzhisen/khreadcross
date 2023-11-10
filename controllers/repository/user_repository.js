const uuid = require('uuid');
const dayjs = require('dayjs');

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

    try {
        let user_list = await users.findAll({
            where: condition,
            raw: true
        });
        return user_list;
    }
    catch(error) {
        throw new Error(error);
    }
}

const add_user = async({ email, user_name, password, avatar='', self_introduction='' }) => {
    const hashedPassword = await hash(password);
    try {
        return await users.create({user_id: uuid.v4(), email: email, password: hashedPassword, name: user_name, avatar: avatar, self_introduction: self_introduction, status: 1}, {raw: true});
    }
    catch(error) {
        throw new Error(error);
    }
}

const update_user = async({ email, password, user_name, avatar, introduction, user_status } = {}) => {
    if (!email) {
        return {'message': 'Email is a required parameter!!'};
    }
    const user_info = await users.findOne({
        where: {
            email: email
        }
    })
    let modification = {};
    modification.update_time = dayjs().format('YYYY-MM-DD HH:mm:ss');

    if (password) {
        const hashedPassword = await hash(password);
        modification.password = hashedPassword;
    }

    if (user_name) {
        modification.name = user_name;
    }

    if (avatar) {
        modification.avatar = avatar;
    }

    if (introduction) {
        modification.self_introduction = introduction;
    }

    if (user_status) {
        modification.status = user_status;
    }

    try {
        return await user_info.update(modification);
    }
    catch(error) {
        throw new Error(error);
    } 
}

const delete_user = async({user_id, email} = {}) => {
    try {
        if (user_id) {
            const user_info = await users.findOne({
                where: {
                    user_id: user_id
                }
            })
            if (user_info) {
                console.log('delete user');
                return await user_info.destroy();
            }
            else {
                return {'message': 'This user not found!!'};
            }
        }
        else if (email) {
            const user_info = await users.findOne({
                where: {
                    email: email
                }
            })
            if (user_info) {
                console.log('delete user');
                return await user_info.destroy();
            }
            else {
                return {'message': 'This user not found!!'};
            }
        }
        else {
            return {'message': 'Either user_id or email is a required parameter!!'};
        }
    }
    catch(error) {
        throw new Error(error);
    }
}

exports.add_user = add_user;
exports.get_users = get_users;
exports.update_user = update_user;
exports.delete_user = delete_user;