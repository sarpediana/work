
const request = require('request');
const co = require('co');
const cheerio = require('cheerio')
let mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect('mongodb://127.0.0.1/test');
let db = mongoose.connection;

const page = 0;


function myFunc(page) {
    return new Promise((resolve, reject) => {
        request('https://torrentsmd.com/browse.php?categtags=95&page=' + page, function (err, res, body) {
            if (err) {
                return reject(err);
            }
            else {

                let data = [];
                const $ = cheerio.load(body);
                $('.tableTorrents tr').each(function (i, elem) {
                    data.push(
                        {
                            Name: $(this).children().eq(1).text(),
                            update: $(this).children().eq(9).text()
                        })
                    console.log($(this).children().eq(1).text());
                })
                resolve(data);
            }
        });
    });
}


co(function* () {
    let arr = [];
    for (let i = 0; i < 10; i++) {
        console.log(i)
        arr = arr.concat(yield myFunc());
    }
        db.collection("myColection").insertMany(arr, function (err, res) {
            if (err) throw err;
            console.log("Nr. of records" + res.insertedCount);
            db.close();
    });
})