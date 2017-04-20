var HomeService = require('./smart-home.js')

function eventManager(server) {
	var houseName = 'D12'
	var homeService = new HomeService(houseName)

	var io = require('socket.io').listen(server)
	io.sockets.on('connection', function(socket) {
		console.log('User connected')
			// Start Home service
		homeService.init()
	})

	// add an 'started' event listener
	homeService.on('started', function(res) {
		io.emit('pipe', `Turned on : ${res}`)
	})

	homeService.on('stopped', function(res) {
		io.emit('pipe', `Turned off : ${res}`)
	})

	// Simulate user initiated action
	setTimeout(function() {
		var device = {
			room: 'garage',
			appliance: 'lights'
		}

		homeService.toggle(device)
			.then((device) => {
				console.log(`Done toggling ${device.room}'s ${device.appliance}'`)
				io.emit('pipe', `Done toggling ${device.room}'s ${device.appliance}'`)
			})
			.catch((err) => {
				console.log(err)
			})
	}, 3000)
}

module.exports = eventManager
