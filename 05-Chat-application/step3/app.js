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

var params = require('./models/mongo.js')
var MsgParam = new params.MsgParam()

// Debugging Mode to reset collection
// MsgParam.remove(function(err, removed) {
//   console.log("RESET COLLECTION")
// })

var io = require('socket.io').listen(server)
io.sockets.on('connection', function(socket) {
	console.log('User connected')

	// Send Last 10 messages
	sendHistory(socket)

	socket.on('msgFromUser', function(msg) {
		// Save message
		addMsg(msg, function(err, data) {
			if (err) {
				console.error('Error in saving message: ' + err)
			} else {
				// send to everyone except self
				socket.broadcast.emit('msgFromFriend', msg)
			}
		})
	})

	socket.on('disconnect', function() {
		console.log('user disconnected')
	})
})

function addMsg(msg, callback) {
	var newMsg = new MsgParam(msg)
	newMsg.save(function(err) {
		if (err) callback(err, null)
		else callback(null, 'saved message')
	})
}

function sendHistory(socket, callback) {
	MsgParam.find({
		// 'from': socketId
	}).sort('-date').limit(10).exec(function(err, msg) {
		if (!err) {
			for (var i = 0; i < msg.length; i++) {
				socket.emit('msgFromFriend', msg[i])
			}
		}
	})
}
