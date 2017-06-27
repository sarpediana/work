const cheerio = require('cheerio')
const request = require('request')
const data = [];
let page=0;
function getArray(page, cb) {
    request('https://torrentsmd.com/browse.php?categtags=95&page=' + page, function (err, response, html) {

       cb(err, html);
        console.log(data);
    });
}
getArray(page, function cb (err, rs) {
    if (err) {
        getArray(page)
    } else {
        const $ = cheerio.load(rs);
        $('.tableTorrents tr').each(function (i, elem) {
            data.push(
                {
                    Nume: $(this).children().eq(1).text(),
                    IncarcatDe: $(this).children().eq(9).text()
                })
        })
        page++;
        getArray(page);
    }
})