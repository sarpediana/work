var express = require('mongoose');
var mongoose = require('mongoose');
var app = express();

var mongoose = require('mongoose').MongoClient;
let db = mongoose.connection;

// Initialize connection once
mongoose.connect('mongodb://127.0.0.1/test', function(err, database) {
  if(err) throw err;

  db = database;

  // Start the application after the database connection is ready
  app.listen(3000);
  console.log("Listening on port 3000");
});

// Reuse database object in request handlers
app.get("/", function(req, res) {
  db.collection("replicaset_mongo_client_collection").find({}, function(err, docs) {
    docs.each(function(err, doc) {
      if(doc) {
        console.log(doc);
      }
      else {
        res.end();
      }
    });
  });
});