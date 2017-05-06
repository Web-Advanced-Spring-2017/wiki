var express = require('express')
var router = express.Router()

var user = require('../models/user-model.js')

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
    var newUser = new user({
      name: name,
      username: username,
      email: email,
      password: password
    })
    user.createUser(newUser, (err, user) => {
      if (err) throw err
      console.log(user)
    })
    req.flash('success_msg','You are successfully registered')
    res.redirect('/users/login')
  }
})

module.exports = router
