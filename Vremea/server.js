let express = require('express');
let app = express();
const request = require('request');
app.set('view engine', 'ejs');
let api_key = '&APPID=a93434c38f1494a20688ce47721c1ea7';

app.get('/:id', (req, res)=> {
    myRequest('http://api.openweathermap.org/data/2.5/forecast?id=' + req.params.id + api_key)
    .then(rs => {
         res.render('pages/Chisinau',{
             raspuns :rs
         });
         console.log(rs);
         })
    })

app.get('/', (req, res)=> {
    res.render('pages/index');
    
})

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

app.listen(8080);
console.log('8080 port');

