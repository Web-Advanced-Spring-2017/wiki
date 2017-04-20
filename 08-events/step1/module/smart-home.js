var util = require('util')
var EventEmitter = require('events').EventEmitter

function homeService(houseName) {
	console.log(`Starting ${houseName}`) // Async event
}

homeService.prototype.init = function() {
	var self = this
	setTimeout(function() {
		self.emit('started', 'Lights')
		self.emit('started', 'Heating')
		self.emit('stopped', 'camera-hallway')
		self.emit('stopped', 'camera-kitchen')
	}, 10)
}

homeService.prototype.toggle = function(device, callback) {
	// Do something
	console.log(`toggling ${device.room}'s ${device.appliance}`)
		// self.emit(err,result)
	setTimeout(function() {
		callback(null, device)
	}, 2000)
}

// extend the EventEmitter class using our home class
util.inherits(homeService, EventEmitter)

module.exports = homeService
