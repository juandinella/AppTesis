// Cuando termina de cargar la FB SDK se corre esta funcion.
function inicio(){


}
var socket;
$(function() {
  socket = io.connect('//' + document.domain);
  socket.emit('subscripcionViz','');

  socket.on('news', function (data) {
    console.log("[socket.io-News] " + data);
  });
  
  socket.on('devolverDatos', function (data) {
    Renderizador.renderCirculos(data.score, data.usuario);
  });

  socket.on('devolverFoto', function (data) {
    Renderizador.renderFoto(data.foto, data.usuario);
  });

  socket.on('idUsuario', function (id) {
    console.log("Nuevo usuario: " + id);
    Renderizador.nuevoUsuario(id);
  });


  socket.on('desconectado', function (usuario) {
    setTimeout(function(){
      Renderizador.borrarUsuario(usuario);
    }, 10*1000);//Espero 30 segundos
  });

});
