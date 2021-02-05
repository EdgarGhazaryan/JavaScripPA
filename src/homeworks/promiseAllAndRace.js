function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        let result = [];
        let countOfThen = 0;
        let isRejected = false;

        for (let i = 0; i < promises.length; ++i) {
            promises[i]
                .then(res => {
                    if (!isRejected) {
                        result[i] = res;
                        countOfThen++;
                    }
                    if (countOfThen === promises.length) {
                        resolve(result);
                    }
                })
                .catch((err) => {
                    isRejected = true;
                    reject(err);
                });
        }
    });
}

function promiseRace(promises) {
    return new Promise((resolve, reject) => {
        let isDone = false;

        for (let i = 0; i < promises.length; ++i) {
            promises[i]
                .then(res => {
                    if(!isDone) {
                        isDone = true;
                        resolve(res);
                    }
                })
                .catch((err) => {
                    if(!isDone) {
                        isDone = true;
                        reject(err);
                    }
                });
        }
    });
}

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("P1");
    }, 2000);
});
const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("P2")
    }, 500);
});
const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("P3")
    }, 1000);
});
const p4 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("P4")
    }, 1000);
});

promiseRace([p1, p2, p3, p4])
    .then((res) => console.log(`then ${res}`))
    .catch((err) => console.log(`catch ${err}`));