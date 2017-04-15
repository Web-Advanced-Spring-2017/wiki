// Examples from : https://alexperry.io/node/2015/03/25/promises-in-node.html

// Pseudo code
// fs module does not return promises.
const fs = require('fs')
	/*
	//Just another callback hell

	fs.readFile('directory/file-to-read', function(err, file) {
		if (error) {
			//handle error
		} else {
			//do something with the file
			fs.mkdir('directory/new-directory', function(err, file) {
				if (error) {
					//handle error
				} else {
					//new directory has been made
					fs.writeFile('directory/new-directory/message.txt', function(err, file) {
						if (error) {
							// handle error
						} else {
							// File successfully created
						}
					});
				}
			});
		}
	});
	*/

// -----------------------------------------------
// Chaining
// -----------------------------------------------
fs.readFileAsync('directory/file-to-read')
	.then((fileData) => {
		return fs.mkdirAsync('directory/new-directory')
	})
	.then(() => {
		return fs.writeFileAsync('directory/new-directory/message.txt')
	}).catch((error) => {
		// do something with the error and handle it
	})

// -----------------------------------------------
// Modularise
// -----------------------------------------------
function readFileandMakeDirectory() {
	return fs.readFileAsync('directory/file-to-read')
		.then((fileData) => {
			return fs.mkdirAsync('directory/new-directory')
		})
}

// The following will execute once the file has been read and a new directory has been made
readFileandMakeDirectory()
	.then(() => {
		return fs.writeFileAsync('directory/new-directory/message.txt')
	})
