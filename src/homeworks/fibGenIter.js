const fibItr = {
    [Symbol.iterator]: () => {
        let first = 0, second = 1;

        return {
            next: () => {
                second = first + second;
                first = second - first;
                return {
                    value: first,
                    done: false
                };
            }
        }
    }
}

function* fibGen(n) {
    let first = 0, second = 1;

    while (second <= n) {
        second = first + second;
        first = second - first;
        yield first;
    }
}


for (const x of fibItr) {
    if (x > 17) {
        break;
    }
    console.log(x);
}

console.log();

for (const x of fibGen(17)) {
    console.log(x);
}