// Cuando termina de cargar la FB SDK se corre esta funcion.
function inicio(){


}
var socket;
$(function() {

  // socket = io.connect('https://safe-depths-8628.herokuapp.com:8079');
  socket = io.connect('http://localhost');

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

  socket.on('desconectado', function (usuario) {
    Renderizador.borrarUsuario(usuario);
  });

});
