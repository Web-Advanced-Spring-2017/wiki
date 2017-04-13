var d1 = Promise.defer() // API 1
var d2 = Promise.defer() // API 2
var d3 = Promise.defer() // API 3

var p1 = d1.promise
var p2 = d2.promise
var p3 = d3.promise

// Promise.all() takes and array of all promises to be resolved
Promise.all([p1, p2, p3]).then((values) => {
	execute(values)
})

// Promise.race() triggers as soon as any promise in the array is resolved or rejected
// Promise.race([p1, p2, p3]).then((values) => {
//   execute(values)
// })

setTimeout(() => {
	d1.resolve(10)
	console.log(d1.promise)
}, 2000 * Math.random())

setTimeout(() => {
	d2.resolve(20)
	console.log(d2.promise)
}, 2000 * Math.random())

setTimeout(() => {
	d3.resolve(30)
	console.log(d3.promise)
}, 2000 * Math.random())

function execute(values) {
	console.log(values)
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
	console.log(values.reduce((acc, val) => {
		return acc + val 	// Accumulator + value
	}))
}
