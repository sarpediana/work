let express = require('express');
let app = express();
let path = require('path');
let bodyParser = require('body-parser');

let ArticleModel = require('./libs/mongoose').ArticleModel;

app.use(bodyParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(function (req, res, next) {
    console.log('middleware apelat');
    next();
});

app.get('/api', function (req, res) {
    res.send('API is running');
});

app.get('/api/articles', function (req, res, next) {
    ArticleModel.find({})
        .then(rs => {
            res.json(rs);
        })
        .catch(err => {
            next(err);
        });
});

app.post('/api/articles', function (req, res) {
    var article = new ArticleModel({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        images: req.body.images
    });

    article.save()
        .then((err) => {
            if (!err) {
                console.log("article created");
                return res.send({ status: 'OK', article: article });
            } else {
                console.log(err);
                if (err.name == 'ValidationError') {
                    res.status(400).send({ error: 'Validation error' });
                } else {
                    res.status(500).send({ error: 'Server error' });
                }
                console.log('Iternal error (%d): %s', res.statusCode, err.message);
            }
        });
});

app.get('/api/articles/:id', function (req, res) {
    return ArticleModel.findByID(req.parms.id)
        .then(function (err, article) {
            if (!article) {
                res.statusCode = 404;
                return res.send({ error: 'Not found' });
            }
            if (!err) {
                return res.send({ status: 'OK', article: article });
            } else {
                res.statusCode = 500;
                lod.error('Internal error(%s): %s', res.status, err.message);
                return res.send({ error: 'Server error' });
            }

        });
});

app.put('/api/articles/:id', function (req, res) {
    return ArticleModel.findByID(req.parms.id)
        .then(function (err, article) {
            if (!article) {
                res.statusCode = 404;
                return res.send({ error: 'Not found' });
            }
            article.title = req.body.title;
            article.description = req.body.description;
            article.author = req.body.author;
            article.images = req.body.images;
            return article.save()
                .then(function (err) {
                    if (!err) {
                        console.log("article updated");
                        return res.send({ status: "OK", article: article });
                    } else {
                        if (err.name == 'ValidationEror') {
                            res.statusCode = 400;
                            res.send({ error: 'Server error' });
                        }
                        console.log('Internal error (%d):%s', res.statusCode, err.message);
                    }
                });
        });
});

app.delete('./api/articles/:id', function (req, res) {
    return ArticleModel.findByID(req.parms.id)
        .then(function (err, article) {
            if (!article) {
                res.statusCode = 404;
                return res.send({ error: 'Not found' });
            }
            return article.remove()
                .then(function (err) {
                    if (!err) {
                        console.log("article removed");
                        return res.send({ status: 'OK' });
                    } else {
                        res.statusCode = 500;
                        console.log('Internal error(%d): %s', res.statusCode, err.message);
                        return res.send({ error: 'Server error' });
                    }
                });
        });
});


app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    console.log('Internal error(%d): %s', res.statusCode, err.message);
    res.send({ error: err.message });
    return;
});
app.listen(1337, function () {
    console.log('Express server listening on port 1337');
});