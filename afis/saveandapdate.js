const request = require('request');
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
mongoose.Promise = Promise;
mongoose.connect('mongodb://127.0.0.1/test')
    , Schema = mongoose.Schema;
let db = mongoose.connection;

var City = mongoose.model('city', {
    city: Schema.Types.Mixed
})
let api_key = '&APPID=a93434c38f1494a20688ce47721c1ea7';
let loc = 'Bucharest';
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
myRequest('http://api.openweathermap.org/data/2.5/weather?q='+loc+api_key)
    .then(res => {
        City.find({ "city.name": res.name }, function (err, ress) {
            if (ress.length === 0) {
                let data_to_create = new City({ city: res });
                data_to_create.save()
                    .then(res => {
                        console.log('SAVE');
                        db.close();
                    })
            } else {
                City.findByIdAndUpdate(ress[0]._id, { $set: { city: res } }, function (err, ress) {
                    console.log("UPDATE")
                    db.close();
                })





                
            }
        })
    })
    .catch(err => {
        console.error(err);
        db.close();
    })

