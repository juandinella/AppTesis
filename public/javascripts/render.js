//Creo una clase singleton/objeto
var Renderizador = new function(){
  /*
   * Defino las variables de configuración
   */
  this.width = 1200; //Ancho del SVG
  this.height = 400; //Alto del SVG
  

  /*
   * Creo el SVG, los 4 layers y el placeholder para defs
   */
  this.svg = d3.select('#viz')
    .append('svg')
    .attr('width', this.width)
    .attr('height', this.height)
    .style('background', '#454954')
    .style('border', '2px solid #656d78');
    this.gLineasEmociones = d3.select('svg').append('g');
    this.gEmociones = d3.select('svg').append('g');
    this.gFondo     = d3.select('svg').append('g');
    this.gFoto      = d3.select('svg').append('g');
    this.defs = this.svg.append('svg:defs');

  //Placeholder para guardar IDs y sus ubicaciones
  this.usuarios = {};

  /*
   ******************************
   * Aca empieza la Magic Johnson
   ******************************
   */

  /*
   * Creo el borde de la foto(circulos del fondo)
   */
  this.renderBordeFoto = function (usuario) {
    var cx = Renderizador.usuarios[usuario].cx,
        cy = Renderizador.usuarios[usuario].cy,
        circulosExteriores = [84,94,104];

    //Círculo relleno
    Renderizador.gFondo.append('circle')
      .attr('cx', cx)
      .attr('cy', cy)
      .attr('r', 74) 
      .style('fill', '#aab2bd');

    //Circulos exteriores (solo borde)
    for (var i = 0;  i < circulosExteriores.length; i++) {  
      Renderizador.gFondo.append('circle')
        .attr('cx', cx)
        .attr('cy', cy)
        .attr('stroke-width', 1)
        .attr('stroke', '#aab2bd')
        .style('fill', 'none')
        .attr('r', circulosExteriores[i]);
    };

  } //Fin renderBordeFoto

  /*
   * Muestro la imagen del perfil
   */
  this.renderFoto = function(imagen, usuario){
    var cx = Math.floor(Math.random() * 1200);
    var cy = Math.floor(Math.random() * 700);

    Renderizador.usuarios[usuario] = {'cx': cx, 'cy': cy};
    //Creo la mascara
    Renderizador.defs.append('svg:clipPath')
      .attr('id', 'mascara')
      .append('svg:circle')
      .attr('width', 140)
      .attr('height', 140)
      .attr('cx', cx)
      .attr('cy', cy)
      .attr('r', 64)

    Renderizador.gFoto
      .append('svg:image')
      .attr('xlink:href', imagen)
      .attr('width', 140)
      .attr('height', 140)
      .attr('x', cx - 70)
      .attr('y', cy - 70)
      .attr('clip-path', 'url(#mascara)'); //Aplico la mascara

      Renderizador.renderBordeFoto(usuario);
  } //Fin renderFoto

  /*
   * Dibujo todos los circulos
   */
  this.renderCirculos = function(scores, usuario){

    //Para cada circulo
    console.log(scores);
    for (i = 0; i < scores.length; ++i) {
      var score = scores[i];
      var cx = Renderizador.usuarios[usuario].cx,
          cy = Renderizador.usuarios[usuario].cy;

      var random = Renderizador.randomCirculo(cx,cy);


      if(score > 0){
        Renderizador.gEmociones.append('svg:image')
            .attr('xlink:href', '../images/corazon.svg')
            .attr('width', 16)
            .attr('height', 14)
            .attr('x', random.X)
            .attr('y', random.Y);

        var colorLinea = '#8cc051';
        var modifPos = 10;
      } else if(score < 0){
        Renderizador.gEmociones.append('svg:image')
          .attr('xlink:href', '../images/cruz.svg')
          .attr('width', 16)
          .attr('height', 14)
          .attr('x', random.X)
          .attr('y', random.Y);

        var colorLinea = '#db4453';
        var modifPos = 10;
      } else {
        Renderizador.gEmociones.append('circle') 
          .attr('cx', random.X)
          .attr('cy', random.Y)
          .attr('r', 8) 
          .style('fill', '#ffce55')
          .attr('stroke-width', 1)
          .attr('stroke', '#f7b94a');

        var colorLinea = '#f9dfa5';
        var modifPos = 0;
      }

      Renderizador.gLineasEmociones.append('line')
        .attr('x1', cx)
        .attr('y1', cy)
        .attr('x2', random.X + modifPos)
        .attr('y2', random.Y + modifPos)
        .attr('stroke-width', 1)
        .attr('stroke', colorLinea); 

    }//Fin For scores
  }

  /*
   * Funcion helper para generar un numero random que quede cerca del circulo, 
   * pero no dentro del mismo
   */
  this.randomCirculo = function(cx,cy){
    var r1 = 120; //Radio del circulo externo, limite hasta donde debe haber fotos
    var r2 = 84; //Radio del circulo interno, donde NO debe haber puntos (la foto)

    //Primero genero un punto random en un cuadrado que inscriba al circulo mayor
    do{
      console.log("Trying to find a point");
      randCx= Math.floor(Math.random() * (2*r1 + 1)) - r1;
      randCy= Math.floor(Math.random() * (2*r1 + 1)) - r1;
      distToCenter = Math.sqrt( Math.pow(randCx,2) + Math.pow(randCy,2) );
    }
    while( distToCenter > r1 || distToCenter < r2);

    var respuesta = {'X': cx+randCx, 'Y': cy+randCy};
    return respuesta;
  }

}