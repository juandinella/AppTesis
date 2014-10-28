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
    // datos.innerHTML +=  "<p>" + mensajes[i] + "<span>" + "  score:" + " " +score[i]+ "</span>"+"</p>";
  }

 });
