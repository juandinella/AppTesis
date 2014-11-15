// Cuando termina de cargar la FB SDK se corre esta funcion.
function inicio(){
  
  FacebookData.traerFoto(function(imagen){
    Renderizador.renderFoto(imagen);
  });
  
  FacebookData.parsearUnaPagina( "me/posts?fields=message&limit=20", function(data){
    console.log(data);
  });
  
  Renderizador.renderBordeFoto();
}