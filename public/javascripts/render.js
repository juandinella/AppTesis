//Creo una clase singleton/objeto
var Renderizador = new function(){
  /*
   * Defino las variables de configuración
   */
  this.width = 1200, //Ancho del SVG
  this.height = 400, //Alto del SVG
  this.negativo = '#d34055', // Color negativo
  this.neutro = '#ffce55', // Color neutro
  this.positivo = '#a0d468'; // Color positivo
  

  /*
   * Creo el SVG, los 3 layers y el placeholder para defs
   */
  this.svg = d3.select('#viz')
    .append('svg')
    .attr('width', this.width)
    .attr('height', this.height)
    .style('background', '#454954')
    .style('border', '2px solid #656d78');
    this.gFondo     = d3.select('svg').append('g'),
    this.gEmociones = d3.select('svg').append('g'),
    this.gFoto      = d3.select('svg').append('g');
    this.defs = this.svg.append('svg:defs');

  this.usuario1X = Math.floor(Math.random() * 1200),
  this.usuario1Y = Math.floor(Math.random() * 700);


  /*
   ******************************
   * Aca empieza la Magic Johnson
   ******************************
   */

  /*
   * Creo el borde de la foto(circulos del fondo)
   */
  this.renderBordeFoto = function () {
    //Círculo relleno
    Renderizador.gFondo.append('circle')
      .attr('cx', Renderizador.usuario1X)
      .attr('cy', Renderizador.usuario1Y)
      .attr('r', 74) 
      .style('fill', '#aab2bd')

    //Circulos exteriores (solo borde)
    Renderizador.gFondo.selectAll('circle.exteriores')
      .data([84, 94, 104])
      .enter()
      .append('circle')
      .attr('class','exteriores')
      .attr('cx', Renderizador.usuario1X)
      .attr('cy', Renderizador.usuario1Y)
      .attr('stroke-width', 1)
      .attr('stroke', '#aab2bd')
      .style('fill', 'none')
      .attr('r', function(d) { return (d); });

  } //Fin renderBordeFoto

  /*
   * Muestro la imagen del perfil
   */
  this.renderFoto = function(imagen){
    //Creo la mascara
    Renderizador.defs.append('svg:clipPath')
      .attr('id', 'mascara')
      .append('svg:circle')
      .attr('width', 140)
      .attr('height', 140)
      .attr('cx', Renderizador.usuario1X)
      .attr('cy', Renderizador.usuario1Y)
      .attr('r', 64)



    Renderizador.gFoto.selectAll('image')
      .data([0])
      .enter()
      .append('svg:image')
      .attr('xlink:href', imagen)
      .attr('width', 140)
      .attr('height', 140)
      .attr('x', Renderizador.usuario1X - 70)
      .attr('y',Renderizador.usuario1Y - 70)
      .attr('clip-path', 'url(#mascara)'); //Aplico la mascara
  } //Fin renderFoto
}



//Creo <3 positivos
function circPos(){
  var randomX = Math.floor(Math.random() * 1260);
  var randomY = Math.floor(Math.random() * 780);

  var h= 14;
  var w = 16;

  var img = gEmociones.append('svg:image')
    .attr('xlink:href', '../images/corazon.svg')
    .attr('width', w)
    .attr('height', h)
    .attr('x', randomX)
    .attr('y', randomY);

    gEmociones.append('line')
      .attr('x1', this.usuario1X)
      .attr('y1', this.usuario1Y)
      .attr('x2', randomX + 10)
      .attr('y2', randomY + 10)
      .attr('stroke-width', 1)
      .attr('stroke', '#8cc051'); 
}


//Creo X negativos
function circNeg(){
  var randomX = Math.floor(Math.random() * 1260);
  var randomY = Math.floor(Math.random() * 780);

  gEmociones.append('svg:image')
    .attr('xlink:href', '../images/cruz.svg')
    .attr('width', 16)
    .attr('height', 14)
    .attr('x', randomX)
    .attr('y', randomY);

  gEmociones.append('line')
    .attr('x1', this.usuario1X)
    .attr('y1', this.usuario1Y)
    .attr('x2', randomX + 10)
    .attr('y2', randomY + 10)
    .attr('stroke-width', 1)
    .attr('stroke', '#db4453'); 
}


//Creo circulos neutros
function circNeu(){
  var randomX = Math.floor(Math.random() * 1260);
  var randomY = Math.floor(Math.random() * 780);

  gEmociones.append('circle') 
    .attr('cx', randomX)
    .attr('cy', randomY)
    .attr('r', 8) 
    .style('fill', neutro)
    .attr('stroke-width', 1)
    .attr('stroke', '#f7b94a');

  gEmociones.append('line')
    .attr('x1', this.usuario1X)
    .attr('y1', this.usuario1Y)
    .attr('x2', randomX)
    .attr('y2', randomY)
    .attr('stroke-width', 1)
    .attr('stroke', '#f9dfa5');   
}
