const fs = require('fs').promises;
const bcrypt = require('bcrypt');

const User = require('../model/User');

const createUser = async (req, res, next) => {
    try {
        const {fullName, email, password} = req.body;
        const user = new User(fullName, email, password);

        let errorMessage = validate(user);
        if (errorMessage) {
            return res.status(400).json({
                message: errorMessage
            });
        }

        let users = await getAllUsersInArray();
        if (!users) {
            return next('Error while reading from db');
        }

        for (let oldUser of users) {
            if (oldUser.email === user.email) {
                return res.status(400).json({
                    message: "User with this email has already existed"
                });
            }
        }

        let lastIndex = users.length === 0 ? 0 : users[users.length - 1].id;
        user.id = ++lastIndex;
        user.password = await bcrypt.hash(user.password, 10);
        users.push(user);

        await fs.writeFile('./db/users.json', JSON.stringify(users));

        return res.status(201).json({
            message: "You have successfully registered"
        });
    } catch (err) {
        next(err.message);
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        let users = await getAllUsersInArray();
        if (!users) {
            return next('Error while reading from db');
        }

        for (let i = 0; i < users.length; ++i) {
            delete users[i].password;
        }

        return res.status(200).json({users});
    } catch (err) {
        next(err);
    }
}

const getUserByKey = async (req, res, next) => {
    let searchKey = Number(req.params.key);

    if(typeof searchKey === "number" && !isNaN(searchKey)) {
        return await getUserById(req, res, next);
    }
    searchKey = req.params.key;
    if(typeof searchKey === "string") {
        return await getUserByName(req, res, next);
    }
    return next('Page not found');
}

const getUserById = async (req, res, next) => {
    try {
        const id = Number(req.params.key);
        if (isNaN(id)) {
            return next('Enter valid id');
        }

        let users = await getAllUsersInArray();
        if (!users) {
            return next('Error while reading from db');
        }
        for (let user of users) {
            if (user.id === id) {
                delete user.password;
                return res.status(200).json({user});
            }
        }
        return next('User not found');
    } catch (err) {
        next(err);
    }
}

const getUserByName = async (req, res, next) => {
    try {
        let name = req.params.key;

        if (name.includes("%20")) {
            name = name.replace("%20", " ");
        }

        let users = await getAllUsersInArray();
        if (!users) {
            return next('Error while reading from db');
        }

        const foundedUsers = [];
        for (let user of users) {
            if (user.fullName === name) {
                delete user.password;
                foundedUsers.push(user);
            }
        }
        if(foundedUsers.length !== 0) {
            return res.status(200).json({
                "users": foundedUsers
            });
        }

        return next('User not found');
    } catch (err) {
        next(err);
    }
}

const updateUser = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return next('Enter valid id');
        }

        const {fullName, email, password} = req.body;
        const user = new User(fullName, email, password);

        let users = await getAllUsersInArray();
        if(!users) {
            return next('Error while reading from db');
        }
        let isUserFound = false;

        for (let i = 0; i < users.length; ++i) {
            if (users[i].id === id) {
                users[i].fullName = user.fullName;
                users[i].email = user.email;
                users[i].password = await bcrypt.hash(user.password, 10);
                isUserFound = true;
                break;
            }
        }

        if (!isUserFound) {
            return next('User not found');
        }

        await fs.writeFile('./db/users.json', JSON.stringify(users));

        return res.status(200).json({
            message: "User successfully updated"
        })
    } catch (err) {
        next(err);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return next('Enter valid id');
        }

        let users = await getAllUsersInArray();
        if (!users) {
            return next('Error while reading from db');
        }
        let isUserFound = false;

        for (let i = 0; i < users.length; ++i) {
            if (users[i].id === id) {
                users.splice(i, 1);
                isUserFound = true;
                break;
            }
        }

        if (!isUserFound) {
            return next('User not found');
        }

        await fs.writeFile('./db/users.json', JSON.stringify(users));

        return res.status(200).json({
            message: "User successfully deleted"
        })
    } catch (err) {
        next(err);
    }
}


module.exports = {
    createUser,
    getAllUsers,
    getUserByKey,
    updateUser,
    deleteUser
}

const validate = (user) => {
    let errors = [];
    const {fullName, email, password} = user;

    const nameRegExp = "[A-Z][a-z]+\\s+[A-Z][a-z]+";
    const mailRegExp = "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)])";
    const passRegExp = ["^(.*?[A-Z]){2,}.*$", "^(.*?\\d){2,}.*$"];

    if (!fullName || !email || !password) {
        return "Please fill in all fields.";
    }

    if (!fullName.match(nameRegExp)) {
        errors.push("Full name is invalid. It must be of format `Name Surname`");
    }
    if (!email.match(mailRegExp)) {
        errors.push("Enter correct email");
    }
    if (!(password.length > 8) || !password.match(passRegExp[0]) ||
        !password.match(passRegExp[1]) || password.includes(" ")) {
        errors.push("Invalid password. Password must contain 2 uppercase letters, 3 numbers, not contain space and be longer than 8 symbols");
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

const getAllUsersInArray = async () => {
    try {
        const data = await fs.readFile('./db/users.json');
        let users;
        if (data.toString().length === 0) {
            users = [];
        } else {
            users = JSON.parse(data);
        }
        return users.map(user => {
            return new User(user.fullName, user.email, user.password, user.id);
        });
    } catch (err) {
        return undefined;
    }
}