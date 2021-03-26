const redis = require('redis');
const axios = require('axios');

const Repository = require('../api/models/Repository');

const publisher = redis.createClient();

// args[0] - search text
// args[1] - limit
// args[2] - page offset
const loadRepos = async (args) => {
    const search = args[0] || 'default';
    const limit = args[1] || 5;
    const offset = args[2] || 1;

    const url = `https://api.github.com/repositories?q=${search}&per_page=${limit}&page=${offset}`;
    const response = await axios.get(url);

    await Repository.deleteMany();

    for(const r of response.data) {
        const repo = new Repository({
            name: r.name,
            owner_name: r.owner.login,
            owner_id: r.owner.id,
            description: r.description,
            url: r.html_url,
            private: r.private
        });
        await repo.save();
    }

    publisher.publish(process.env.REDIS_REPOS_CHANNEL, 'repositories count updated');

    publisher.quit();
}

module.exports = {
    loadRepos
}