const fs = require('fs').promises;
const path = require('path');

const Post = require('../models/Post');

class PostService {
    constructor() {}

    async createPost(post) {
        const {userId, description, images} = post;

        const newPost = new Post({
            userId,
            description,
            images: (images || []).map(i => '/uploads/images/' + i.filename)
        });
        await newPost.save();
    }

    async deletePostById(postId) {
        const post = await Post.findById(postId);

        for(const image of post.images) {
            await fs.unlink(path.resolve(image.substring(1)));
        }
        await Post.findByIdAndDelete(postId);
    }

    async updatePostById(postId, post) {
        let {description, images} = post;
        images = (images || []).map(i => '/uploads/images/' + i.filename);
        const oldPost = await Post.findById(postId);
        if(!oldPost) {
            return false;
        }

        if(description) {
            oldPost.description = description;
        }
        if(images.length !== 0) {
            for(const image of oldPost.images) {
                await fs.unlink(path.resolve(image.substring(1)));
            }
            oldPost.images = images;
        }
        await oldPost.save();
        return true;
    }

    async getPostsByUserId(userId, offset, limit) {
        offset = offset || 0;
        limit = limit || 0;
        return await Post.find({userId: userId}, {__v: 0}).skip(offset).limit(limit).sort({createdDate: -1});
    }

    async getPostById(postId) {
        return await Post.findById(postId, {__v: 0});
    }

    async getPosts(offset, limit) {
        offset = offset || 0;
        limit = limit || 0;
        return await Post.find({}, {__v: 0}).skip(offset).limit(limit).sort({createdDate: -1});
    }

    async getPostsByDescription(text, offset, limit) {
        offset = offset || 0;
        limit = limit || 0;
        return await Post.find({$text: {$search: text}}, {__v: 0}).skip(offset).limit(limit).sort({createdDate: -1});
    }

    async isOwnPost(userId, postId) {
        const post = await Post.findById(postId);
        return post && post.userId === userId;
    }
}


module.exports = PostService;