const request = require('request');

function myRequest(url) {
    return new Promise((resolve, reject) => {
        request.get(url, { json: true }, (err, res, body) => {
            if (err) {
                return reject(err);
            }
            return resolve(body);
        });
    })
}


myRequest('https://api.ipify.org/?format=json')
    .then(rs => {
        console.log(rs);
        return myRequest(`https://freegeoip.net/json/${rs.ip}`);
    })
    .then(rs => {
        console.log(rs);
    })
    .catch(err => {
        console.error(err);
    })