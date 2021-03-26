const mongoose = require('mongoose');

const RepoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner_name: {
        type: String,
        required: true
    },
    owner_id: {
        type: Number,
        required: true
    },
    description: String,
    url: {
        type: String,
        required: true
    },
    private: Boolean
});

const Repository = mongoose.model('Repository', RepoSchema);

module.exports = Repository;