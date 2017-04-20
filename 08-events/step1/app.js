var express = require('express')
var path = require('path')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

// Routes
var index = require('./routes/index')
var port = 8080

var app = express()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: false
}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found')
	err.status = 404
	next(err)
})

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.render('error')
})

module.exports = app

var server = app.listen(port, function() {
	console.log('App listening at port: ' + port)
})

// -------------------------------------------------------------------
// Create homeService
// -------------------------------------------------------------------
var houseName = 'D12'
var HomeService = require('./module/smart-home.js')
var homeService = new HomeService(houseName) // Async event
homeService.init() // start the service

// add an 'started' event listener
homeService.on('started', function(res) {
	console.log(`Turned on : ${res}`)
})

homeService.on('stopped', function(res) {
	console.log(`Turned off : ${res}`)
})

// Simulate user initiated action
setTimeout(function() {
	// device object
	var device = {
		room: 'garage',
		appliance: 'lights'
	}

	homeService.toggle(device, function(err, device) {
		console.log(device)
		if (err === null) {
			console.log(`Done toggling ${device.room}'s ${device.appliance}'`)
		}
	})
}, 3000)
