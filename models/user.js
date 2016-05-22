// Modelo Usuario para la base de datos

// Mongoose es una libreria de Node que nos permite
// conectarnos a una base de datos MongoDB y modelar un esquema
// para ella.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Campos que vamos a guardar en la base de datos
var UserSchema = new Schema({
	name				: String, // Nombre del usuario
	//provider		: String, // Cuenta del usuario (Twitter o Facebook en este ejemplo)
	provider_id : {type: String, unique: true}, // ID que proporciona Twitter o Facebook
	photo			 : String, // Avatar o foto del usuario
	createdAt	 : {type: Date, default: Date.now} // Fecha de creación
	
});
/*

 
var StorySchema = new Schema({
	_user: { type:Number, ref: 'UserDetail'},
	friends : [{type: Number, ref: 'UserDetail'}]
});

var BookSchema = new Schema({
	_user: { type:Number, ref: 'UserDetail},
	titulo:String,
	autor: String,
	anyo: Number,
	libros : [{type: Number, ref: 'UserDetail'}]
});

var PoemaSchema = new Schema({
	_user: { type:Number, ref: 'UserDetail'},
	titulo:String,
	autor: String,
	anyo: Number,
	poemas : [{type: Number, ref: 'UserDetail'}]
});

var NovelaSchema = new Schema({
	_user: { type:Number, ref: 'UserDetail'},
	titulo:String,
	autor: String,
	anyo: Number,
	novelas : [{type: Number, ref: 'UserDetail'}]
});



// Exportamos el modelo 'User' para usarlo en otras
// partes de la aplicación

var UserDetails = mongoose.model('userInfo',UserDetail);
var Book = mongoose.model('Book', BookSchema);
var Novela = mongoose.model('Novela', NovelaSchema);
var Poema = mongoose.model('Poema', PoemaSchema);
*/
var User = mongoose.model('User', UserSchema);