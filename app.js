"use strict";
// Archivo principal del Backend, configuración del servidor
// y otras opciones
var LocalStrategy = require('passport-local').Strategy;
var express = require('express'); // Express: Framework HTTP para Node.js
var routes = require('./routes'); // Dónde tenemos la configuración de las rutas
var path = require('path');
var crypto = require('crypto');
var util = require('util');
var mongoose = require('mongoose'); // Mongoose: Libreria para conectar con MongoDB
var passport = require('passport'); // Passport: Middleware de Node que facilita la autenticación de usuarios





var ruta = String();

var multer  = require('multer');
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    var date = Date.now();
    callback(null, date + '-' + file.originalname/*+ path.extname(file.originalname)*/);
    ruta = date + '-' + file.originalname;
  }
});
var upload = multer({ storage : storage}).single('userPhoto');






// Importamos el modelo usuario y la configuración de passport

require('./models/user');
require('./passport')(passport);


// Conexión a la base de datos de MongoDB que tenemos en local
mongoose.connect('mongodb://localhost:27017/passport-example', function(err, res) {
  if(err) throw err;
  console.log('Conectado con éxito a la BD');
});



// Iniciamos la aplicación Express
var app = express();

// Configuración (Puerto de escucha, sistema de plantillas, directorio de vistas,...)
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));



// Middlewares de Express que nos permiten enrutar y poder
// realizar peticiones HTTP (GET, POST, PUT, DELETE)
app.use(express.cookieParser());
app.use(express.urlencoded());
app.use(express.json());
app.use(express.methodOverride());
app.use(express.favicon());
app.use(express.logger('dev'));


// Ruta de los archivos estáticos (HTML estáticos, JS, CSS,...)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.cookieParser('secret'));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'bower_components')));
// Indicamos que use sesiones, para almacenar el objeto usuario
// y que lo recuerde aunque abandonemos la página
app.use(express.session({ secret: 'secret' }));



// Configuración de Passport. Lo inicializamos
// y le indicamos que Passport maneje la Sesión
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);



// Si estoy en local, le indicamos que maneje los errores
// y nos muestre un log más detallado
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var Schema = mongoose.Schema;
var UserDetail = new Schema({
    name: String,
    photo: String,
    password: String,
    email: String,
    /*stories: [{ type: Schema.Types.ObjectID, ref: 'Story'}],*/
	books: [{type: mongoose.Schema.Types.ObjectId, ref: 'Books'}]
	/*novelas: [{type: Schema.Types.ObjectID, ref: 'Novela'}],
	poemas: [{type: Schema.Types.ObjectID, ref: 'Poema'}]*/
}, {collection: 'userInfo'});

var Book = new Schema({
    _creator : { type: mongoose.Schema.Types.ObjectId, ref: 'UserDetails' },
    titulo: String,
    contenido: String,
    likes: Number
    /*fans: [{ type: Number, ref: 'UserDetails' }]*/
   
}, {collection: 'Book'});

var Seguidor = new Schema({
    name: String,
    siguiendo: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserDetails'}]
   
}, {collection: 'Seguidor'});



var Novela = new Schema({
    _creator : { type: mongoose.Schema.Types.ObjectId, ref: 'UserDetails' },
    titulo: String,
    contenido: String
    /*fans: [{ type: Number, ref: 'UserDetails' }]*/
   
}, {collection: 'Novela'});

var Poema = new Schema({
    _creator : { type: mongoose.Schema.Types.ObjectId, ref: 'UserDetails' },
    titulo: String,
    contenido: String
    /*fans: [{ type: Number, ref: 'UserDetails' }]*/
   
}, {collection: 'Poema'});
var UserDetails = mongoose.model('UserDetails',UserDetail);
var Books = mongoose.model('Books',Book);
var Seguidores = mongoose.model('Seguidores',Seguidor);
var Poemas = mongoose.model('Poemas',Poema);
var Novelas = mongoose.model('Novelas',Novela);



/* Rutas de la aplicación */
// Cuando estemos en http://localhost:puerto/ (la raiz) se ejecuta el metodo index
// del modulo 'routes'
/*
var UserDetails = mongoose.model('UserDetails');

var UserDetails = mongoose.model('userInfo');



*/
/*** COMIENZA LA PARTY HARD **/

var User = mongoose.model('User');



