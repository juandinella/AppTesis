var mongoose = require('mongoose');
var Schema = mongoos.Schema;

mongoose.connect('mongodb://localhost/test');

var userSchema = new Schema({
	id: Number,
	name: String,
	imagePath: String,
	posts [{
		post_id: Number,
		post_value: Number
	}]
});

var user = mongoose.model('User', userSchema)

module.exports = userSchema;

