var express = require('express')
var path = require('path')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

var expressValidator = require('express-validator')
var flash = require('connect-flash')
var session = require('express-session')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var mongo = require('mongodb')
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/auth', (err, res) => {
  if (err) {
    console.error('ERROR connecting to: Database' + err)
  } else {
    console.log('Connected to DB')
  }
})

var db = mongoose.connection

// Routes
var index = require('./routes/index')
var users = require('./routes/users')

var port = 8080

var app = express()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Express session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}))

//Passport-init
app.use(passport.initialize())
app.use(passport.session())

// Express-Validator
// https://github.com/ctavan/express-validator#middleware-options
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.'),
      root = namespace.shift(),
      formParam = root

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']'
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    }
  }
}))

//Connect Flash
app.use(flash())

//Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  res.locals.user = req.user || null    // if logged in 

  next()
})

app.use('/', index)
app.use('/users', users)

// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
  })
  // error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

var server = app.listen(port, () => {
  console.log("App listening at port: " + port)
})

module.exports = app
