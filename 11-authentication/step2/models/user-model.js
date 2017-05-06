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
