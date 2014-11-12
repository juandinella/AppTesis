var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/test')

var usuariosSchema = new Schema({
	fbid: Number,
	imagePath: String,

	posts: [{
		post_id: Number,
		value: Number
	}]
});

var Usuarios = mongoose.model('Usuarios', usuariosSchema);

module.export = Usuarios;

