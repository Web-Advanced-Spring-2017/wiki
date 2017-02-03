console.log('Hello again!')

// A lot of the next lines are based on Gabriel Gianordoli (Fall 2015) & Mani Nilchiani (Spring 2014)'s classes on Github.

// 4 characteristics of Javascript:
/*------------------------------------------------*/
// 1. Loosely typed
/*------------------------------------------------*/
// JS takes care of data types internally. Everything is 'var'.
var name = 'dude'
var age = 25
var height = 6.2
var week
var work = function() {
  for (var i = 0; i < week.length; i++) {
    goTo('office')
  }
}

function goTo(data) {}

var hobbies = ['music', 'beer', 'gif']
var keyValue = {
  'i cant ': 'really',
  'think of': 'anything',
  'you get': 'the picture'
    // you can even mix up data types in here!
    // more on this later on Ch.3 - Ararys vs Objects
}

/*------------------------------------------------*/
// 2. Object Oriented
/*------------------------------------------------*/
// JS is object-oriented, but is not a class-based language like Java, C, or C++.
// Instead, it's prototype-based language.

// A constructor in JavaScript can be any function. (Think of it as the blueprint.)
var Bubble = function(posX, posY, size) {
  this.posX = posX
  this.posY = posY
  this.size = size
}

// Constructors are responsible for creating new instances like this:
var myBubble = new Bubble(0, 0, 20)
console.log(myBubble.size)

// A prototype in JavaScript can be any object.
// Prototypes are responsible for defining the behaviour of instances.
Bubble.prototype.update = function(posX, posY, speed) {
  // update the position
}

Bubble.prototype.display = function() {
  // display the bubble
}

//The above can also be written as one big object like this:
Bubble.prototype = {
  update: function(posX, posY, speed) {
    // update the position
  },
  display: function() {
    // display the bubble
  }
}

/*------------------------------------------------*/
// 3. Functional
/*------------------------------------------------*/
// Everything’s procedural. Do this, do that. Return to me that value.
function makeCoffee() {
  getFilter(2)
  grindCoffee('fine')
  addCoffee(3)
  addWater(4)
  brew()
}

function getFilter(filterSize) {
  //how to get a filter
}

function grindCoffee(grainSize) {
  //how to grind coffee
}

function addCoffee(spoons) {
  //how to add coffee
}

function addWater(amount) {
  //how to add water.
}

function brew() {
  //press that button!
}

/*------------------------------------------------*/
// 4. Scripting Language
/*------------------------------------------------*/
// In C++ you would go through Pre-processing, Compiling and Linking to run the program,
// in JavaScript you save the file and you're done.

let jsTypes = {
  a: 0, // logs number
  b: 'student', // logs string
  c: false, // logs boolean
  d: undefined, // logs undefined
  e: null, // typeof null will be printed as object! while it has to be 'null' -  ECMASCRIPT BUG: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null
  f: Symbol('I am a symbol!') // logs symbol
}

//printing all the Own properties of an object with FORIN : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in
for (let key in jsTypes) {
  if (jsTypes.hasOwnProperty(key)) {
    let element = jsTypes[key]
    console.log(typeof element)
  }
}

console.log(typeof jsTypes) // logs object
