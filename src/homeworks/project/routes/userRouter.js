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
const userController = UserController(userService, authenticationService, postService);

userRouter.use('/users*', checkToken);

userRouter.put('/users', userController.updateUser);

userRouter.get('/users', userController.getUserByUsername);

userRouter.get('/users/:id', userController.getUserById);

userRouter.get('/users/:id/posts', userController.getUserPosts);


module.exports = userRouter;