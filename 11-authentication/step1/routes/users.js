var express = require('express')
var router = express.Router()

//Register
router.get('/register', (req, res, next) => {
  res.render('register')
})

//login
router.get('/login', (req, res, next) => {
  res.render('login')
})

module.exports = router