const express = require('express');
const authRouter = express.Router();

const AuthenticationController = require('../controllers/AuthenticationController');
const AuthenticationService = require('../services/AuthenticationService');
const UserService = require('../services/UserService');

const userService = new UserService();
const authenticationService = new AuthenticationService();
const authenticationController = new AuthenticationController(authenticationService, userService);

authRouter.post('/register', authenticationController.register.bind(authenticationController));

authRouter.post('/login',  authenticationController.login.bind(authenticationController));


module.exports = authRouter;