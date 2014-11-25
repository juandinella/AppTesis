// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  if (response.status === 'connected') {
    $("#texth3").text('Ahora dirígete al aula 7 en el primer piso');

  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    document.getElementById('status').innerHTML = 'Please log into this app.';
  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
  }

}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);

    //Termino de cargar el SDK; llamo a la funcion madre de controller.js
    inicio();
  });
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : (document.domain == 'juandinella.com.ar') ? '551762271562802' : '646041065454204',
    cookie     : true,  // enable cookies to allow the server to access
    xfbml      : true,  // parse social plugins on this page
    version    : 'v1.0' // use version 1.0
  });

  checkLoginState();
};

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

/*
 * Terminamos con la inicialización, conexión y login.
 * Ahora preparamos las funciones de acuerdo a la lógica de nuestra APP
 */

//Creo una clase singleton/objeto
var FacebookData = new function(){

  //Variables a usar al paginar los posts
  this.maximoDePaginas = 5; //Cuantas paginas de posts parsear como maximo
  this.paginaActual = 1; //Contador de pagina actual

  /*
   * Obtengo la url de la Profile pic,
   * y la paso como parametro a la funcion del callback
   */
  this.traerFoto = function(callback){
    FB.api("/me/picture?width=140&height=140",  function(response) {
       callback(response.data.url);
    });
  }

  /*
   * Funcion que trae una pagina y decide si llamar a la pagina siguiente
   * Una vez que termina, llama al callback.
   */
  this.parsearUnaPagina = function(url, callback){
    FB.api(url, function(response) {
      //Si esta pagina tuvo resultados, y todavia no supere al maximo de paginas
      if(response.data.length > 0 && FacebookData.paginaActual <= FacebookData.maximoDePaginas){
        //Parseo esta respuesta a un array
        var data = FacebookData.responseAArray(response);

        //Lo envio usando el callback
        callback(data);

        FacebookData.paginaActual++; //Incremento el contador

        /*
         * Llamo a la proxima ejecución
         */
        var urlNext = response.paging.next; //Extraigo la url
        urlNext = urlNext.substring(31); //Elimino la parte de "https://graph.facebook.com/v2.1"
        FacebookData.parsearUnaPagina(urlNext, callback);
      }
    });
  }

  //Agrego a un array los resultados que estén en esta response
  this.responseAArray = function(response){
    var arrayResultados = [];
    for(var i=0; i<response.data.length;i++){
      if(typeof response.data[i].message !== "undefined"){
        arrayResultados.push(response.data[i].message);
      }
    }
    return arrayResultados;
  }
} //Fin FacebookData
