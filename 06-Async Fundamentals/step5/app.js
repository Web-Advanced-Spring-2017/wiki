var Promise = require('bluebird')
	// http://bluebirdjs.com/docs/api/promisification.html
var fs = Promise.promisifyAll(require('fs'))
var mkdirp = Promise.promisifyAll(require('mkdirp'))

processJson()

function processJson() {
	var jsonContent = null // Private Scope

	// The promisified method name will be the original method name suffixed with suffix (default is 'Async').
	fs.readFileAsync('data/sample.json', 'utf8')
		// parse JSON
		.then((fileData) => {
			fileData = JSON.parse(fileData)
			return fileData
		})
		// Datatype check
		.then((jsonData) => {
			console.log('Data type is: ', typeof(jsonData))
			jsonContent = jsonData // Store it globally for now, before we check for directory
		})
		// Check directory exists
		.then(() => {
			// return fs.existsAsync('new-data')
			// Not recommended.
			// 1.Doesn't work well with Promisify
			// 2. Doing so introduces a race condition, since other processes may change the file's state between the two calls.
			return mkdirp.mkdirpAsync('new-data')
		})
		// Write to file
		.then(() => {
			var result = JSON.stringify(jsonContent)
			fs.writeFileAsync('new-data/message.txt', result)
			console.log('Wrote to file')
		})
		// Error O/P
		.catch((e) => {
			console.log('Error', e)
		})
}
