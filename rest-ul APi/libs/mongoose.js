let mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect('mongodb://127.0.0.1/test');
let db = mongoose.connection;

db.on('error', function (err) {
    console.log('connection error:', err.message);
});
db.once('open', function callback() {
    console.log("Connected to DB!");
});

let Schema = mongoose.Schema;

let Images = new Schema({
    kind: {
        type: String,
        enum: ['thumbnail', 'detail'],
        required: true
    },
    url: { type: String, required: true }
});

let Article = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    images: [Images],
    modified: { type: Date, default: Date.now }
});


Article.path('title').validate(function (v) {
    return v.length > 5 && v.length < 70;
});


var ArticleModel = mongoose.model('Article', Article);

module.exports.ArticleModel = ArticleModel;
