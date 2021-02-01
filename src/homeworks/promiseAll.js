function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        let result = [];
        let countOfThen = 0;

        for (let i = 0; i < promises.length; ++i) {
            promises[i]
                .then(res => {
                    result[i] = res;
                    countOfThen++;
                    if(countOfThen === promises.length) {
                        resolve(result);
                    }
                })
                .catch((err) => {
                    reject(err);
                    return; // Նաիրի ջան ստեղ էս return—ը գրել եմ, որ եթե մի անգամ մտնի catch, էլ չաշխատի,
                            // բայց համ WebStorm-նա ասում անիմաստա էս return-ը, համ էլ debug եմ անում ոնց որ չի օգնում
                            // էս պահը միքիչ լավ չեմ պատկերացնում
                });
        }
    });
}

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("P1");
    }, 1000);
});
const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("P2")
    }, 1000);
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

promiseAll([p1, p2, p3, p4])
    .then((res) => console.log(res))
    .catch((err) => console.log(err));