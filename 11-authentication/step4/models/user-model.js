var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')

var userSchema = mongoose.Schema({
  username: { type: String, index: true },
  password: { type: String },
  email: { type: String },
  name: { type: String }
})

var userParam = mongoose.model('userCollection', userSchema)

module.exports = userParam

module.exports.createUser = function(newUser, callback) {
  //https://www.npmjs.com/package/bcryptjs
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      // Store hash in your password DB. 
      newUser.password = hash
      newUser.save(callback)
    })
  })
}

module.exports.getUserByUsername = function(username, callback) {
  var query = { username: username }
  userParam.findOne(query, callback)
}

module.exports.getUserById = function(id, callback) {
  userParam.findById(id, callback)
}

module.exports.comparePassword = function(password, hash, callback) {
  console.log(hash)
  //https://www.npmjs.com/package/bcryptjs#usage---async
  // Load hash from your password DB. 
  bcrypt.compare(password, hash, function(err, res) {
    if (err) throw err
    else callback(null, res) // If password is a match
  })
}
