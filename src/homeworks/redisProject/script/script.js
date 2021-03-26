const mongoose = require('mongoose');

const loadReposService = require('./loadReposService');

require('dotenv').config();

const db = process.env.MongoURI;
(async () => await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }))()

const args = process.argv.slice(2);
loadReposService.loadRepos(args).then(() => {
    console.log('Repositories loaded');
    mongoose.connection.close();
});