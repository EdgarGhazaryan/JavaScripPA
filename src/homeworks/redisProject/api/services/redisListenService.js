const redis = require('redis');

const Repository = require('../models/Repository');

const subscriber = redis.createClient();
const client = redis.createClient();

const listenRedis = () => {
    subscriber.on('message', async (channel, message) => {
        const reposCount = await Repository.countDocuments();
        client.set(process.env.REDIS_REPOS_COUNT_KEY, reposCount);
    });

    subscriber.subscribe(process.env.REDIS_REPOS_CHANNEL);
}

module.exports = {
    listenRedis
}