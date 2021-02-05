function promisify(callback) {
    return function (...vararg) {
        return new Promise(((resolve, reject) => {
            callback(...vararg, (err, ...res) => {
                if (err !== null) {
                    return reject(err);
                }
                return resolve(res.length === 1 ? res[0] : res);
            });
        }));
    };
}