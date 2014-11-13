// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    analizar();
    
    // document.getElementById('texth3').innerHTML = 'Ahora dirígete al primer piso, aula 3';
    
  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    document.getElementById('status').innerHTML = 'Please log ' +
    'into this app.';
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
  });
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '740789665959022',
    cookie     : true,  // enable cookies to allow the server to access
                // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.1' // use version 2.1
  });

  // Now that we've initialized the JavaScript SDK, we call
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

};

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.

  //Esto tiraba error
    // console.log('Welcome!  Fetching your information.... ');

    // FB.api('/me', function(response) {
    //   console.log('Successful login for: ' + response.name);
    //   document.getElementById('status').innerHTML =
    //   'Thanks for logging in, ' + response.name + '!';
    // });


/* ==========================================================================
   Acá empieza la mágia
   ========================================================================== */

function analizar() {

//Profile pic
FB.api("/me/picture?width=140&height=140",  function(response) {
  imgPerfilAD3(response.data.url);
});

var maximoDePaginas = 1;
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

