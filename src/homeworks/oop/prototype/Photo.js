function Photo(url, height, breadth) {
    this.url = url;
    this.height = height;
    this.breadth = breadth;
}

Photo.prototype.print = function () {
    console.log(`Url: ${this.url}
    height: ${this.height}, breadth: ${this.breadth}`);
}