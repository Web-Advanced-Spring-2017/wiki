var util = require("util")
var EventEmitter = require('events').EventEmitter

function homeService(houseName) {
  var self = this
  console.log(`Starting ${houseName}`) // Async event
}

homeService.prototype.init = function() {
  var self = this
  setTimeout(() => {
    self.emit('started', 'Lights')
    self.emit('started', 'Heating')
    self.emit('stopped', 'camera-hallway')
    self.emit('stopped', 'camera-kitchen')
  }, 10)
}

homeService.prototype.toggle = function(device) {
  return new Promise((resolve, reject) => {
    //Do something
    console.log(`toggling ${device.room}'s ${device.appliance}`)
    setTimeout(() => {
        resolve(device)
      }, 2000)
      // Add a reject condition if something goes wrong.
  })
}

// extend the EventEmitter class using our home class
util.inherits(homeService, EventEmitter)

module.exports = homeService
