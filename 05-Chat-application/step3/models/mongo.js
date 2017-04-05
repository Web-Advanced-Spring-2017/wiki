var mongoose = require('mongoose')

var msgSchema = new mongoose.Schema({
	from: { type: String },
	content: { type: String }
})

var msgParam = mongoose.model('msgCollection', msgSchema)

module.exports = {
	MsgParam: function() {
		return msgParam
	}
}
