// Rutas de la aplicación
/*
exports.index = function(req, res){
  // Renderiza la plantilla 'index' cuando en el navegador
  // nos encontremos en la raiz '/' --> http://localhost:puerto/
 
  res.render('index', {
    //title: 'Ejemplo de Passport JS',
    //user: req.user
  });
};*/

exports.registro = function(req, res){

  res.render('registro', {
    //title: 'Ejemplo de Passport JS',
    //user: req.user
  });
};
exports.nuevolibro = function(req, res){

  res.render('nuevolibro', {
    //title: 'Ejemplo de Passport JS',
    user: req.user
  });
};
exports.nuevonovela = function(req, res){

  res.render('nuevonovela', {
    //title: 'Ejemplo de Passport JS',
    user: req.user
  });
};

exports.nuevopoema = function(req, res){

  res.render('nuevopoema', {
    //title: 'Ejemplo de Passport JS',
    user: req.user
  });
};
/*
exports.visualizar = function(req, res){
  
  res.render('visualizar', {
    //title: 'Ejemplo de Passport JS',
      user: req.user
  });
};


*/



exports.novelas = function(req, res){
  // Renderiza la plantilla 'index' cuando en el navegador
  // nos encontremos en la raiz '/' --> http://localhost:puerto/
 
  res.render('novelas', {
    //title: 'Ejemplo de Passport JS',
    //user: req.user
  });
};


exports.poemas = function(req, res){
  // Renderiza la plantilla 'index' cuando en el navegador
  // nos encontremos en la raiz '/' --> http://localhost:puerto/
 
  res.render('poemas', {
    //title: 'Ejemplo de Passport JS',
    //user: req.user
  });
};


/*
exports.perfil = function(req, res){
  // Renderiza la plantilla 'index' cuando en el navegador
  // nos encontremos en la raiz '/' --> http://localhost:puerto/
 
  res.render('perfil', {
    //title: 'Ejemplo de Passport JS',
    //user: req.user
  });
};
*/

exports.libros = function(req, res){
  // Renderiza la plantilla 'index' cuando en el navegador
  // nos encontremos en la raiz '/' --> http://localhost:puerto/
 
  res.render('libros', {
    //title: 'Ejemplo de Passport JS',
    user: req.user
  });
};
