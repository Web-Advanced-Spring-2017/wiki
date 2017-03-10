var http = require('http')
var querystring = require('querystring')

// querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' })
// // returns 'foo=bar&baz=qux&baz=quux&corge='

// Dummy queries : https://httpbin.org

// Data for POST
var formData = querystring.stringify({
	'msg': 'Hello World!',
	'demo': 'web-advanced'
})
console.log(`FormData Query = ${formData}`)

// Config the options
var options = {
	hostname: 'httpbin.org',
	port: 80,
	// path: '/post',
	// method: 'POST',
	path: `/get?${formData}`,
	method: 'GET',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Content-Length': Buffer.byteLength(formData)
	}
}

// prepare the request
var req = http.request(options, function(res) {
	// Manage the response
	console.log(`STATUS: ${res.statusCode}`)
	console.log(`HEADERS: ${JSON.stringify(res.headers)}`)
	res.setEncoding('utf8')

	// Stream the response.
	var body = ''
	res.on('data', function(chunk) {
		body += chunk
	})

	// Terminate the stream
	res.on('end', function() {
		console.log(body)
	})
})

req.on('error', function(e) {
	console.log(`problem with request: ${e.message}`)
})

// write data to request body. Make the request
req.write(formData)
req.end()
