// Cuando termina de cargar la FB SDK se corre esta funcion.
function inicio(){  
  FacebookData.parsearUnaPagina( "me/posts?fields=message&limit=50", function(data){
    socket.emit('analizar', data);
  });
  FacebookData.traerFoto(function(foto){
    socket.emit('nuevoUser', foto);
  });
}
var socket;
$(function() {

  socket = io.connect('https://lit-plateau-9030.herokuapp.com:8079');
  
  socket.on('news', function (data) {
    console.log("[socket.io-News] " + data);
  });

  socket.on('idUsuario', function (id) {
    //console.log("Recibi un id! " + id);
  });

});
