var socket = io.connect('http://juancito.com:8079');

socket.on('news', function (data) {
  console.log(data);
});
 
socket.on('devolverDatos', function (data) {
  var datos = document.getElementById("datos");
  datos.innerHTML = "";
  var mensajes = data.mensajes;
  var score = data.score;
  var sum = 0;

  for(var i = 0; i < mensajes.length; i++){
    console.log(score[i]);
    sum = sum + score[i];
    var promedio = sum/mensajes.length;
    
    if(score[i] > 0){
    	circPos();
    	console.log("Positivo yaay!");

    }else if(score[i] < 0){
    	circNeg();
    	console.log("Negativo :(");

    }else {
    	circNeu();
    	console.log("Neutro meh");
    }
    // datos.innerHTML +=  "<p>" + mensajes[i] + "<span>" + "  score:" + " " +score[i]+ "</span>"+"</p>";
  }
  console.log("el promedio es: " + promedio);
 });


