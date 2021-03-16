module.exports = (userService, authenticationService, postService) => {
    return {updateUser, getUserByUsername, getUserById, getUserPosts};

    async function updateUser(req, res, next) {
        try {
            const {username, email, password} = req.body;
            const user = {
                username: username || null,
                email: email || null,
                password: password || null,
            }

            let validationMessage = await authenticationService.validate(user);
            if (validationMessage) {
                return next({statusCode: 400, message: validationMessage});
            }

            const isUpdated = await userService.updateUserById(req.userId, user);
            if(isUpdated) {
                return res.status(200).json({message: 'User info successfully updated'});
            }

            return next({statusCode: 400, message: 'Invalid id'});
        } catch (err) {
            console.log(err);
            return next({statusCode: 500, message: err.message});
        }
    }

    async function getUserByUsername(req, res, next) {
        try {
            const username = req.query.username;
            if(!username) {
                return next({statusCode: 400, message: 'Please mention username'});
            }

            const user = await userService.getUsersByName(username);
            if(user) {
                return res.status(200).json({
                    message: 'Users successfully found',
                    data: user
                });
            }

            return next({statusCode: 400, message: `Users with username ${username} not found`});
        } catch (err) {
            console.log(err);
            return next({statusCode: 500, message: err.message});
        }
    }

    async function getUserById(req, res, next) {
        try {
            const id = req.params.id;

            const user = await userService.getUserById(id);
            if(user) {
                return res.status(200).json({
                    message: 'User successfully found',
                    data: user
                });
            }

            return next({statusCode: 400, message: `User with id ${id} not found`});
        } catch (err) {
            console.log(err);
            return next({statusCode: 500, message: err.message});
        }
    }

    async function getUserPosts(req, res, next) {
        try {
            const userId = req.params.id;

            const posts = await postService.getPostsByUserId(userId, +req.query.offset, +req.query.limit);
            if(posts) {
                return res.status(200).json({
                    message: 'Posts successfully found',
                    data: posts
                });
            }

            return next({statusCode: 400, message: `Posts with user id ${userId} not found`});
        } catch (err) {
            console.log(err);
            return next({statusCode: 500, message: err.message});
        }
    }
};