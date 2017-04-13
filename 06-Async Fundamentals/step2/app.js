// -------------------------------
// 01 - Never put functions within for loop
// -------------------------------

var fs = require('fs')

fs.readFile('sample.json', 'utf8', (err, data) => {
	if (!err) {
		data = JSON.parse(data)
		for (var i = 0; i < data.length; i++) {
			// Simulation of time consuming function
			setTimeout(() => {
				console.log(data[i].id + ' : ' + data[i].company.name + ' : ' + Math.floor(Math.random() * 2000) + ' employees')
			}, 1000 * Math.random())
		}
	} else {
		console.error(err)
	}
})

// -------------------------------
// 02 - For Each runs for each element sync
// -------------------------------

// var fs = require('fs')

// fs.readFile('sample.json', 'utf8', (err, data) => {
// 	if (!err) {
// 		data = JSON.parse(data)
// 		data.forEach((element) => {
// 			// Simulating API Response
// 			setTimeout(() => {
// 				console.log(element.id + ' : ' + element.company.name + ' : ' + Math.floor(Math.random() * 2000) + ' employees')
// 			}, 1000 * Math.random())
// 		})
// 	}
// })

// -------------------------------
// 02 - Map function. (better & faster in general) https://ryanpcmcquen.org/javascript/2015/10/25/map-vs-foreach-vs-for.html
// -------------------------------

var fs = require('fs')

fs.readFile('sample.json', 'utf8', (err, data) => {
	if (!err) {
		data = JSON.parse(data)
		data.map((element) => {
			setTimeout(() => {
				console.log(element.id + ' : ' + element.company.name + ' : ' + Math.floor(Math.random() * 2000) + ' employees')
			}, 1000 * Math.random())
		})
	}
})

// -------------------------------
// 03 - Callback Hell
// -------------------------------

// var fs = require('fs')

// fs.readFile('sample.json', 'utf8', (err, data) => {
// 	if (!err) {
// 		data = JSON.parse(data)
// 		data.forEach((element) => {
// 			// Simulating API Response
// 			setTimeout(() => {
// 				console.log(element.id + ' : ' + element.company.name + ' : ' + Math.floor(Math.random() * 2000) + ' employees')

// 				var company = element.company.name
// 				var id = element.id
// 				executeSomething(id, company, (err, id, data) => {
// 					console.log(id + ': Did something : ' + data)
// 					executeSomethingElse(id, data, (err, id, data) => {
// 						console.log(id + ': Oops..did something again: ' + data)
// 					})
// 				})
// 			}, 1000 * Math.random())
// 		})
// 	}
// })

// function executeSomething(id, name, callback) {
// 	setTimeout(() => {
// 		callback(null, id, Math.floor(Math.random() * 2000)) // no error
// 	}, 1000 * Math.random())
// }

// function executeSomethingElse(id, name, callback) {
// 	setTimeout(() => {
// 		callback(null, id, Math.floor(Math.random() * 2000)) // no error
// 	}, 1000 * Math.random())
// }

// -------------------------------
// 03 - Modularise Code (Not the best)
// -------------------------------

var fs = require('fs')

fs.readFile('sample.json', 'utf8', (err, data) => {
	if (!err) {
		data = JSON.parse(data)
		data.forEach(getAPIResponse)
	}
})

function getAPIResponse(element) {
	setTimeout(() => {
		console.log(element.id + ' : ' + element.company.name + ' : ' + Math.floor(Math.random() * 2000) + ' employees')
		getEmployeeData(element)
	}, 1000 * Math.random())
}

function getEmployeeData(element) {
	var company = element.company.name
	var id = element.id
	executeSomething(id, company, outputResponse)
}

function outputResponse(err, id, data) {
	if (!err) console.log(id + ': Did something: ' + data)
}

function executeSomething(id, name, callback) {
	setTimeout(() => {
		var data = Math.floor(Math.random() * 2000)
		callback(null, id, data) // no error
	}, 1000 * Math.random())
}
