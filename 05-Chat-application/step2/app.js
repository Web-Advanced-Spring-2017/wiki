var express = require('express')
var path = require('path')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var config = require('./app-config.json')
var mongoose = require('mongoose')

// Routes
var index = require('./routes/index')

// HTTP Server Port
var port = 8080

var app = express()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Middleware
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

// Database Connection
var uristring = config.mongoLabUri // PRIVATE
mongoose.Promise = global.Promise // Native Promise (Without library)
mongoose.connect(uristring, function(err, res) {
	if (err) {
		console.log('ERROR connecting to: ' + uristring + '. ' + err)
	} else {
		console.log('Connected to DB')
	}
})

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
	console.log('DB connected')
})

var io = require('socket.io').listen(server)
io.sockets.on('connection', function(socket) {
	// .on(identifier, callback(data))      listens to
	// .emit(identifier, data)              sends data to every user
	// .broadcast.emit(identifier, data)    sends data to every user, except the newly created

	console.log('User connected')
	socket.emit('welcome', socket.id) // sending back a simple string
	io.sockets.emit('new-user', socket.id) // sending data to every user

	// io.sockets.emit -----will send to all the clients
	// socket.broadcast.emit -----will send the message to all the other clients except itself
	// http://stackoverflow.com/questions/10342681/whats-the-difference-between-io-sockets-emit-and-broadcast

	socket.on('msgFromUser', function(msg) {
		// send to everyone except self
		socket.broadcast.emit('msgFromFriend', msg)
	})

	socket.on('disconnect', function() {
		console.log('user disconnected')
	})
})
