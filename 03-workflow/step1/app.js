var express = require('express');
var logger = require('morgan');
var path = require('path');

var app = express();
var port = 8080;

app.use(logger('dev'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var server = app.listen(port, function () {
   console.log("App listening at port: "+ port);
});
