const cheerio = require('cheerio');
let request = require('request');

let target = "https://torrentsmd.com/browse.php?categtags=95";
let result = [];

let tabl = [];
function getPag(target) {
    request(target, function (err, response, body) {
        let $ = cheerio.load(body);
        $('.tableTorrents tr').each(function (i, elem) {
            result.push(
                {
                    name: $(this).children().eq(1).text(),
                    size: $(this).children().eq(5).text(),
                    update:$(this).children().eq(9).text()
                })
        })

        console.log(result);
    });
}

getPag(target);