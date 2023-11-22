const PENDING = 0;
const FULFILLED = 1;
const REJECTED = 2;

function CustomPromise(executor) {
    let state = PENDING;
    let value = null;
    let handlers = [];
    let catches = [];

    function resolve(result) {
        if (state === PENDING) {
            state = FULFILLED;
            value = result;
            handlers.forEach(handlerFn => handlerFn(value));
        }
        return;
    }

    function reject(error) {
        if (state = PENDING) {
            state = REJECTED;
            value = error;
            catches.forEach(catchFn => catchFn(value));
        }
        return;
    }

    this.then = function (callback) {
        if (state === FULFILLED) {
            callback(value);
        } else {
            handlers.push(callback);
        }
        // returns a Promise!

    };

    executor(resolve, reject);
}

const doWork1 = (res, rej) => {
    setTimeout(() => res('Work 1'), 1000);
};

const doWork2 = (res, rej) => {
    setTimeout(() => res('Work 2'), 3000);
};

// let someText = new CustomPromise(doWork1);
let someText = new Promise(doWork1);

someText.then(function (value) {
    console.log(value);
    return new Promise(doWork2);
})
    .then(function (value) {
        console.log(value);
    });