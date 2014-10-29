var socket = io.connect('http://juancito.com:8079');

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
    if(score[i] > 0){
    	circPos();
    	console.log("Positivo yaay!");


    } if(score[i] < 0){
    	circNeg();
    	console.log("Negativo :(");

    } if(score[i] == 0){
    	circNeu();
    	console.log("Neutro meh");
    }
    // datos.innerHTML +=  "<p>" + mensajes[i] + "<span>" + "  score:" + " " +score[i]+ "</span>"+"</p>";
  }

 });


