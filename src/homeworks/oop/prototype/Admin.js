function Admin(name) {
    User.call(this, name);
}

Admin.prototype = Object.create(User.prototype);
Admin.prototype.constructor = Admin;

Admin.prototype.setGoldAccount = function (user) {
    user.isGoldAccount = true;
}