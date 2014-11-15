// Cuando termina de cargar la FB SDK se corre esta funcion.
function inicio(){
  
  FacebookData.traerFoto(function(imagen){
    Renderizador.renderFoto(imagen);
  });
  
  FacebookData.parsearUnaPagina( "me/posts?fields=message&limit=999", function(data){
      socket.emit('analizar', data);
  });
  
  Renderizador.renderBordeFoto();

  var socket = io.connect('http://juandinella.com.ar:8079');

  socket.on('news', function (data) {
    console.log(data);
  });


  socket.on('devolverDatos', function (data) {
    console.log(data);
    var datos = document.getElementById("datos");
    datos.innerHTML = "";
    var mensajes = data.mensajes;
    var score = data.score;

    for(var i = 0; i < mensajes.length; i++){
      console.log(score[i]);
      //dibujarCirculos();
    }
  });
}
