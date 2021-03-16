const express = require('express');
const authRouter = express.Router();

const AuthenticationController = require('../controllers/AuthenticationController');
const AuthenticationService = require('../services/AuthenticationService');
const UserService = require('../services/UserService');

const userService = new UserService();
const authenticationService = new AuthenticationService();
const authenticationController = AuthenticationController(authenticationService, userService);

authRouter.post('/register', authenticationController.register);

authRouter.post('/login',  authenticationController.login);


module.exports = authRouter;