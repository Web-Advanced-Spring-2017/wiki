var request = require('request')
	// https://github.com/request/request

// Data for query
var queryData = {
	'msg': 'Hello World!',
	'demo': 'web-advanced'
}

// --------------------------------------------------------
// GET Response
// --------------------------------------------------------
request({
	url: 'http://httpbin.org/get', // URL to hit
	qs: queryData, // Query string data
	method: 'GET', // Specify the method
	headers: {
		// 'Content-Type': 'application/x-www-form-urlencoded'
		// 'Custom-Header': 'Custom Value'
	}
}, function(error, response, body) {
	if (error) {
		console.log(error)
	} else {
		console.log('\n\n GET Response:')
		console.log(response.statusCode, JSON.parse(body)) // HTML content
	}
})

// --------------------------------------------------------
// POST Response
// --------------------------------------------------------
request({
	url: 'http://httpbin.org/post', // URL to hit
	qs: queryData, // Query string data
	method: 'POST', // Specify the method
	headers: {
		// 'Content-Type': 'application/x-www-form-urlencoded'
		// 'Custom-Header': 'Custom Value'
	}
}, function(error, response, body) {
	if (error) {
		console.log(error)
	} else {
		console.log('\n\n POST Response:')
		console.log(response.statusCode, JSON.parse(body)) // HTML content
	}
})

request({
	url: 'http://httpbin.org/post', // URL to hit
	qs: queryData, // Query string data
	method: 'POST', // Specify the method
	headers: {
		// 'Content-Type': 'application/x-www-form-urlencoded'
		// 'Custom-Header': 'Custom Value'
	}
}, function(error, response, body) {
	if (error) {
		console.log(error)
	} else {
		console.log('\n\n POST Response:')
		console.log(response.statusCode, JSON.parse(body)) // HTML content
	}
})

// --------------------------------------------------------
// Streams
// --------------------------------------------------------

var fs = require('fs')
var destination = fs.createWriteStream('./response.json')

request('http://httpbin.org/get')
	.pipe(destination)
	.on('error', function(error) {
		console.log(error)
	})
