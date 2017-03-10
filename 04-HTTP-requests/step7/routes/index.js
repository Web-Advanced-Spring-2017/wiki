var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Form Demo'
	})
})

// Handle POST Request
router.post('/post', function(req, res, next) {
	console.log(req.body)
	res.send((req.body))
})

// Handle GET Request
router.get('/get', function(req, res, next) {
	console.log(req.query)
	res.send('GET form data: ' + JSON.stringify(req.query))
})

module.exports = router
