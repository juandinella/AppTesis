var socket = io.connect('http://juandinella.com.ar:8079');

socket.on('news', function (data) {
  console.log(data);
});


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

