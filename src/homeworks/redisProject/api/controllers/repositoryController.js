const redis = require('redis');

const client = redis.createClient();

const getReposCount = (req, res, next) => {
    //here idk why bluebird.promisify doesn`t working, so i have to use callback)
    client.get(process.env.REDIS_REPOS_COUNT_KEY, (err, data) => {
        if(err) {
            return next("Error while reading from redis");
        }
        return res.json({
            repository_count: data || 0
        });
    });
}

module.exports = {
    getReposCount
}