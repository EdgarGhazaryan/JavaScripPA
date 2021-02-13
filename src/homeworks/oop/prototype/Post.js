function Post(photo, description) {
    this.photo = photo;
    this.description = description;
    this.likes = 0;
}

Post.prototype.print = function () {
    this.photo.print();
    console.log(this.description);
}