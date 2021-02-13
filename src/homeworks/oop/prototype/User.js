function User(name) {
    this.name = name;
    this.followers = new Set();
    this.following = new Set();
    this.posts = new Set();
    this.likes = new Set();
    this.isGoldAccount = false;
}

User.prototype.follow = function (user) {
    this.following.add(user);
    user.followers.add(this);
}

User.prototype.unfollow = function (user) {
    if(following.has(user)) {
        this.following.add(user);
        user.followers.delete(this);
    }
}

User.prototype.post = function (newPost) {
    this.posts.add(newPost);
}

User.prototype.deletePost = function (post) {
    if(this.posts.has(post)) {
        this.posts.delete(newPost);
    }
}

User.prototype.like = function (post) {
    post.likes++;
    this.likes.add(post);
}