/* RUTAS */
//app.get('/', routes.index);
app.get('/libros', routes.libros);
app.get('/novelas', routes.novelas);
app.get('/nuevolibro', routes.nuevolibro);
//app.get('/perfil', routes.perfil);
app.get('/poemas', routes.poemas);
app.get('/registro', routes.registro);
app.get('/nuevopoema', routes.nuevopoema);
app.get('/nuevonovela', routes.nuevonovela);
//app.get('/visualizar', routes.visualizar);







passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// funcion para encriptar contraseña de los usuarios
function encriptar(user, pass) {
   // usamos el metodo CreateHmac y le pasamos el parametro user y actualizamos el hash con la password
   var hmac = crypto.createHmac('sha1', user).update(pass).digest('hex');
   return hmac;
}


passport.use(new LocalStrategy(
  function(username, password, done) {
    var passEncriptada = encriptar(username, password);
    process.nextTick(function () {
	  UserDetails.findOne({'name':username},
		function(err, user) {
			if (err) { return done(err); }
			if (!user) { return done(null, false); }
			if (user.password != passEncriptada) { return done(null, false); }
			return done(null, user);
		});
    });
  }
));

app.get('/cargar',function(req, res) {
    var name = req.user.name;
    Books
        .find({})
        .populate('_creator')
        .exec(function (err, file) {
          if (err) return err;
          var l;
          var data = [];
          for (l in file) {
              if(file[l]._creator.name == name){
                  data.push(file[l]);
                  
              }
          }
            res.json(data);
        });
    
});


app.get('/buscarSeguidores',function(req, res) {
    
    var name = req.user.name;
    
     Seguidores
        .find({})
        .populate('siguiendo')
        .exec(function (err, file) {
          if (err) return err;
          var l,i;
          var object = [];
          for (l in file) {
              for (i in l){
                   if(file[l].siguiendo[i].name == name){
                        object.push(file[l]);
              }
          }
          res.json(object);
         
             
          }
        });
});




app.get('/cargarHome',function(req, res) {
    var name = req.user.name;
    var band = false;
    var object = [];
    var todos = [];
    var l,i;
    
        Seguidores
        .find({})
        .populate('siguiendo')
        .exec(function (err, file) {
          if (err) return err;
          //console.log(file);
          
            for (l in file) {
                console.log(file[l])
                   if(file[l].name == name){
                       //console.log("pusheamos a " + file[l].siguiendo[0].name)
                        object.push(file[l].siguiendo[0].name);
                        band = true;
                    }
            }
            if(band){
                
                    console.log("aqui");
                    Books
                    .find({})
                    .populate('_creator')
                    .exec(function (err, file) {
                        var j;
                        console.log(file);
                        console.log(object[i])
                        if (err) console.log("errorsito segundo");
                        for (i in object){
                            for(j in file){
                               // console.log("y esto es " + file[j]._creator.name)
                                if(file[j]._creator.name == object[i]){
                                 //  console.log("pusheamos a " + file[j]._creator.name)
                                   todos.push(file[j]); 
                                }
                                
                            }
                        
                        }
                        res.json(todos);  
                    });
            }
            
        });
    
   
        
    
});


app.get('/seguir',function(req, res) {
    var nus = req.user.name;
    var cre = req.query.creador;

    UserDetails.findOne({"name":cre}, function(err, user) {
        if(err) return err;
        user.update(function(err){
            if(err) console.log("errorsito here");
          
          
            /********************* USUARIO CON DATOS *********************/
            let input = new Seguidores({
                 name: nus,
                 siguiendo: user._id
            });
            
            
            /********************* GUARDADO EN BS *********************/
            input.save(function(err) {
                if (err) {
                    console.log(err);
                }
                console.log("Guardado en BDD");
            });
            
           
        });
        
   });
   
   

   
});


app.get('/like', function(req, res){
    
    
    //var megusta = req.user.likes;
   // if
    
})


var titulo;
var contenido;
var creador;

app.get('/buscar',function(req, res) {
    
    var cre = req.query.creador;
   
     Books
        .find({'titulo':req.query.titulo})
        .populate('_creator')
        .exec(function (err, file) {
          if (err) return err;
          var l;
          for (l in file) {
              if(file[l]._creator.name == cre){
                  titulo = file[l].titulo;
                  creador = cre;
                  contenido = file[l].contenido;
                  
              }
          }
              
        });
       
})

app.get('/borrar',function(req, res) {
    
    var cre = req.user.name;

     Books
        .find({'titulo':req.query.titulo})
        .populate('_creator')
        .exec(function (err, file) {
          
           
          if (err) return err;
          var l;
          for (l in file) {
              if(file[l]._creator.name == cre){
                 Books.remove({'titulo':file[l].titulo}).exec();
                  
              }
          }
              
        });
       
})


