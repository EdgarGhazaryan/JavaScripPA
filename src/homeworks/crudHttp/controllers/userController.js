const fs = require('fs');
const bcrypt = require('bcryptjs');

async function createUser(user, res) {
    let errorMessage = validate(user);
    if (errorMessage) {
        res.statusCode = 400;
        return res.end(JSON.stringify({message: errorMessage}));
    }

    let users = getAllUsersInArray();

    for(let oldUser of users) {
        if(oldUser.email === user.email) {
            res.statusCode = 400;
            return res.end(JSON.stringify({
                message: "User with this email has already existed"
            }));
        }
    }

    let lastIndex = users.length === 0 ? 0 : users[users.length - 1].id;
    user.id = ++lastIndex;
    user.password = await bcrypt.hash(user.password, 10);
    users.push(user);

    fs.writeFile('./db/users.json', JSON.stringify(users), err => {
        if (err) {
            res.statusCode = 500;
            return res.end(JSON.stringify({
                message: err.message
            }));
        }
        res.statusCode = 201;
        return res.end(JSON.stringify({
            message: "You have successfully registered"
        }));
    });
}

function getAllUsers(res) {
    const users = getAllUsersInArray();
    for(let i = 0; i < users.length; ++i) {
        delete users[i].password;
    }

    res.statusCode = 200;
    return res.end(JSON.stringify({users}));
}

function getById(id, res) {
    const users = getAllUsersInArray();
    for (let user of users) {
        if (user.id === id) {
            delete user.password;
            res.statusCode = 200;
            return res.end(JSON.stringify({user}));
        }
    }
    res.statusCode = 404;
    return res.end(JSON.stringify({
        message: "User not found"
    }));
}

function getByName(name, res) {
    if(name.includes("%20")) {
        name = name.replace("%20", " ");
    }

    const users = getAllUsersInArray();
    for (let user of users) {
        if (user.fullName === name) {
            delete user.password;
            res.statusCode = 200;
            return res.end(JSON.stringify({user}));
        }
    }
    res.statusCode = 404;
    return res.end(JSON.stringify({
        message: "User not found"
    }));
}

async function updateUser(id, userData, res) {
    let users = getAllUsersInArray();
    let isUserFound = false;

    for(let i = 0; i < users.length; ++i) {
        if(users[i].id === id) {
            users[i].fullName = userData.fullName;
            users[i].email = userData.email;
            users[i].password = await bcrypt.hash(userData.password, 10);
            isUserFound = true;
        }
    }

    if(!isUserFound) {
        res.statusCode = 404;
        return res.end(JSON.stringify({
            message: "User not found"
        }));
    }

    fs.writeFile('./db/users.json', JSON.stringify(users), err => {
        if (err) {
            res.statusCode = 500;
            return res.end(JSON.stringify({
                message: err.message
            }));
        }
        res.statusCode = 200;
        return res.end(JSON.stringify({
            message: "User successfully updated"
        }));
    });
}

function deleteUser(id, res) {
    let users = getAllUsersInArray();
    let isUserFound = false;

    for(let i = 0; i < users.length; ++i) {
        if(users[i].id === id) {
            users.splice(i, 1);
            isUserFound = true;
        }
    }

    if(!isUserFound) {
        res.statusCode = 404;
        return res.end(JSON.stringify({
            message: "User not found"
        }));
    }

    fs.writeFile('./db/users.json', JSON.stringify(users), err => {
        if (err) {
            res.statusCode = 500;
            return res.end(JSON.stringify({
                message: err.message
            }));
        }
        res.statusCode = 200;
        return res.end(JSON.stringify({
            message: "User successfully deleted"
        }));
    });
}

function getSearchKey(str, isNumberNeeded, isStringNeeded) {
    let arr = str.split('/');
    let searchKey = Number(arr[arr.length - 1]);

    if (typeof searchKey === "number" && !isNaN(searchKey) && arr.length === 4 && isNumberNeeded) {
        return searchKey;
    }

    searchKey = arr[arr.length - 1];
    if (typeof searchKey === "string" && arr.length === 4 && isStringNeeded) {
        return searchKey;
    }
    return undefined;
}

module.exports = {
    createUser,
    getAllUsers,
    getById,
    getByName,
    updateUser,
    deleteUser,
    getSearchKey
}

function validate(user) {
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

function getAllUsersInArray() {
    const data = fs.readFileSync('./db/users.json');
    let users;
    if (data.toString().length === 0) {
        users = [];
    } else {
        users = JSON.parse(data);
    }

    return users;
}