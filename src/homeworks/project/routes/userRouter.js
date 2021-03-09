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

userRouter.put('/users', checkToken, userController.updateUser.bind(userController));

userRouter.get('/users', checkToken, userController.getUserByUsername.bind(userController));

userRouter.get('/users/:id', checkToken, userController.getUserById.bind(userController));

userRouter.get('/users/:id/posts', checkToken, userController.getUserPosts.bind(userController));


module.exports = userRouter;