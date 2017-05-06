var express = require('express')
var router = express.Router()
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

var User = require('../models/user-model.js')

//Register
router.get('/register', (req, res) => {
  res.render('register')
})

//login
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/register', (req, res) => {
  var name = req.body.name
  var username = req.body.username
  var email = req.body.email
  var password = req.body.password
  var password2 = req.body.password2

  //Validation
  req.checkBody('name', 'Name is required').notEmpty()
  req.checkBody('email', 'Email is required').notEmpty()
  req.checkBody('email', 'Email is not valid').isEmail()
  req.checkBody('username', 'Username is required').notEmpty()
  req.checkBody('password', 'Password is required').notEmpty()
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password)



  var errors = req.validationErrors()

  if (errors) {
    res.render('register', { errors: errors })
  } else {
    // Add to database
    var newUser = new User({
      name: name,
      username: username,
      email: email,
      password: password
    })
    User.createUser(newUser, (err, user) => {
      if (err) throw err
      console.log(user)
    })
    req.flash('success_msg', 'You are successfully registered')
    res.redirect('/users/login')
  }
})


passport.use(new LocalStrategy(
  function(username, password, done) {
    // Get User
    User.getUserByUsername(username, (err, user) => {
      if (err) throw err
      if (!user) return done(null, false, { message: 'Unknown User' })

      // Check Password
      User.comparePassword(password, user.password, (err, isMatch) => {
        if (err) throw err
        if (isMatch) return done(null, user)
        else return done(null, false, { message: 'Invalid Password' })
      })
    })
  }
))

passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user)
  })
})

// http://passportjs.org/docs
router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/login', failureFlash: true }), (req, res) => {
  console.log("LOGIN!")
  res.redirect('/')
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg','Successfully logged out')
  res.redirect('/users/login')
})


module.exports = router
