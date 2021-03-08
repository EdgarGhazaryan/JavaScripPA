const express = require('express');
const userRouter = express.Router();

const checkToken = require('../middlewares/tokenCheckHandler');

const UserController = require('../controllers/UserController');
const UserService = require('../services/UserService');
const PostService = require('../services/PostService');
const AuthenticationService = require('../services/AuthenticationService');

const authenticationService = new AuthenticationService();
const postService = new PostService();
const userService = new UserService();
const userController = new UserController(userService, authenticationService, postService);

//As a user I want to edit my user information
userRouter.put('/users', checkToken, userController.updateUser.bind(userController));

//As a user I want to search other user by username
userRouter.get('/users', checkToken, userController.getUserByUsername.bind(userController));

//As a user I want to search other user by id
userRouter.get('/users/:id', checkToken, userController.getUserById.bind(userController));

//As a user I want to see the posts of an specific user
userRouter.get('/users/:id/posts', checkToken, userController.getUserPosts.bind(userController));


module.exports = userRouter;