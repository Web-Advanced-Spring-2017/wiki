// -------------------------------
// 01 - Only output is sync not the actual process
// -------------------------------

// var fs = require('fs')
// var fileContent = fs.readFileSync('sample.json', 'utf8')
// console.log(fileContent)
// console.log('Done!')

// Output
// [File Contents]
// Done!

// -------------------------------
// 02 - True timing of execution
// -------------------------------

// var fs = require('fs')
// fs.readFile('sample.json', 'utf8', (err, data) => {
// 	if (!err) {
// 		console.log(data)
// 	}
// })
// console.log('Done!')

// Output
// Done!
// [File Contents]

// -------------------------------
// 03 - Null
// -------------------------------

// var fs = require('fs')
// var content = null
// fs.readFile('sample.json', 'utf8', (err, data) => {
// 	if (!err) {
// 		//  console.log(data)
// 		content = data
// 	}
// })
// console.log(content)
// console.log('Done!')
