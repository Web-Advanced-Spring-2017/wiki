var Promise = require('bluebird')

module.exports = function() {
	return new Promise(function(resolve, reject) {
		tradiationCallbackFunction(function(error, data) {
			if (error) {
				reject(error)
			} else {
				resolve(data)
			}
		})
	})
}

function tradiationCallbackFunction(callback) {
	if (true) {
		callback(null, 1)
	} else {
		callback('error', null)
	}
}
