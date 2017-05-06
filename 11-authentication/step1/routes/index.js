var express = require('express')
var router = express.Router()

// Homepage
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Dashboard' })
})

module.exports = router