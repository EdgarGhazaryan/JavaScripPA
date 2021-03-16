const express = require('express');
const postRouter = express.Router();

const checkToken = require('../middlewares/tokenCheckHandler');
const imageUploader = require('../middlewares/imageUploader');

const PostController = require('../controllers/PostController');
const PostService = require('../services/PostService');

const postService = new PostService();
const postController = PostController(postService);

postRouter.get('/posts/public', postController.getPublicPosts);

postRouter.use('/posts*', checkToken);

postRouter.post('/posts', imageUploader.array('images', 5), postController.createPost);

postRouter.put('/posts/:id', imageUploader.array('images', 5), postController.updatePost);

postRouter.delete('/posts/:id', postController.deletePost);

postRouter.get('/posts', postController.getPostByDescription);

postRouter.get('/posts', postController.getPosts);

postRouter.get('/posts/top', postController.getTopPosts);

postRouter.get('/posts/:id', postController.getPost);


module.exports = postRouter;