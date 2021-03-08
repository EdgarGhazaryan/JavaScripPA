const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthenticationService {
    constructor() {}

    async validate(user) {
        const {username, email, password} = user;
        let errors = [];

        const usernameRegEx = "[a-zA-Z0-9]+";
        const mailRegEx = "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)])";
        const passRegEx = ["^(.*?[A-Z]){2,}.*$", "^(.*?\\d){2,}.*$"];

        if (username === undefined || email === undefined || password === undefined) {
            return "Please fill in all fields.";
        }

        if (username !== null && !username.match(usernameRegEx) && username.length < 4 && username.includes(' ')) {
            errors.push("Username is invalid.");
        }
        if (email !== null && !email.match(mailRegEx)) {
            errors.push("Enter correct email");
        }
        if (password !== null && (!(password.length > 8) || !password.match(passRegEx[0]) ||
            !password.match(passRegEx[1]) || password.includes(" "))) {
            errors.push("Invalid password. Password must contain 2 uppercase letters, 3 numbers, not contain space and be longer than 8 symbols");
        }

        const foundUser = await User.findOne({email: email}).exec();
        if (foundUser) {
            errors.push('This email has already occupied');
        }

        if (errors.length > 0) {
            let str = "";
            for (let i = 0; i < errors.length - 1; ++i) {
                str = str.concat(errors[i] + '\n');
            }
            str = str.concat(errors[errors.length - 1]);
            return str;
        }

        return undefined;
    }

    async login(email, password) {
        const user = await User.findOne({email: email}).exec();

        if (user) {
            const isSamePassword = await bcrypt.compare(password, user.password);
            if (isSamePassword) {
                const token = jwt.sign({
                    id: user._id
                }, process.env.ACCESS_TOKEN, {
                    expiresIn: '2h'
                });
                return {
                    message: `${user.fullName}, you are successfully logged in.`,
                    token: `Bearer ${token}`,
                    loggedIn: true
                };
            }
            return {
                message: "The password is incorrect.",
                loggedIn: false
            };
        }
        return {
            message: "User with this email is not found.",
            loggedIn: false
        };
    }
}


module.exports = AuthenticationService;