app.get('/visualizar',function(req, res) {
  
          res.render('visualizar', {
              tit: titulo,
              cont: contenido,
              creador: creador,
              user: req.user
          });
});


app.get('/json',function(req, res) {
    
    Books
        .find({})
        .populate('_creator')
        .exec(function (err, file) {
          if (err) return err;
          //console.log('The creator is %s', eleg._creator.name);
          res.json(file)
          // prints "The creator is Aaron"
        });


});





app.post('/registro', function(req, res) {
   //Obtenemos los datos username y password
   
    
 
    
   var username = req.body.username;
   var password = encriptar(username,req.body.password);
   var email = req.body.email;
    
   //Encriptamos por medio de una función la contraseña 
   //var passEncriptada = encriptar(username, password);
   //Buscamos si el usuario existe
   
   UserDetails.findOne({'name':username},
   function(err, user){
     if (err) { return err; }
      if(!user) {
         var user = new UserDetails({
            name : username,
            password : password,
            email: email,
            likes: '0'
         })
         
        //guardamos el usuario
         user.save()
         res.send(user)
        res.redirect('/');
      }
      else
        res.redirect('/registro');
  
})
});


app.post('/api/photo',function(req,res){

    var username = req.user.name;
    
        upload(req,res,function(err) {
            if(err) {
                return res.end("Error uploading file.");
            }
            else{
                UserDetails.findOne({'name':username},
                   function(err, user){
                     
                     if (err) { return err; }
                        user.photo = ruta;
                        //guardamos el usuario
                         user.save()
                         res.send(user)
                        res.redirect('/perfil');
                });
            };
        });
    
});

app.get('/save', function(req, res) {
    
    var title= req.query.titulo;
    var contenido = req.query.content;
    var username = req.user.name;
   
    UserDetails.findOne({"name":username}, function(err, user) {
        if(err) return err;
    
        user.update(function(err){
            if (err) console.log(err);
          
            /********************* USUARIO CON DATOS *********************/
            let input = new Books({
                 titulo: title,
                 contenido: contenido,
                 _creator: user._id,
                 likes: 0 
            });
     
            
            /********************* GUARDADO EN BS *********************/
            input.save(function(err) {
                if (err) {
                    return err;
                }
                console.log("Guardado en BDD");
            });
        });
        
   });
   
});





app.get('/', function(req,res){
    var user = req.user;
        res.render('index', {
            title: 'Ejemplo de Passport JS',
            user: user
        });   
    
});

app.get('/perfil', function(req,res){
    var user = req.user;
    if(user){
        UserDetails.findOne({'name':user.name},
    		function(err, user2) {
    		    if(err){return err}
    		    user.photo = user2.photo;
    		    console.log(user.photo);
    		        
    	        	res.render('perfil', {
                    title: 'Ejemplo de Passport JS',
                    user: user
                  });
    		});
    } else{
        res.render('perfil', {
            title: 'Ejemplo de Passport JS',
            user: user
        });   
    }
});

app.get('/auth', function(req, res, next) {
  res.render('login');
});


app.get('/loginFailure' , function(req, res, next){
	res.send('Failure to authenticate');
});

app.get('/loginSuccess' , function(req, res, next){
	res.redirect('/');
});

app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/loginSuccess',
    failureRedirect: '/loginFailure'
}));



/* Rutas de Passport */
// Ruta para desloguearse
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});
// Ruta para autenticarse con Twitter (enlace de login)
app.get('/auth/twitter', passport.authenticate('twitter'));
// Ruta para autenticarse con Facebook (enlace de login)
app.get('/auth/facebook', passport.authenticate('facebook'));
// Ruta de callback, a la que redirigirá tras autenticarse con Twitter.
// En caso de fallo redirige a otra vista '/login'
app.get('/auth/twitter/callback', passport.authenticate('twitter',
  { successRedirect: '/', failureRedirect: '/login' }
));
// Ruta de callback, a la que redirigirá tras autenticarse con Facebook.
// En caso de fallo redirige a otra vista '/login'
app.get('/auth/facebook/callback', passport.authenticate('facebook',
  { successRedirect: '/', failureRedirect: '/login' }
));

// Inicio del servidor
app.listen(app.get('port'), function(){
  console.log('Aplicación Express escuchando en el puerto ' + app.get('port'));
});
