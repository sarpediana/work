const request = require('request');
let mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect('mongodb://127.0.0.1/test');
let db = mongoose.connection;
//let Schema = mongoose.Schema;
let City = mongoose.model('City', {
    city: mongoose.Schema.Types.Mixed
});

let api_key = '&APPID=a93434c38f1494a20688ce47721c1ea7';

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

myRequest('http://api.openweathermap.org/data/2.5/weather?q=Bucharest' + api_key)
    .then(rs => {
        console.log(rs);
        let dr = new City({ city: rs })
        dr.save()
            .then(rs => {
                console.log('save');
                db.close();
            })
    })
    .catch(err => {
        console.error(err);
    })

