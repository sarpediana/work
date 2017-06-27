const request = require('request');
const co = require('co');
const cheerio = require('cheerio');
let data = mongoose.model();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
function myFunc(page) {
    return new Promise((resolve, reject) => {
        request('https://torrentsmd.com/browse.php?categtags=95&page=' + page, function (err, rs, body) {
            if (err) {
                return reject(err);
            } else {
                const $ = cheerio.load(body);
                $('.tableTorrents tr').each(function (i, elem) {
                  data.push(
                        {
                            Nume: $(this).children().eq(1).text(),
                            IncarcatDe: $(this).children().eq(9).text()
                        })
                })
            }
            resolve(data);
        });
    });
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connection like!");
});


var Schema = mongoose.Schema({
    name: String,
    update: String
});

var date = mongoose.model('date', Schema);
co(function* () {
    for (let j = 0; j < 341; j++) {
        let x = yield myFunc(j);
        let rh = new Schema({ x });
        rh.save()
        .then(rs=>{
            console.log('salvat');
        })
    }
})