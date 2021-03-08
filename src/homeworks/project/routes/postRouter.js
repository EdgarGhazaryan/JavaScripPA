const express = require('express');
const postRouter = express.Router();

const checkToken = require('../middlewares/tokenCheckHandler');
const imageUploader = require('../middlewares/imageUploader');

const PostController = require('../controllers/PostController');
const PostService = require('../services/PostService');

const postService = new PostService();
const postController = new PostController(postService);

//As a guest user I want to see the blog/news without authorization
postRouter.get('/posts/public', postController.getPublicPosts.bind(postController));

//As a user I want to create a post
postRouter.post('/posts', [checkToken, imageUploader.array('images', 5)], postController.createPost.bind(postController));

//As a user I want to edit the posts
postRouter.put('/posts/:id', [checkToken, imageUploader.array('images', 5)], postController.updatePost.bind(postController));

//As a user I want to delete the posts
postRouter.delete('/posts/:id', checkToken, postController.deletePost.bind(postController));

//As a user I want to search post(by their description)
postRouter.get('/posts', checkToken, postController.getPostByDescription.bind(postController));

//As a user I want to get the list of my posts
postRouter.get('/posts', checkToken, postController.getPosts.bind(postController));

//As a user I want to get top recently created posts in the world
postRouter.get('/posts/top', checkToken, postController.getTopPosts.bind(postController));

//As a user I want to see/get individual post
postRouter.get('/posts/:id', checkToken, postController.getPost.bind(postController));


module.exports = postRouter;