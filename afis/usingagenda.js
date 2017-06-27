const request = require('request');
let mongoose = require('mongoose');
mongoose.Promise = Promise;
const Agenda = require('agenda');
let adr = 'mongodb://127.0.0.1/test';
let db = mongoose.connection;
agenda = new Agenda({
    db: {
        address: adr, collection: 'Agenda'
    }
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

    });
}

agenda.on('ready', function (job, done) {
    myRequest('http://samples.openweathermap.org/data/2.5/weather?q=Chisinau,md' + api_key)
        .then(rs => {
            console.log(rs);
            db.collection("Agenda").insert(rs, function (err, res) {
                if (err) throw err;
                console.log("1 record inserted");
                db.close();
            });
        })
        .catch(err => {
            console.error(err);
        })
    agenda.start();
})