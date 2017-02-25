var express = require('express');
var logger = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var parser = require('rss-parser');


var app = express();
var port = 8080;

app.use(logger('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})); // for parsing
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.set('views', path.join(__dirname, 'views')); // view engine setup
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

//Feed URL: http://www.huffingtonpost.com/feeds/verticals/arts/index.xml
//Encoded URL: http%3A%2F%2Fwww.huffingtonpost.com%2Ffeeds%2Fverticals%2Farts%2Findex.xml

app.post('/feed', function(req, res, next) {
  var feed = getFeed(req.body, function(err, feed) {
    res.send(feed);
  });
});

var server = app.listen(port, function() {
  console.log("App listening at port: " + port);
});

function getFeed(data, callback) {
  var url = decodeURI(data.url);
  parser.parseURL(url, function(err, parsed) {
    if (!err) {
      callback(null, parsed.feed);
    } else {
      console.log(err);
      callback(err, null);
    }
  });
}
