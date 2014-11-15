// Cuando termina de cargar la FB SDK se corre esta funcion.
function inicio(){


}
var socket;
$(function() {
  socket = io.connect('http://juandinella.com.ar:8079');
  
  socket.on('devolverDatos', function (data) {
    Renderizador.renderCirculos(data.score, data.usuario);
  });

  socket.on('devolverFoto', function (data) {
    console.log("Nuevo user!");
    Renderizador.renderFoto(data.foto, data.usuario);
  });

});
