class PostController {
    constructor(postService) {
        this.postService = postService;
    }

    async getPublicPosts(req, res, next) {
        try {
            const posts = await this.postService.getPosts(+req.query.offset, +req.query.limit);
            if(posts) {
                return res.status(200).json({
                    message: 'Posts successfully found',
                    data: posts
                });
            }

            return next({statusCode: 400, message: 'Posts not found'});
        } catch (err) {
            console.log(err);
            return next({statusCode: 500, message: err.message});
        }
    }

    async createPost(req, res, next) {
        try {
            const {description} = req.body;
            const images = req.files;
            const userId = req.userId;

            const post = {userId, description, images};

            await this.postService.createPost(post);

            return res.status(201).json({
                message: 'Post successfully created'
            });
        } catch (err) {
            console.log(err);
            return next({statusCode: 500, message: err.message});
        }
    }

    async updatePost(req, res, next) {
        try {
            const {description} = req.body;
            const images = req.files;
            const postId = req.params.id;

            const isOwnPost = await this.postService.isOwnPost(req.userId, postId);
            if(!isOwnPost) {
                return next({statusCode: 403, message: 'This is not your post'});
            }

            const post = {description, images};
            const isUpdated = await this.postService.updatePostById(postId, post);
            if(isUpdated) {
                return res.status(200).json({message: 'Post successfully updated'});
            }

            return next({statusCode: 400, message: 'Invalid id'});
        } catch (err) {
            console.log(err);
            return next({statusCode: 500, message: err.message});
        }
    }

    async deletePost(req, res, next) {
        try {
            const userId = req.userId;
            const postId = req.params.id;

            const isOwnPost = await this.postService.isOwnPost(userId, postId);
            if(!isOwnPost) {
                return next({statusCode: 403, message: 'This is not your post'});
            }

            await this.postService.deletePostById(postId);

            return res.status(200).json({
                message: 'Post successfully deleted'
            });
        } catch (err) {
            console.log(err);
            return next({statusCode: 500, message: err.message});
        }
    }

    async getPosts(req, res, next) {
        try {
            const posts = await this.postService.getPostsByUserId(req.userId, +req.query.offset, +req.query.limit);
            if(posts) {
                return res.status(200).json({
                    message: 'Posts successfully found',
                    data: posts
                });
            }

            return next({statusCode: 400, message: `Your posts are not found`});
        } catch (err) {
            console.log(err);
            return next({statusCode: 500, message: err.message});
        }
    }

    async getTopPosts(req, res, next) {
        try {
            const posts = await this.postService.getPosts(+req.query.offset, +req.query.limit);
            if(posts) {
                return res.status(200).json({
                    message: 'Posts successfully found',
                    data: posts
                });
            }

            return next({statusCode: 400, message: 'Posts not found'});
        } catch (err) {
            console.log(err);
            return next({statusCode: 500, message: err.message});
        }
    }

    async getPostByDescription(req, res, next) {
        try {
            const description = req.query.description;
            if(!description) {
                return next();
            }

            const posts = await this.postService.getPostsByDescription(description, +req.query.offset, +req.query.limit);
            if(posts) {
                return res.status(200).json({
                    message: 'Posts successfully found',
                    data: posts
                });
            }

            return next({statusCode: 400, message: 'Posts not found'});
        } catch (err) {
            console.log(err);
            return next({statusCode: 500, message: err.message});
        }
    }

    async getPost(req, res, next) {
        try {
            const id = req.params.id;

            const post = await this.postService.getPostById(id);
            if(post) {
                return res.status(200).json({
                    message: 'User successfully found',
                    data: post
                });
            }

            return next({statusCode: 400, message: `Post with id ${id} not found`});
        } catch (err) {
            console.log(err);
            return next({statusCode: 500, message: err.message});
        }
    }
}


module.exports = PostController;