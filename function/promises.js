function f1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(300);
        }, 300);
    });
}

function f2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // resolve(200);
            reject('error');
        }, 200);
    });
}

function f3() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(100);
        }, 100);
    });
}

f1()
    .then((rs) => {
        console.log(`m-am apelat peste ${rs} ms`);
        return f2();
    })
    .then((rs) => {
        console.log(`m-am apelat peste ${rs} ms`);
        return f3();
    })
    .then((rs) => {
        console.log(`m-am apelat peste ${rs} ms`);
        return 'am finisat'
    })
    .then((rs) => {
        console.log(`${rs}`);
    })
    .catch(err => {
        console.log(`msg error: ${err}`)
    })