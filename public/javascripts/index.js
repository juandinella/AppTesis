// Cuando termina de cargar la FB SDK se corre esta funcion.
function inicio(){  
  FacebookData.parsearUnaPagina( "me/posts?fields=message&limit=999", function(data){
    socket.emit('analizar', data);
    console.log("Emiti analizar");
  });
  FacebookData.traerFoto(function(foto){
    socket.emit('nuevoUser', foto);
    console.log("Emiti nuevouser");
  });
}
var socket;
$(function() {

  socket = io.connect('http://juandinella.com.ar:8079');
  
  socket.on('idUsuario', function (id) {
    console.log("Recibi un id!");
    console.log(id);
  });

});
