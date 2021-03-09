const express = require('express');
const postRouter = express.Router();

const checkToken = require('../middlewares/tokenCheckHandler');
const imageUploader = require('../middlewares/imageUploader');

const PostController = require('../controllers/PostController');
const PostService = require('../services/PostService');

const postService = new PostService();
const postController = new PostController(postService);

postRouter.get('/posts/public', postController.getPublicPosts.bind(postController));

postRouter.post('/posts', [checkToken, imageUploader.array('images', 5)], postController.createPost.bind(postController));

postRouter.put('/posts/:id', [checkToken, imageUploader.array('images', 5)], postController.updatePost.bind(postController));

postRouter.delete('/posts/:id', checkToken, postController.deletePost.bind(postController));

postRouter.get('/posts', checkToken, postController.getPostByDescription.bind(postController));

postRouter.get('/posts', checkToken, postController.getPosts.bind(postController));

postRouter.get('/posts/top', checkToken, postController.getTopPosts.bind(postController));

postRouter.get('/posts/:id', checkToken, postController.getPost.bind(postController));


module.exports = postRouter;