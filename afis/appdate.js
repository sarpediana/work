const request = require('request');
let mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect('mongodb://127.0.0.1/test');
let db = mongoose.connection;
//let Schema = mongoose.Schema;
let City = mongoose.model('City', {
    city: mongoose.Schema.Types.Mixed
});
or = "Chisinau";
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

myRequest('http://api.openweathermap.org/data/2.5/weather?q=' + or + api_key)
    .then(rs => {
        City.find({ 'city.name': rs.nume }, function (err, res) {
            if (res.lenght === 0) {
                ft_save();
                console.log("SAVE");
            }
            else{
                ft_find(res[0]._id);
                console.log("UPDATE");
            }
        })

        function ft_save() {
            let dr = new City({ city: rs })
            dr.save()
                .then(rs => {
                    db.close();
                })
        }
        function ft_find() {
            City.findByIdAndUpdate(id, { $set: { city: rs } }, function (err, ress) {
                console.log("Update")
            })
        }
    })