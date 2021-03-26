const express = require('express');
const mongoose = require('mongoose');

const RedisListenService = require("./services/redisListenService");

require('dotenv').config();

const app = express();

RedisListenService.listenRedis();

app.use(express.json());

app.use(require('./routes/repositoryRouter'));

const db = process.env.MongoURI;
const PORT = process.env.PORT || 8000;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB is connected');
        app.listen(PORT, () => {
            console.log("Server is running...");
        });
    })
    .catch(err => console.log(err));