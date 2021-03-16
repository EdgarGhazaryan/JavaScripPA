module.exports = (postService) => {
    return {getPublicPosts, createPost, updatePost, deletePost, getPosts, getTopPosts, getPostByDescription, getPost};

    async function getPublicPosts(req, res, next) {
        try {
            const posts = await postService.getPosts(+req.query.offset, +req.query.limit);
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

    async function createPost(req, res, next) {
        try {
            const {description} = req.body;
            const images = req.files;
            const userId = req.userId;

            const post = {userId, description, images};

            await postService.createPost(post);

            return res.status(201).json({
                message: 'Post successfully created'
            });
        } catch (err) {
            console.log(err);
            return next({statusCode: 500, message: err.message});
        }
    }

    async function updatePost(req, res, next) {
        try {
            const {description} = req.body;
            const images = req.files;
            const postId = req.params.id;

            const isOwnPost = await postService.isOwnPost(req.userId, postId);
            if(!isOwnPost) {
                return next({statusCode: 403, message: 'This is not your post'});
            }

            const post = {description, images};
            const isUpdated = await postService.updatePostById(postId, post);
            if(isUpdated) {
                return res.status(200).json({message: 'Post successfully updated'});
            }

            return next({statusCode: 400, message: 'Invalid id'});
        } catch (err) {
            console.log(err);
            return next({statusCode: 500, message: err.message});
        }
    }

    async function deletePost(req, res, next) {
        try {
            const userId = req.userId;
            const postId = req.params.id;

            const isOwnPost = await postService.isOwnPost(userId, postId);
            if(!isOwnPost) {
                return next({statusCode: 403, message: 'This is not your post'});
            }

            await postService.deletePostById(postId);

            return res.status(200).json({
                message: 'Post successfully deleted'
            });
        } catch (err) {
            console.log(err);
            return next({statusCode: 500, message: err.message});
        }
    }

    async function getPosts(req, res, next) {
        try {
            const posts = await postService.getPostsByUserId(req.userId, +req.query.offset, +req.query.limit);
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

    async function getTopPosts(req, res, next) {
        try {
            const posts = await postService.getPosts(+req.query.offset, +req.query.limit);
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

    async function getPostByDescription(req, res, next) {
        try {
            const description = req.query.description;
            if(!description) {
                return next();
            }

            const posts = await postService.getPostsByDescription(description, +req.query.offset, +req.query.limit);
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

    async function getPost(req, res, next) {
        try {
            const id = req.params.id;

            const post = await postService.getPostById(id);
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
};