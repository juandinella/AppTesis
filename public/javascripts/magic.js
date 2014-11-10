
/* ==========================================================================
   Acá empieza la mágia
   ========================================================================== */

function analizar() {

//Profile pic
FB.api("/me/picture?width=140&height=140",  function(response) {
  imgPerfilAD3(response.data.url);

});

  //Likes
  // FB.api('/me/likes?fields=name&limit=999', function(response) {
  //   var data = [];
  //   for(var a=0; a<response.data.length;a++){
  //     data.push(response.data[a].name);
  //   }
  //   socket.emit('analizar', data);
  // });

  // //Mensajes Feed 
  // FB.api('/me/home?fields=message', function(response) {
  //   for(var a=0; a<response.data.length;a++){
  //     console.log('Los mensajes de tu feed son: ' + response.data[a].message);
  //   }
  // });

  // //Mensajes Feed 
  // FB.api('/me/home?fields=message', function(response) {
  //   var data = [];
  //   for(var i=0; i<response.data.length;i++){
  //     if(typeof response.data[i].message !== "undefined"){ //Quito los post sin texto
  //     // console.log('Los mensajes de tu feed son: ' + response.data[i].message);
  //     data.push(response.data[i].message);
  //     }
  //   }
  //   socket.emit('analizar', data);
  // });

var maximoDePaginas = 6;
var paginaActual = 1;

function parsearUnaPagina(url){
  //Mensajes de Timeline Propio 
  console.log("Voy a parsear " + url);
  FB.api(url, function(response) {
    console.log(response);
    if(response.data.length > 0 && paginaActual <= maximoDePaginas){
      //Transformo y emito con socketio
      responseAArray(response);

      //Url de la pagina siguiente
      var urlNext = response.paging.next;
      console.log("urlNext raw: " + urlNext);
      //Borro la parte de "https://graph.facebook.com/v2.1"
      urlNext = urlNext.substring(31);
      console.log("urlNext substring: ");
      console.log(urlNext);
      parsearUnaPagina(urlNext);
      paginaActual++;
    }
  });
}

function responseAArray(response){
  var data = [];
  for(var i=0; i<response.data.length;i++){
    if(typeof response.data[i].message !== "undefined"){
      data.push(response.data[i].message);
    }
  }
  socket.emit('analizar', data);
}

//Inicio!
parsearUnaPagina("me/posts?fields=message&limit=999");

} //Fin analizar
