var socket = io.connect('http://juandinella.com.ar:8079');

socket.on('news', function (data) {
  console.log(data);
});

//ACA INTENTO GUARDAR UN NICK Y NO ME SALIO
socket.on('connect', function(){
  console.log('conectando con socket');

  init();
});

var init = function() {
  $("#nickname").keyup(function(e) {
    var code = e.wich || e.KeyCode;

    if (code == 13){
      setNickname($(this).val());
    }
  });
};

var setNickname = function(nikcname){
  socket.emit('set_nickname', nickname,
  function(is_available){
    if(is_available){
      console.log('Nickname' + nickname + " is available");
    }else {
      console.log('Nickname' + nickname + " is not available");
    }
  });
};
//HASTA ACÁ


socket.on('devolverDatos', function (data) {
  var datos = document.getElementById("datos");
  datos.innerHTML = "";
  var mensajes = data.mensajes;
  var score = data.score;

  for(var i = 0; i < mensajes.length; i++){
    console.log(score[i]);
    dibujarCirculos();    
  }

  //Dibujo los circulos
  function dibujarCirculos(){

    if(score[i] > 0){
      circPos();

      console.log("Positivo yaay!");

    } else if(score[i] < 0){
        circNeg();
        console.log("Negativo :(");

    } else {
        circNeu();
        console.log("Neutro meh");
    }
  }

  circprinc();

  //Saco el promedio
  // function sacarPromedio(){
  //   sum = 0;

  //   for(var i = 0; i < mensajes.length; i++){
  //     sum += score[i];
  //   }

  //   promedio = sum/mensajes.length;

  // }

  // sacarPromedio(); 
  // console.log("el promedio es: " + promedio);

});

