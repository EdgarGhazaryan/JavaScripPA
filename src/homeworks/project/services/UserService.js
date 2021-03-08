const User = require('../models/User');
const bcrypt = require('bcryptjs');

class UserService {
    constructor() {}

    async saveUser(user) {
        const {username, email, password} = user;

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        await newUser.save();
    }

    async updateUserById(id, user) {
        const oldUser = await User.findById(id);
        if(!oldUser) {
            return false;
        }

        const {username, email, password} = user;
        if (username) {
            oldUser.username = username;
        }
        if (email) {
            oldUser.email = email;
        }
        if (password) {
            oldUser.password = await bcrypt.hash(password, 10);
        }
        await oldUser.save();
        return true;
    }

    async getUsersByName(username) {
        return await User.findOne({username: username}, {__v: 0, password: 0});
    }

    async getUserById(id) {
        return await User.findById(id, {__v: 0, password: 0});
    }
}

module.exports = UserService;