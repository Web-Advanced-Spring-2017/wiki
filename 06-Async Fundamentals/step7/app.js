// http://blog.victorquinn.com/javascript-promise-while-loop

var Promise = require('bluebird')
var count = 0 // Number of images to download
var maxCount = 10

var promiseWhile = (condition, action) => { // action is a promise
	var resolver = Promise.defer()
	var loop = () => {
		if (condition()) return resolver.resolve() // Resolving escapes the loop
		else {
			return Promise.resolve(action()) // action: This is the async task to be performed, which itself should return a Promise.
				.then(loop)
				.catch(resolver.reject)
		}
	}
	loop()

	return resolver.promise
}

promiseWhile(() => {
	return (count > maxCount)	// Condition
}, () => {	// Action
	return new Promise((resolve, reject) => {
		console.log(count)
		count++
		setTimeout(() => {
			resolve()
		}, 500 * Math.random())
	})
}).then(() => {
	console.log('done')
})

// Assignment : Download image from https://unsplash.it/1500/1500/?random using request promise.
