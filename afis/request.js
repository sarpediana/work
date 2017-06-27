const cheerio = require('cheerio');
let request = require('request');

let target = "https://labs42.io/";

request(target, function (err, response, body) {
    let $ = cheerio.load(body);
    console.log(body);
});