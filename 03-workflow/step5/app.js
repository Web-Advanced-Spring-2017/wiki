var express = require('express')
var logger = require('morgan')
var path = require('path')
var bodyParser = require('body-parser')
var parser = require('rss-parser')

var app = express()
var port = 8080

app.use(logger('dev'))
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing
	// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' })
})

// Feed URL: http://www.huffingtonpost.com/feeds/verticals/arts/index.xml
// Encoded URL: http%3A%2F%2Fwww.huffingtonpost.com%2Ffeeds%2Fverticals%2Farts%2Findex.xml

// app.get('/feed/:url', function(req, res, next) {
//   var url = decodeURI(req.params.url)
//   parser.parseURL(url, function(err, parsed) {
//     parsed.feed.entries.forEach(function(entry) {
//       console.log(entry.title)
//     })
//   })
//   res.send("Check server console...")
// })

app.post('/feed', function(req, res, next) {
	console.log('body: ' + JSON.stringify(req.body))
	res.send('AJAX Test')
})

app.listen(port, function() {
	console.log('App listening at port: ' + port)
})
