var express = require('express')
var router = express.Router()

// Homepage
router.get('/', checkAuthentication, (req, res) => {
  res.render('index')
})

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {	// Passport takes care of it
    return next()
  } else {
    req.flash('error_msg','You are not logged in')
    res.redirect('/users/login')
  }
}

module.exports = router
