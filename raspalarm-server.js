var express = require('express');
var mongodb = require('mongodb');

var app = express();
var MongoClient = mongodb.MongoClient;

const PORT = process.env.PORT || 5005;
const DB_URL = "mongodb://localhost:27017/raspalarm";

MongoClient.connect(DB_URL, function(err, db) {
  if (err) throw err;
  console.log("Connected to database !");
  db.close();
});

app.get('/', (req, res, next) => {
  res.send('Hello world !');
});

app.listen(PORT, () => {
  console.log('raspalrm-server listen on port : ' + PORT);
});