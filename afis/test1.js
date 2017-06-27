const request = require('request');
let data = [];
const Agenda = require('agenda');
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
mongoose.Promise = Promise;
mongoose.connect('mongodb://127.0.0.1/meteo');
let db = mongoose.connection;
var agenda = new Agenda();

agenda
    .database('localhost:27017/agenda-test', 'agendaJobs')
    .processEvery('3 minutes')
    .maxConcurrency(5)
    .lockLimit(0);

agenda.on('ready', function () {
    agenda.start();
});

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
// agenda.define('printAnalyticsReport', function (job, done) {
//     User.doSomethingReallyIntensive(funcion(err, users){
//         hippy();
        
//    }
// })

agenda.every('5 minutes', 'printAnalyticsReport');

function hippy() {
    myRequest('http://samples.openweathermap.org/data/2.5/weather?id=618426,uk&appid=b1b15e88fa797225412429c1c50c122a1')
        .then(data => {
            db.collection("customers").insert(data, function (err, res) {
                if (err) throw err;
                console.log("Inscriere reusita!");
                db.close();
            })
        })
        .catch(err => {
            console.error(err);
            db.close();
        })
}