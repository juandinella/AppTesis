var width = 1200,
    height = 400;

var negativo = '#d34055',
    neutro = '#ffce55',
    positivo = '#a0d468';

//Create SVG in #viz
var svg = d3.select('#viz')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('background', '#454954')
  .style('border', '2px solid #656d78')

  var usuario1X = Math.floor(Math.random() * 1200);
  var usuario1Y = Math.floor(Math.random() * 700);

//Create defs (mascara)
var defs = d3.select('svg').append('svg:defs');

defs.append('svg:clipPath')
  .attr('id', 'mask')
  .append('svg:circle')
  .attr('width', 140)
  .attr('height', 140)
  .attr('cx', usuario1X)
  .attr('cy', usuario1Y)
  .attr('r', 64)

var seccion = d3.select('svg')
  .append('g')
  .attr('class', 'seccion')


//Creo <3 positivos
function circPos(){
  var randomX = Math.floor(Math.random() * 1260);
  var randomY = Math.floor(Math.random() * 780);

  var g = svg.select('g');

  var h= 14;
  var w = 16;

  var img = g.append('svg:image')
    .attr('xlink:href', '../images/corazon.svg')
    .attr('width', w)
    .attr('height', h)
    .attr('x', randomX)
    .attr('y', randomY);

    d3.select('g').append('line')
      .attr('x1', usuario1X)
      .attr('y1', usuario1Y)
      .attr('x2', randomX + 10)
      .attr('y2', randomY + 10)
      .attr('stroke-width', 1)
      .attr('stroke', '#8cc051'); 
}


//Creo X negativos
function circNeg(){
  var randomX = Math.floor(Math.random() * 1260);
  var randomY = Math.floor(Math.random() * 780);

  var g = svg.select('g');

  var img = g.append('svg:image')
    .attr('xlink:href', '../images/cruz.svg')
    .attr('width', 16)
    .attr('height', 14)
    .attr('x', randomX)
    .attr('y', randomY);

    d3.select('g').append('line')
      .attr('x1', usuario1X)
      .attr('y1', usuario1Y)
      .attr('x2', randomX + 10)
      .attr('y2', randomY + 10)
      .attr('stroke-width', 1)
      .attr('stroke', '#db4453'); 
}


//Creo circulos neutros
function circNeu(){
  var randomX = Math.floor(Math.random() * 1260);
  var randomY = Math.floor(Math.random() * 780);

 d3.select('g').append('circle') 
    .attr('cx', randomX)
    .attr('cy', randomY)
    .attr('r', 8) 
    .style('fill', neutro)
    .attr('stroke-width', 1)
    .attr('stroke', '#f7b94a');

    d3.select('g').append('line')
      .attr('x1', usuario1X)
      .attr('y1', usuario1Y)
      .attr('x2', randomX)
      .attr('y2', randomY)
      .attr('stroke-width', 1)
      .attr('stroke', '#f9dfa5');   
}

function circprinc(){
  //círculo principal   
  d3.select('g').append('circle') 
    .attr('cx', usuario1X)
    .attr('cy', usuario1Y)
    .attr('r', 74) 
    .style('fill', '#aab2bd')

  //círculos sobre imagen  
  var circle = svg.select('g').selectAll('circle')
    .data([84, 94, 104], function(d) { return d; });

  circle.enter().append('circle')
    .attr('cx', usuario1X)
    .attr('cy', usuario1Y)
    .attr('stroke-width', 1)
    .attr('stroke', '#aab2bd')
    .style('fill', 'none')
    .attr('r', function(d) { return (d); });
}

//Traigo la imagen 
function imgPerfilAD3(imagen){
  var imgs = svg.select('g').selectAll('image').data([0]);

  imgs.enter()
    .append('svg:image')
    .attr('xlink:href', imagen)
    .attr('width', 140)
    .attr('height', 140)
    .attr('x', usuario1X - 70)
    .attr('y',usuario1Y - 70)
    .attr('clip-path', 'url(#mask)');

} //Fin imgPerfilAD3
