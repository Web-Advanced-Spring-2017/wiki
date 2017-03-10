var request = require('request-promise')

// Data for query
var queryData = {
	'msg': 'Hello World!',
	'demo': 'web-advanced'
}

// Options for GET
// var options = {
//   method: 'GET',
//   uri: 'http://httpbin.org/get',
//   qs: queryData
// }

// Options for POST
var options = {
	method: 'POST',
	uri: 'http://httpbin.org/post',
	qs: queryData,
	headers: {
		// Any authorization
		// 'User-Agent': 'xyz',
		// 'Authorization': 'Passphrase'
	}
}

request(options)
	.then(function(response) {
		// Request was successful, use the response object at will
		console.log(response)
	})
	.catch(function(err) {
		// Something bad happened, handle the error
		console.log(err)
	})
