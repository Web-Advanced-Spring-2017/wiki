// deferred object
var deferred = Promise.defer()
console.log(deferred)

// Promise of deferred
var promise = deferred.promise
console.log('Promise Status: ', promise)

/*
Deferred has two functions
- Resolve()
- Reject()

Deferred has promise object

Promise has two functions
- Then()
- Catch()
*/

// ------------------------------------
// Resolve()
// ------------------------------------

// // When the promise is resolved do this ....
// promise.then((value) => { console.log(value * 10) })

// // Resolve promise when the event occurs

// setTimeout(multiply, 3000)

// function multiply() {
// 	// Resolve with a value 5
// 	deferred.resolve(5)
// 	console.log('Promise Status: ', promise)
// }

// ------------------------------------
// Reject()
// ------------------------------------

// Wont fire on reject
promise.then((value) => { console.log(value * 10) })

// Fires on rejection of deferred
promise.catch((error) => { console.log(error) })

// Resolve promise when the event occurs
setTimeout(multiply, 2000)

function multiply() {
	// Reject with an error
	deferred.reject(new Error('Something went wrong'))
}
