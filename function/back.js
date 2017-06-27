function f1(cb) {

    setTimeout(() => {
        cb(300);
    }, 300);
}

function f2(cb) {

    setTimeout(() => {
        cb(200);
    }, 200);
}

function f3(cb) {

    setTimeout(() => {
        cb(100);
    }, 100);
}

f1(rs => {
    console.log(`m-am apelat peste ${rs} ms`);
    f2(rs => {
        console.log(`m-am apelat peste ${rs} ms`);
        f3(rs => {
            console.log(`m-am apelat peste ${rs} ms`);
        });
    });
});



